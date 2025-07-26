import {
  Entity,
  GltfContainer,
  InputAction,
  Material,
  MaterialTransparencyMode,
  MeshCollider,
  MeshRenderer,
  Schemas,
  TextShape,
  Transform,
  TransformType,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { getEvents } from './eventApi'
import { Color3, Color4 } from '@dcl/sdk/math'
import { shortenText, splitTextIntoLines } from './helperFunctions'
import { teleportTo } from '~system/RestrictedActions'

export async function createEventBoard(currentEvent: number, interval: number, transform: Partial<TransformType>) {
  // Get event list from API
  const events = await getEvents().catch((error) => console.error(error))

  // If API returns no events return
  if (!events || events.length == 0) {
    console.log('No events found.')
    return
  }

  // Board Base
  const boardBase = engine.addEntity()
  Transform.create(boardBase, transform)

  // Board
  const board = engine.addEntity()
  GltfContainer.create(board, {
    src: 'assets/scene/Models/events-UI.glb'
  })
  Transform.create(board, {
    parent: boardBase,
    position: { x: 0, y: 0, z: 0 }
  })

  // Image
  const image = engine.addEntity()
  MeshRenderer.setPlane(image)
  Transform.create(image, {
    parent: boardBase,
    position: { x: 0, y: 0.4, z: -0.04 },
    scale: { x: 4.25, y: 2.125, z: 1 }
  })

  // Title
  const title = engine.addEntity()
  Transform.create(title, {
    parent: boardBase,
    position: { x: -1.9, y: -0.7, z: -0.04 }
  })
  TextShape.create(title, {
    text: 'Title',
    fontSize: 3,
    textAlign: 0 // top left
  })

  // coordinates
  const coordinates = engine.addEntity()
  Transform.create(coordinates, {
    parent: boardBase,
    position: { x: -1.7, y: -1.44, z: -0.04 }
  })
  TextShape.create(coordinates, {
    text: '00,00',
    fontSize: 2,
    textAlign: 0
  })

  // click pannel
  const clickPannel = engine.addEntity()
  MeshRenderer.setPlane(clickPannel)
  MeshCollider.setPlane(clickPannel)
  Transform.create(clickPannel, {
    parent: boardBase,
    position: { x: 0, y: 0, z: -0.2 },
    scale: { x: 5, y: 4.5, z: 1 }
  })
  Material.setPbrMaterial(clickPannel, invisibleMaterial)

  const eventBoard = {
    boardBase,
    board,
    image,
    title,
    coordinates,
    clickPannel,
    dots: [],
    currentEvent: currentEvent,
    interval: interval,
    timer: 0
  }

  // Attach the component with IDs to the entity to allow later access by the system
  EventBoardComponent.create(boardBase, eventBoard)

  // Remove the existing system first to prevent the
  // simultaneous operation of multiple switch systems.
  engine.removeSystem('switchEventSystem')
  engine.addSystem(switchEventSystem)

  // System
  function switchEventSystem(dt: number) {
    for (const [entity, component] of engine.getEntitiesWith(EventBoardComponent)) {
      const board = EventBoardComponent.getMutable(entity)
      board.timer -= dt
      if (board.timer < 0) {
        board.timer = board.interval
        if (events) {
          displayEvent(board, events, board.currentEvent)
          board.currentEvent += 1
          if (board.currentEvent >= events.length) {
            board.currentEvent = 0
          }
        }
      }
    }
  }

  return boardBase
}

export function displayEvent(eventBoard: any, events: any[], currentEvent: number) {
  if (events.length <= 0) return
  const event = events[currentEvent]

  // Image
  setImageTexture(eventBoard.image, event.image)

  // Coordinates
  let eventCoords = event.x.toString() + ',' + event.y.toString()
  if (event.scene_name) {
    eventCoords = shortenText(event.scene_name, 25) + '  ' + eventCoords
  }
  TextShape.getMutable(eventBoard.coordinates).text = eventCoords

  // Title
  TextShape.getMutable(eventBoard.title).text = splitTextIntoLines(event.name, 24, 2)

  // Click panel
  pointerEventsSystem.onPointerDown(
    {
      entity: eventBoard.clickPannel,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Teleport to event'
      }
    },
    function () {
      teleportTo({
        worldCoordinates: {
          x: event.x.toString(),
          y: event.y.toString()
        }
      })
    }
  )

  // Dots
  if (eventBoard.dots.length <= 0 && events.length > 1) {
    createDots(eventBoard, events.length)
  }

  if (events.length > 1) {
    for (let i = 0; i < eventBoard.dots.length; i++) {
      if (i === currentEvent) {
        Material.setPbrMaterial(eventBoard.dots[i], activeEventMaterial)
      } else {
        Material.setPbrMaterial(eventBoard.dots[i], inactiveEventMaterial)
      }
    }
  }
}

export function createDots(eventBoard: any, dotAmount: number) {
  for (let i = 0; i < dotAmount; i++) {
    const offset = (i - dotAmount / 2) * 0.1
    const dot = engine.addEntity()
    MeshRenderer.setPlane(dot)
    Transform.create(dot, {
      parent: eventBoard.boardBase,
      position: { x: offset, y: -1.9, z: -0.05 },
      scale: { x: 0.05, y: 0.05, z: 0.05 }
    })
    eventBoard.dots.push(dot)
  }
}

// Materials
const invisibleMaterial = {
  albedoColor: Color4.create(0, 0, 0, 0)
}

const inactiveEventMaterial = {
  texture: Material.Texture.Common({
    src: 'images/gray.png'
  }),
  transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND,
  roughness: 1.0
}

const activeEventMaterial = {
  texture: Material.Texture.Common({
    src: 'images/red.png'
  }),
  transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND,
  roughness: 1.0,
  specularIntensity: 0,
  metallic: 0,
  emissiveTexture: Material.Texture.Common({
    src: 'images/red.png'
  }),
  emissiveIntensity: 1,
  emissiveColor: Color3.White()
}

function setImageTexture(entity: Entity, texture: string) {
  Material.setPbrMaterial(entity, {
    texture: Material.Texture.Common({
      src: texture
    }),
    roughness: 1.0,
    specularIntensity: 0,
    metallic: 0,
    emissiveTexture: Material.Texture.Common({
      src: texture
    }),
    emissiveIntensity: 1,
    emissiveColor: Color3.White()
  })
}

// Custom component
export const EventBoardComponent = engine.defineComponent('eventBoardComponent', {
  boardBase: Schemas.Entity,
  board: Schemas.Entity,
  image: Schemas.Entity,
  title: Schemas.Entity,
  coordinates: Schemas.Entity,
  clickPannel: Schemas.Entity,
  dots: Schemas.Array(Schemas.Entity),
  currentEvent: Schemas.Int,
  interval: Schemas.Number,
  timer: Schemas.Number
})
