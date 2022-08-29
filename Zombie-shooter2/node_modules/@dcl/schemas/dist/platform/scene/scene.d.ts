import { JSONSchema, ValidateFunction } from '../../validation';
import { DisplayableDeployment } from '../shared/displayable';
import { FeatureToggles } from './feature-toggles';
import { SceneParcels } from './scene-parcels';
import { Source } from './source';
import { SpawnPoint } from './spawn-point';
/** @alpha */
export declare type Scene = DisplayableDeployment & {
    main: string;
    scene: SceneParcels;
    display?: {
        title?: string;
        /** @deprecated use menuBarIcon instead */
        favicon?: string;
        description?: string;
        navmapThumbnail?: string;
    };
    owner?: string;
    contact?: {
        name?: string;
        email?: string;
        im?: string;
        url?: string;
    };
    tags?: string[];
    source?: Source;
    spawnPoints?: SpawnPoint[];
    requiredPermissions?: string[];
    featureToggles?: FeatureToggles;
};
/** @alpha */
export declare namespace Scene {
    const schema: JSONSchema<Scene>;
    const validate: ValidateFunction<Scene>;
}
//# sourceMappingURL=scene.d.ts.map