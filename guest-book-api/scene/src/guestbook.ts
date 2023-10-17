import {
  engine,
  GltfContainer,
  Transform,
  InputAction,
  pointerEventsSystem,
  TransformTypeWithOptionals
} from '@dcl/sdk/ecs'
import { setupUi, showUi } from './ui'

export class GuestBook {
  constructor(transform: TransformTypeWithOptionals) {
    setupUi()

    const guestBook = engine.addEntity()
    GltfContainer.create(guestBook, {
      src: 'models/guestbook/guestbook.glb'
    })
    Transform.create(guestBook, transform)

    pointerEventsSystem.onPointerDown(
      { entity: guestBook, opts: { button: InputAction.IA_POINTER, hoverText: 'Open' } },
      () => {
        showUi()
      }
    )

    const guestBookBase = engine.addEntity()
    GltfContainer.create(guestBookBase, {
      src: 'models/guestbook/guestbook_base.glb'
    })
    Transform.create(guestBookBase, {
      parent: guestBook
    })
  }
}
