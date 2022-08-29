import { JSONSchema, ValidateFunction } from '../../validation';
import { Locale } from './locale';
/** @alpha */
export declare type I18N = {
    code: Locale;
    text: string;
};
/** @alpha */
export declare namespace I18N {
    const schema: JSONSchema<I18N>;
    const validate: ValidateFunction<I18N>;
}
//# sourceMappingURL=i18n.d.ts.map