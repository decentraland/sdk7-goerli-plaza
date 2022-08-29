import { JSONSchema, ValidateFunction } from '../../validation';
/** @public */
export declare const SCENE_UPDATE = "SCENE_UPDATE";
/** @public */
export declare type SceneUpdate = {
    type: typeof SCENE_UPDATE;
    payload: {
        sceneId: string;
        sceneType: string;
    };
};
/** @public */
export declare namespace SceneUpdate {
    const schema: JSONSchema<SceneUpdate>;
    const validate: ValidateFunction<SceneUpdate>;
}
//# sourceMappingURL=scene-update.d.ts.map