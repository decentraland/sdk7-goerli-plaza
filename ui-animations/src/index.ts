import { addEnvironment } from './test_environment'
import { setupUi } from './uiMain'

export function main() {
  // draw UI
  setupUi()

  //setup 3d scene
  addEnvironment()
}
