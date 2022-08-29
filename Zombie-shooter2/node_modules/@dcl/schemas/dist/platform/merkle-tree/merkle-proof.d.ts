import { JSONSchema, ValidateFunction } from '../../validation';
/**
 * Merkle Proof
 * @alpha
 */
export declare type MerkleProof = {
    proof: string[];
    index: number;
    hashingKeys: string[];
    entityHash: string;
};
/**
 * Merkle Proof
 * @alpha
 */
export declare namespace MerkleProof {
    const schema: JSONSchema<MerkleProof>;
    const validate: ValidateFunction<MerkleProof>;
}
//# sourceMappingURL=merkle-proof.d.ts.map