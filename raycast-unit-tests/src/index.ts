export * from '@dcl/sdk'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import './raycast.test'
import { ui } from './ui'

ReactEcsRenderer.setUiRenderer(ui)
