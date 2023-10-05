# Pixel API

This directory provides a REST API for managing pixel data. The API allows you to retrieve, add, and update pixel information in a database. The provided examples utilize restdb.io and SQLite databases. Restdb.io offers a straightforward setup, while SQLite offers more control and portability.

## Getting Started

These instructions will guide you through setting up the project on your local machine for development and testing purposes. 

### Prerequisites

- Restdb account or ftp server with php
- [Postman](https://www.postman.com/) for testing the API.

### Database Setup

#### Option 1: Restdb.io

1. Create an account on [restdb.io](https://restdb.io/).
2. Follow the instructions to set up a new database.
3. Restdb.io will automatically generate the API code for you.

The pixels table format is:
```
posX: number
posY: number
hexColor: string
_id: string (is auto generated)
```
   
> **Note:** The free version of restdb.io has a rate limit of 1 request per second.

#### Option 2: SQLite with PHP

1. Ensure your server has PHP installed.
2. Copy all files from the `/php-sqlite` directory onto your server.
3. Ensure the `.htaccess` file is included as it formats the URL into arguments for the script.

> **Note:** With SQLite, you get a lightweight compact database in a single file that you can copy and move around. You can inspect the `.sqlite` database using [SQLite Viewer](https://sqliteviewer.app/).

### API Usage

- **Get Pixels:** Send a GET request to the `/pixels` endpoint to retrieve all pixel data.
- **Add Pixels:** Send a POST request to the `/pixels` endpoint with pixel data in the request body to add new pixels.
- **Update Pixel:** Send a PUT request to the `/pixels/{id}` endpoint with updated pixel data in the request body to update an existing pixel.


### Additional Resources

- [Restdb.io Documentation](https://restdb.io/docs/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)


### License

This project is open-source. See the LICENSE file for details.
