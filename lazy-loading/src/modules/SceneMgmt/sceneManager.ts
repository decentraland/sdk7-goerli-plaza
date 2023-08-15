import { Entity, Transform } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";


export interface SubScene {
    id: number;
    name: string;
    entities: any[]; // You can replace 'any' with the actual type of entities
    onInit?: () => void;
    onHide?: () => void;
    onShow?: () => void;
    addOnInitListener: (listener: () => void) => void;
    addOnHideListener: (listener: () => void) => void;
    addOnShowListener: (listener: () => void) => void;
    hide: () => void;
    disable: () => void;
    enable: () => void;
    show: () => void;
    init: () => void;
  }
  
  interface SceneInitData {
    name: string;
    entities: any[];
    onInit?: () => void;
    onHide?: () => void;
    onShow?: () => void;
  }
  
  interface SceneManager {
    scenes: SubScene[];
    generateSceneId: () => number;
    getSceneById: (id: number) => SubScene | null;
    addScene: (scene: SubScene | SceneInitData) => SubScene;
    changeToScene: (scene: SubScene) => void;
    initScenes: () => void;
    hideScenes: () => void;
  }
  
  export function createSceneManager(): SceneManager {
    const scenes: SubScene[] = [];
    let sceneIdGen = 1000;
  
    function generateSceneId(): number {
      return sceneIdGen++;
    }
  
    function getSceneById(id: number): SubScene | null {
      for (const p in scenes) {
        if (scenes[p].id == id) {
          return scenes[p];
        }
      }
      return null;
    }
  
    function addScene(scene: SubScene | SceneInitData): SubScene {
      console.log("addScene ENTRY ", scene);
      let retScene: SubScene;
  
      if ('id' in scene) {
        retScene = scene;
        scenes.push(scene);
      } else {
        const newScene: SubScene = {
          id: generateSceneId(),
          name: scene.name,
          entities: scene.entities,
          addOnInitListener: () => {},
          addOnHideListener: () => {},
          addOnShowListener: () => {},
          hide: () => {},
          disable: () => {},
          enable: () => {},
          show: () => {},
          init: () => {},
        };
  
        if (scene.onInit !== undefined) newScene.addOnInitListener(scene.onInit);
        if (scene.onHide !== undefined) newScene.addOnHideListener(scene.onHide);
        if (scene.onShow !== undefined) newScene.addOnShowListener(scene.onShow);
  
        retScene = newScene;
        scenes.push(newScene);
      }
  
      console.log("addScene EXIT ", retScene);
      return retScene;
    }
  
    function changeToScene(scene: SubScene) {
      console.log("changeToScene", scene.name);
      for (const p in scenes) {
        if (scenes[p] == scene) {
        } else {
          console.log("changeToScene. hiding", scenes[p].name);
          scenes[p].hide();
          scenes[p].disable();
        }
      }
      console.log("changeToScene. activating", scene.name);
      scene.enable();
      scene.show();
    }
  
    function initScenes() {
      for (const p in scenes) {
        scenes[p].init();
      }
    }
  
    function hideScenes() {
      for (const p in scenes) {
        scenes[p].hide();
      }
    }
  
    return {
      scenes,
      generateSceneId,
      getSceneById,
      addScene,
      changeToScene,
      initScenes,
      hideScenes,
    };
  }
  
//   export const sceneManager = createSceneManager();

export function hideScene(scene: Entity ){
  Transform.get(scene)
  Transform.createOrReplace(scene, {scale: Vector3.create(0,0,0)})
  
  
}

export function showScene(scene: Entity ){
  Transform.get(scene)
  Transform.createOrReplace(scene, {scale: Vector3.create(1,1,1)})
  
}