## Advanced setup

This document walks you through the necessary steps to set up a custom vide streaming server. See the [README.md](https://github.com/decentraland-scenes/video-streaming/blob/master/README.md) for a high level overview and instructions for simpler alternatives.

This is the cheapest option, but is significantly harder to set up than the others.

> Tip: For a more complete guide on setting up a server on Digital Ocean, see this [blog post](https://decentraland.org/blog/tutorials/servers-part-3/),

### On Digital Ocean

- Create a new account if you don't already have one
- Create a new project
- Create a new droplet within that project
  - Choose an image: **Debian**, latest version
  - Select **Basic plan**
  - For the cheapest option, select `Regular Intel with SSD` and $5 / month. Or scale up according to your budget.
  - You can optionally add block storage if you need more storage space.
  - Pick a datacenter region, eg: Germany. Preferable chose wherever is more geographically closer to the audience you expect to have.
  - In **Aditional Options**, select add monitoring
  - In \*Authentication\*\*, select root password and provide a password to access your server as an admin
  - Select the project you created for using this droplet
  - You can optionally choose a hostname but it's not necessary
  - Click "Create Droplet" - wait for it to start
- Back in the admin console of the project, once the droplet is online you should be able to copy its IP address

### Domain Name

We can rely on nip.io, a service that maps all possible IP addresses to their domains and routes to these IPs accordingly. You don’t need to subscribe or do anything on their platform, they should already have a domain matching your IP address. If your server’s IP is 64.225.45.232, then the following nip domain should route to your server: 64-225-45-232.nip.io.

### Connect to the server

- Use putty: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html
- Enter the ip address with the port 22
- Enter `root` for username
- Enter password for when you created the Digital Ocean droplet

Once you've logged in to your server, you can proceed to the next steps.

### Install command line tools

- First do an update to apt: `$ apt-get update`
- Install **curl** and **git**: `$ apt install curl git`. Respond **yes** to all the questions on the wizard.

  Note: Curl is so to run requests to external servers, it's essentially a terminal-based browser. git is for version control.

- Install **NVM** (Node Version Manager) - copy and paste the command below, taken from their github page: [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

      `$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

  Note: You can otherwise install node directly, without NVM, for the distribution that you want (e.g. Debian, Fedora, etc). The downside is you may get a different node version such as LTS instead of the current version, so it's recommended to use NVM to be sure of the version you install.

- Once NVM is installed, paste and run the last 3 lines printed onto the terminal and run them.

  Note: Alternatively you can close and open the terminal and it will from now on load NVM by default each time you connect.

- Run: `$ nvm install 14` - to install nodejs version 14
- Install **Node-Media-Server**, this is the server we will use to stream. Just clone the Node-Media-Server repo: `$ git clone https://github.com/illuspas/Node-Media-Server.git

  Note: Find more about this software in their [github page](https://github.com/illuspas/Node-Media-Server)

- Change directory to the newly installed the Node-Media-Server directory: `$ cd Node-Media-Server/`
- Install all the necessary packages: `$ npm install`
- Do a global installation of **pm2** (https://www.npmjs.com/package/pm2) by running: `$ npm i -g pm2`

  Note: Pm2 is a process manager that allows you to keep a program running even after you quit the terminal. Without Pm2, quitting the terminal finishes any running applications started from that terminal.

- Install **ffmpeg** by runing: `$ apt install ffmpeg`. Say yes to all the options.

  Note: ffmpeg is for processing video, audio, and other multimedia files and streams.ffmpeg will be used to transform the _rtmp_ input into _HLS_, output so that it can play in Decentraland:

### Edit the app.js file

- Within the Node-Media-Directory run: `$ nano app.js` to edit the `app.js` file. Use Nano (a basic text editor). The file `App.js` has all the configuration you need for running a stream
- Delete the ssl stuff within the rtmp endpoint. Use Ctrl + K to delete.
- Comment out the https option
- Take a note of the port number under http option. It should be 8000
- Make sure that under the **http** option you have: `allow_origin: '*',`
- Change the `mediaroot: '/srv/media'` - this is where we put files that's being created and or used by programs

  Add another option called **trans** (it refers to transcoding). Here we'll assign ffmpeg to handle the file format conversions.

  ```ts
  trans: {
  	ffmpeg: '/usr/bin/ffmpeg',
  	tasks: [
  	{
  		app: 'live',
  		mp4: true,
  		mp4Flags: '[movflags=faststart]',
  		hls: true,
  		hlsFlags: '[hls_time=2:hls_list_size=3]', //'hls_flags=delete_segments]',
  		dash: true,
  		dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
  	}
  	]
  },
  ```

- You can set the secret under auth - set publish to _true_ and then set your secret: `thatsasecretthatsgoingtobeusedlateron` (we'll come back to this later once we setup the stream)
- Ctrl + X to exit editor; save with 'y'; enter to accept the file name

## Start and handle the application

- Run `$ pm2 start app.js` on the command line to start the video server via pm2.
- You can check applications that are being handled pm2 by running: `$ pm2 ls`.
- If you run into any issues (eg: the status of your application is _error_), run: `$ pm2 log 0` for more details. _0_ here refers to the process id of the running program, this number may vary depending on other running processes.
- You can stop the process by running: `$ pm2 stop 0` (again 0 being the process id)
- You can start the process again by running: `$ pm2 start 0`
- You can restart the process by running: `$ pm2 restart 0`

## Install nginx and certbot

- To install **nginx** and **certbot**, run: `$ apt install nginx certbot`

  Note: Nginx is used to handle the http video call request from the user. Certbot is used to create an SSL certificate for the nginx server - that is what gives you the padlock icon on the address bar in your browser. It is also necessary for CORS.

- The command systemctl is used to see what processes are running and you can run: `$ systemctl status nginx` to see if nginx is running or not
- Open a browser tab on the address `<ip-address>.nip.io`. In that address you should see some text saying that nginx is running.
- Install the nginx plugin for certbot, run `$ apt install nginx certbot python3-certbot-nginx`

> TIP: To search for a package by name, you can run: `$ apt search nginx certbot` to see a list of all the existing packages that match your search query.

## Certbot

- To run certbot run: `$ certbot run --nginx -d <ip-address>.nip.io`
- Enter your email address so you receive an email whenever the certification is about to expire

  NOTE: these certificates only last 3 months and will renew automatically. it will also send you an email when a certification is about to expire

- Agree to the terms of service to obtain the certification by pressing 'A' key to agree
- No need to share your email here so say 'No' to that
- It then sends a challenge to the domain you entered to make sure it exists and is pointing to your ip address
- Next select '2' so that you redirect HTTP traffic to HTTPS
- Now if you refresh the browser and check the domain <ip-address>.nip.io - you should see a little padlock

## Changing NGINX configuration

- Run nano again to open the following file: `$ nano /etc/nginx/sites-enabled/default`
- Scroll down to the HTTPS part, which is the SSL configuration. In: location / on line 119

  - Replace `root /var/ww/html;` with `root /srv/media;`
  - Add the following within the braces for `location /` to enable CORS: `proxy_pass https://localhost:8000/;`

  Note: This tells any traffic that’s going to the domain `<ip-address>.nip.io` to use the port 8000

- Ctrl + x to exit editor; save with 'y'; enter to accept the file name
- Now restart nginx by running: `$ systemctl restart nginx`

## Running a stream

- On your machine that will be performing the stream, download and install [OBS](https://obsproject.com/)
- Open up OBS and go into settings > stream
- Set the server to: `rtmp://<ip-address>.nip.io/live/`
- The `/live` part of the URL can be found in the app.js under the trans option: `app: 'live'`
- https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol
- Set the stream key to anything you want. In our case we will be using the Stream Key: `test`.
- Remember we set the auth in the `app.js` to `publish: true` along with a secret. This is where we will be needing that secret. If you try to click on the "start streaming" button now, it won't connect.
- Go back to the server terminal and run the following to check if the stream is working: `$ pm2 log 0 -f`

  It should show up as Unauthorized because we haven't added the key yet

- To create the stream key, copy the secret you set on the `app.js` file and create a md5 hash of it that includes the `/live/<name of stream>-<unix timestamp you want it to last until>-<copy of key from app.js>`.
  - To create a md5 hash, you can use [md5hashgenerator.com](https://www.md5hashgenerator.com/).
  - To create the timestamp, you can use [unixtimestamp.com](https://www.unixtimestamp.com/)
  - In our case, the URL will be `/live/test-2620857302-thatsasecretthatsgoingtobeusedlateron`
  - The result of the md5 hash is: `4cb8c5aa6d6f341b6d1d915956ebf459`
- Now back in OBS in _settings > stream_. Our stream key is going to be: `<name of stream>?sign=<unix timestamp you want it to last until>-<md5 hash of the secret>`. In our case that would be: `test?sign=2620857302-4cb8c5aa6d6f341b6d1d915956ebf459`
- Now apply those changes and hit the **start streaming** button and it should start working
- Verify that it's running:

  - In OBS you should see a notification that it's "live"
  - Run `$ pm2 log 0 -f` in the server terminal again to verify that it's published. It shoud read **rtmp connect, rtmp play, rtmp publish**

- Now run: `$ mpv https://68-183-70-239.nip.io/live/test/index.m3u8` and you should see the stream
- This `https://68-183-70-239.nip.io/live/test/index.m3u8` link is what you need to paste on your Decentraland scene, on a video texture. See the Decentraland documentation on setting up a [Video texture](https://docs.decentraland.org/development-guide/video-playing/#show-a-video)
