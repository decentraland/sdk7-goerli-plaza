import {
    engine,
    Transform,
    GltfContainer,TextShape, Name,
    MeshRenderer,
  } from '@dcl/sdk/ecs'
  import { Vector3, Quaternion } from '@dcl/sdk/math'
  

     // Function to build the scene with 3D models 
  export function buildScene() {


    // Facade
    const Facade = engine.addEntity()
    GltfContainer.create(Facade, { src: 'models/facade.glb' })
    MeshRenderer.create(Facade)
    Transform.create(Facade, {
        position: Vector3.create(8, 0.05, 10),
    })

    // Ground
    const Ground = engine.addEntity()
    GltfContainer.create(Ground, { src: 'models/baseDarkWithCollider.glb' })
    MeshRenderer.create(Ground)
    Transform.create(Ground, {

    })

    // Signpost Golden
    const signpostGolden = engine.addEntity()
    GltfContainer.create(signpostGolden, { src: 'models/signpost/Signpost_Golden.glb' }) 
    MeshRenderer.create(signpostGolden)
    Transform.create(signpostGolden, {
        position: Vector3.create(6.374037265777588, 0, 3.6893038749694824),
        rotation: Quaternion.create(0, 0, 0, 1),
        scale: Vector3.create(1, 1, 1)
    })

    // Signpost Text
    const signpostText = engine.addEntity()
    Transform.create(signpostText, {
      parent: signpostGolden,                         // using parent so text is attached to singpost and its easier to adjust text 
      position: { x: 0, y: 2.05, z: 0.02 },
      rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    })
    TextShape.create(signpostText, {                     
      text: 'Welcome',
      fontSize: 1.5,
      textColor: { r: 0, g: 0, b: 0, a: 1 } ,          // rgb and 'a' for alpha 
    })
    Name.create(signpostText, { value: 'signpost' })


  }
  
