//import Stats from 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js'
import BoidsController from './BoidsController';
import BoidEntity from './BoidEntity';
import { Transform } from '@dcl/sdk/ecs';
import { Vector3 } from '@dcl/sdk/math';
//import Entity from './Entity.js'

let stats = undefined;

/**
 * @module ControlHelper 
 * A helper class to make examples easier.
 */
export default class ControlHelper {
  boidsController: BoidsController
  constructor(boidsController: BoidsController) {//}, renderer, workerPlanner) {
    this.boidsController = boidsController;
    //this.renderer = renderer;
    //this.workerPlanner = workerPlanner;
  }

  init() {
    // init stats
    //this.stats = new Stats();
    //this.stats.showPanel(0);
    //document.body.appendChild(this.stats.dom);

    /*const gui = new dat.GUI();
    gui.add(this.boidsController, 'aligmentWeight',0,5).name('Alignment');
    gui.add(this.boidsController, 'cohesionWeight',0,5).name('Cohesion');
    gui.add(this.boidsController, 'separationWeight',0,5).name('Separation');
    gui.add(this.boidsController, 'maxEntitySpeed',1,10).name('Max Speed');
    
    if(this.boidsController.subDivisionCount > 1) {
        gui.add(this.renderer.gridVisual, 'visible').name('Show Grid');
    }
    
    gui.add(this.renderer, 'lockOn').name('Lock Camera');
    this.boidsButton = gui.add(this, 'addBoids');
    this.obstacleButton = gui.add(this, 'addObstacles');
    */
    //this.updateButtonLabels();
  }

  statBegin() {
    //this.stats.begin();
  }

  statEnd() {
    //this.stats.end();
  }

  addBoids(count = 50) {
    const boundary = this.boidsController.getBoundary();
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * boundary[0]);
      const y = Math.floor(Math.random() * boundary[1]);
      const z = Math.floor(Math.random() * boundary[2]);
      const vx = (Math.random() * 4) - 2;
      const vy = (Math.random() * 4) - 2;
      const vz = (Math.random() * 4) - 2;

      const entity = new BoidEntity(BoidEntity.FLOCK_ENTITY, x, y, z, vx, vy, vz);
      entity.canMove = true
      this.boidsController.addFlockEntity(entity);
    }

    /*if(this.workerPlanner) {
        this.workerPlanner.sendInitialData();
    }

    this.updateButtonLabels();*/
  }

  addObstacles(obstacleCount = 5) {
    const boundary = this.boidsController.getBoundary();
    for (let i = 0; i < obstacleCount; i++) {
      const x = Math.floor(Math.random() * boundary[0]);
      const y = Math.floor(Math.random() * boundary[1]);
      const z = Math.floor(Math.random() * boundary[2]);

      const entity = new BoidEntity(BoidEntity.OBSTACLE_ENTITY, x, y, z);
      this.boidsController.addObstacleEntity(entity);

      const tf = Transform.getMutable(entity.visibleEntity.entity)//.getComponent(Transform)
      Vector3.scaleToRef(tf.scale, this.boidsController.obstacleRadius, tf.scale)
      //entity.visibleEntity.entity.getComponent(Transform).scale.scale( this.boidsController.obstacleRadius )
    }
    /*
        if(this.workerPlanner) {
            this.workerPlanner.sendInitialData();
        }

        this.updateButtonLabels();*/
  }

  addObstacle(name: string, position: Vector3.ReadonlyVector3, radius: number) {

    const entity = new BoidEntity(BoidEntity.OBSTACLE_ENTITY, position.x, position.y, position.z);
    entity.obstacleRadius = radius
    this.boidsController.addObstacleEntity(entity);

    //entity.visibleEntity.entity.getComponent(Transform).scale.scaleInPlace( radius )
    //Vector3.scaleToRef( entity.visibleEntity.entity.getComponent(Transform).scale,radius,entity.visibleEntity.entity.getComponent(Transform).scale)
    const tf = Transform.getMutable(entity.visibleEntity.entity)//.getComponent(Transform)
    Vector3.scaleToRef(tf.scale, radius, tf.scale)

    /*
        if(this.workerPlanner) {
            this.workerPlanner.sendInitialData();
        }

        this.updateButtonLabels();*/
  }

  addPredators(count = 1) {
    const boundary = this.boidsController.getBoundary();
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * boundary[0]);
      const y = Math.floor(Math.random() * boundary[1]);
      const z = Math.floor(Math.random() * boundary[2]);
      const vx = (Math.random() * 4) - 2;
      const vy = (Math.random() * 4) - 2;
      const vz = (Math.random() * 4) - 2;

      const entity = new BoidEntity(BoidEntity.PREDATOR_ENTITY, x, y, z, vx, vy, vz);
      entity.canMove = true
      this.boidsController.addPredator(entity);
    }

    /*if(this.workerPlanner) {
        this.workerPlanner.sendInitialData();
    }

    this.updateButtonLabels();*/
  }

  addSeeks(count = 1) {
    const boundary = this.boidsController.getBoundary();
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * boundary[0]);
      const y = Math.floor(Math.random() * boundary[1]);
      const z = Math.floor(Math.random() * boundary[2]);
      const vx = (Math.random() * 4) - 2;
      const vy = (Math.random() * 4) - 2;
      const vz = (Math.random() * 4) - 2;

      //TODO use addSeek
      const entity = new BoidEntity(BoidEntity.SEEK_ENTITY, x, y, z, vx, vy, vz);
      entity.canMove = false
      this.boidsController.addSeekEntity(entity);
    }

    /*if(this.workerPlanner) {
        this.workerPlanner.sendInitialData();
    }

    this.updateButtonLabels();*/
  }
  //TODO make whol arg params
  addSeek(name: string, position: Vector3.ReadonlyVector3, radius: number) {
    const entity = new BoidEntity(BoidEntity.SEEK_ENTITY, position.x, position.y, position.z);
    entity.canMove = false
    entity.seekRadius = radius
    this.boidsController.addSeekEntity(entity);

    //Vector3.scaleToRef( entity.visibleEntity.entity.getComponent(Transform).scale,radius,entity.visibleEntity.entity.getComponent(Transform).scale)
    const tf = Transform.getMutable(entity.visibleEntity.entity)//.getComponent(Transform)
    Vector3.scaleToRef(tf.scale, radius, tf.scale)

    return entity
  }
  /*
      updateButtonLabels() {
          this.boidsButton.name('Add Boids (' + this.boidsController.getFlockEntities().length + ')');
          this.obstacleButton.name('Add Obs (' + this.boidsController.getObstacleEntities().length + ')');
      }*/
}