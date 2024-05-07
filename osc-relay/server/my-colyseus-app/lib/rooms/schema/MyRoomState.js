"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoomState = exports.Viewer = exports.Director = exports.PASSWORD = void 0;
const schema_1 = require("@colyseus/schema");
exports.PASSWORD = 'papafrita';
class Director extends schema_1.Schema {
    constructor(id) {
        super();
        this.id = id;
        this.active = true;
    }
}
__decorate([
    schema_1.type('string')
], Director.prototype, "id", void 0);
__decorate([
    schema_1.type('string')
], Director.prototype, "name", void 0);
__decorate([
    schema_1.type('boolean')
], Director.prototype, "active", void 0);
exports.Director = Director;
class Viewer extends schema_1.Schema {
    constructor(id, name) {
        super();
        this.id = id;
        this.name = name;
        this.active = true;
    }
}
__decorate([
    schema_1.type('string')
], Viewer.prototype, "id", void 0);
__decorate([
    schema_1.type('string')
], Viewer.prototype, "name", void 0);
__decorate([
    schema_1.type('boolean')
], Viewer.prototype, "active", void 0);
exports.Viewer = Viewer;
class MyRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.mySynchronizedProperty = 'Hello world';
        this.fader1 = 0;
        this.fader2 = 0;
        this.fader3 = 0;
        this.fader4 = 0;
        this.audience = new schema_1.MapSchema();
    }
}
__decorate([
    schema_1.type('string')
], MyRoomState.prototype, "mySynchronizedProperty", void 0);
__decorate([
    schema_1.type('number')
], MyRoomState.prototype, "fader1", void 0);
__decorate([
    schema_1.type('number')
], MyRoomState.prototype, "fader2", void 0);
__decorate([
    schema_1.type('number')
], MyRoomState.prototype, "fader3", void 0);
__decorate([
    schema_1.type('number')
], MyRoomState.prototype, "fader4", void 0);
__decorate([
    schema_1.type(Director)
], MyRoomState.prototype, "director", void 0);
__decorate([
    schema_1.type({ map: Viewer })
], MyRoomState.prototype, "audience", void 0);
exports.MyRoomState = MyRoomState;
