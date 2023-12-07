import { Transform, engine } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"

const ENV = "prd"
const DEBUG_FLAGS: Record<string,boolean> = {
    "local":true,
    "prd":false
}

class Config {
    CONFIG_CLAIM_TESTING_ENABLED = true

    init() {
    }
}

export const CONFIG = new Config()

export function initConfig() {
    CONFIG.init()
    return CONFIG
}
