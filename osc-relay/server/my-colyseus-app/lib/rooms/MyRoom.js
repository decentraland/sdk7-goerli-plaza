"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const colyseus_1 = require("colyseus");
const MyRoomState_1 = require("./schema/MyRoomState");
class MyRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage('type', (client, message) => {
            //
            // handle "type" message
            //
        });
        // Get changes from the director's browser app
        this.onMessage('change', (client, message) => {
            switch (message.address) {
                case '/fader1':
                    this.state.fader1 = message.value;
                    this.presence.publish('/fader1', { value: message.value });
                    break;
                case '/fader2':
                    this.state.fader2 = message.value;
                    this.presence.publish('/fader2', { value: message.value });
                    break;
                case '/fader3':
                    this.state.fader3 = message.value;
                    this.presence.publish('/fader3', { value: message.value });
                    break;
                case '/fader4':
                    this.state.fader4 = message.value;
                    this.presence.publish('/fader4', { value: message.value });
                    break;
            }
        });
        // Get changes from other rooms
        this.presence.subscribe('/fader1', (message) => {
            this.state.fader1 = message.value;
        });
        this.presence.subscribe('/fader2', (message) => {
            this.state.fader2 = message.value;
        });
        this.presence.subscribe('/fader3', (message) => {
            this.state.fader3 = message.value;
        });
        this.presence.subscribe('/fader4', (message) => {
            this.state.fader4 = message.value;
        });
        // this.clock.setInterval(() => {
        //   console.log(
        //     this.state.fader1,
        //     this.state.fader2,
        //     this.state.fader3,
        //     this.state.fader4
        //   )
        // }, 1000)
    }
    onJoin(client, options) {
        if (options.director) {
            if (options.password == !MyRoomState_1.PASSWORD) {
                console.log('password rejected!! ', options.password);
                return;
            }
            if (this.state.director && this.state.director.active) {
                console.log('We already have a director!! ', this.state.director.id);
                return;
            }
            // add director
            const newDirector = new MyRoomState_1.Director(client.id);
            this.state.director = newDirector;
            console.log(newDirector.id, 'We have a new director in town!');
            // stop listening from other rooms
            this.presence.unsubscribe('/fader1');
            this.presence.unsubscribe('/fader2');
            this.presence.unsubscribe('/fader3');
            this.presence.unsubscribe('/fader4');
        }
        else {
            const newViewer = new MyRoomState_1.Viewer(client.id, options.userData.displayName || 'Anonymous');
            this.state.audience.set(client.sessionId, newViewer);
            console.log(newViewer.name, 'joined! => ', options.userData);
        }
    }
    onLeave(client, consented) {
        if (this.state.director.id == client.sessionId) {
            console.log('The director left the set! ', client.sessionId);
            this.state.director = null;
        }
        else {
            const player = this.state.audience.get(client.sessionId);
            console.log(player.name, 'left!');
            this.state.audience.delete(client.sessionId);
        }
    }
    onDispose() {
        console.log('Disposing room...');
    }
}
exports.MyRoom = MyRoom;
