import { Schemas, engine } from '@dcl/sdk/ecs'

// Flag for pixel entity
// Holds the id this pixel in the database
export const Pixel = engine.defineComponent('pixel', {
  id: Schemas.String
})

// Flag for color picker entity
export const ColorPicker = engine.defineComponent('colorPicker', {})

// The current color of an entity
export const HexColor = engine.defineComponent('hexColor', {
  hexColor: Schemas.String
})

// Flag for loading indicator, holds status: 'loading' or 'finished'
export const LoadingIndicator = engine.defineComponent('loadingIndicator', {
  status: Schemas.String
})
