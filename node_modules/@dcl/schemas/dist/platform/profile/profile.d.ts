import { JSONSchema, ValidateFunction } from '../../validation';
import { Avatar } from './avatar';
/**
 * Profile containing one or multiple avatars
 * @alpha
 */
export declare type Profile = {
    avatars: Avatar[];
};
/**
 * Profile
 * @alpha
 */
export declare namespace Profile {
    const schema: JSONSchema<Profile>;
    const validate: ValidateFunction<Profile>;
}
//# sourceMappingURL=profile.d.ts.map