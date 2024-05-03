class Config {
  CONFIG_CLAIM_TESTING_ENABLED = false
  init() {}
}

export const CONFIG = new Config()

export function initConfig() {
  CONFIG.init()
  return CONFIG
}
