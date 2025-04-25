
import { EasingFunction, Entity, GltfContainer, InputAction, MeshCollider, MeshRenderer, PointerEventType, Schemas, Transform,TransformTypeWithOptionals,Tween,TweenLoop,TweenSequence,VisibilityComponent,engine, inputSystem } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Cell, createGridCell, setColor, setRandomColor } from './cell'


const WAVE_SPEED = 200

export enum GRID_ANIMATION_STATE {
    IDLE,
    RANDOM_HIGHLIGHT,
    RANDOM_PATTERN,   
    MATRIX_MOVEMENT,
    WAVE_MOVEMENT  ,
    FIXED_PATTERN,
    CHECKERS_PATTERN,
    RINGS_PATTERN,
    CIRCLE_ZOOM_PATTERN
}

export const Grid = engine.defineComponent('GridComponent', { 
    cells: Schemas.Array(Schemas.Array(Schemas.Entity)),
    root:Schemas.Entity,
    sideLengthX:Schemas.Number,
    sideLengthY:Schemas.Number,
    gridLnX:Schemas.Number,
    gridLnY:Schemas.Number,
    lowerCornerX:Schemas.Number,
    lowerCornerY:Schemas.Number,
    stepX:Schemas.Number,
    stepY:Schemas.Number,
    lastVisitedCell:Schemas.Entity,
    frequency:Schemas.Number,
    matrixFrequency:Schemas.Number,
    sparklingFrequency:Schemas.Number,
    elapsedTime:Schemas.Number,
    animationState:Schemas.EnumNumber<GRID_ANIMATION_STATE>(GRID_ANIMATION_STATE, GRID_ANIMATION_STATE.IDLE),
    isRotating:Schemas.Boolean,
    rotationAngle: Schemas.Number,
    phaseOn:Schemas.Boolean,
    circleZoomPhase:Schemas.Number,
    circleFrequency:Schemas.Number
})


export function createGrid(transform:TransformTypeWithOptionals, _sideLengthX:number, _sideLengthZ:number, _rotation:Quaternion):Entity{

    const grid = engine.addEntity()
    Transform.create(grid, transform)
    Grid.create(grid, {
        root: grid,
        sideLengthX: _sideLengthX,
        sideLengthY: _sideLengthZ,
        gridLnX: 12,
        gridLnY: 12,
        lowerCornerX: -_sideLengthX/2,
        lowerCornerY: -_sideLengthZ/2,
        stepX: _sideLengthX/12,
        stepY: _sideLengthZ/12,
        lastVisitedCell: undefined,
        frequency: 0.5,
        matrixFrequency: 0.11,
        sparklingFrequency: 0.07,
        elapsedTime: 0,
        animationState: GRID_ANIMATION_STATE.IDLE,
        isRotating: false,
        rotationAngle: 0,
        phaseOn: false, 
        circleZoomPhase: 0,
        circleFrequency: 0.12
    })

    initEntityPool(grid)
    initGrid(grid)
    hideCorners(grid)

    let gridMesh = engine.addEntity()
    Transform.create(gridMesh, {
        position: Vector3.create(0, 0.15, 0),
        parent: grid
    })
    GltfContainer.create(gridMesh, {src: "models/grid_dance_floor_mask6.glb" })

    let gridBase = engine.addEntity()
    Transform.create(gridBase, {
        position: Vector3.create(0, 0.0, 0),
        parent: grid
    })
    GltfContainer.create(gridBase, {src: "models/grid_dance_base2.glb"})

    //collider cylinder
    let collider = engine.addEntity()
    Transform.create(collider, {
        position: Vector3.add(Vector3.create(0, -0.1, 0), Transform.get(grid).position),
        scale: Vector3.create(14, 0.52, 14),
    })
   // MeshRenderer.setCylinder(collider)
    MeshCollider.setCylinder(collider)

    return grid

}

function hideCorners(grid:Entity){
    const gridData = Grid.getMutable(grid)
    for(let x=0; x< gridData.gridLnX; x++){ 
        for(let y=0; y< gridData.gridLnY; y++){
            if(isHiddenCorner(gridData.cells[y][x], gridData.gridLnX, gridData.gridLnY)){
                VisibilityComponent.getMutable(gridData.cells[y][x]).visible = false
            }
        }
    }
    
}

function initEntityPool(grid:Entity){

    const gridData = Grid.getMutable(grid)
        
    gridData.lowerCornerX = -gridData.sideLengthX/2
    gridData.lowerCornerY = -gridData.sideLengthY/2

    let scaleX = gridData.sideLengthX/gridData.gridLnX *0.90
    let scaleY = gridData.sideLengthY/gridData.gridLnY *0.90
    //const gameStateData = GameStateData.getMutable(gameStateEntity)

    for(let y=0; y< gridData.gridLnY; y++){
        let newLine:Entity[] = []
        for(let x=0; x< gridData.gridLnX;x++){

            let cell = createGridCell(
                y*gridData.gridLnX +x,
                {
                    position: Vector3.create( gridData.lowerCornerX + gridData.stepX/2 + x*gridData.stepX, -10, gridData.lowerCornerY + gridData.stepY/2 + y*gridData.stepY -20),
                    scale: Vector3.create(scaleX, scaleY, scaleX ),     
                    rotation:Quaternion.fromEulerDegrees(90,0,0)           
                },                
                x,
                y,
                gridData.root,
                false            

        ) 
        newLine.push(cell)    
        }
        
        gridData.cells.push(newLine)           
        
    }

    setAllNeighbors()
}

function initGrid(grid:Entity){

    const gridData = Grid.getMutable(grid)

    gridData.lowerCornerX = -gridData.sideLengthX/2
    gridData.lowerCornerY = -gridData.sideLengthY/2

    

    let scaleX = gridData.sideLengthX/gridData.gridLnX *0.90
    let scaleZ = gridData.sideLengthY/gridData.gridLnY *0.90

    gridData.stepX = gridData.sideLengthX/gridData.gridLnX
    gridData.stepY = gridData.sideLengthX/gridData.gridLnX

    //rectangle level moves up a bit
    if(gridData.gridLnX != gridData.gridLnY){
        gridData.lowerCornerY +=  gridData.stepY/2
    }

    //const gameStateData = GameStateData.getMutable(gameStateEntity)
 

    for(let y=0; y < gridData.gridLnY; y++){           
        for(let x=0; x < gridData.gridLnX;x++){
          
            let cell = gridData.cells[y][x]

            if(!isHiddenCorner(cell, gridData.gridLnX, gridData.gridLnY)){
                const cellTransform = Transform.getMutable(cell)
            
                let cellData = Cell.getMutable(cell)
                VisibilityComponent.getMutable(cell).visible = true
                cellData.active = true
            
                cellTransform.position =  Vector3.create( gridData.lowerCornerX + gridData.stepX/2 + x*gridData.stepX,0.09, gridData.lowerCornerY + gridData.stepY/2 + y*gridData.stepY )               
                cellTransform.scale =  Vector3.create(scaleX, scaleZ, scaleX)  

                cellData.originalScale = Vector3.create(scaleX, scaleZ, scaleX)
            }

        }            
    }   

    // Tween.create(gridData.root, {
    //     mode: Tween.Mode.Rotate({
    //         start: Quaternion.fromEulerDegrees(0, 0, 0),
    //         end: Quaternion.fromEulerDegrees(0, 180, 0),
    //     }),
    //     duration: 15000,
    //     easingFunction: EasingFunction.EF_LINEAR,
    // })
    // TweenSequence.create(gridData.root, {
    //     loop: TweenLoop.TL_RESTART,
    //     sequence: [
    //         {
    //             mode: Tween.Mode.Rotate({
    //                 start: Quaternion.fromEulerDegrees(0, 180, 0),
    //                 end: Quaternion.fromEulerDegrees(0, 360, 0),
    //             }),
    //             duration: 15000,
    //             easingFunction: EasingFunction.EF_LINEAR,
    //         },
    //     ],
    // })

} 

function setAllNeighbors(){
    const cellGrp = engine.getEntitiesWith(Cell, Transform)

    for(const [cell, cellData] of cellGrp){
        setNeighbors(cell)
    }
}

function setNeighbors(cell:Entity){
    const cellData = Cell.getMutable(cell)
    const gridGrp = engine.getEntitiesWith(Grid, Transform)
    
    for(const [grid, gridData] of gridGrp){
        if(cellData.z < gridData.gridLnY-1) cellData.neighborNorth = gridData.cells[cellData.z + 1][cellData.x]
        if(cellData.z > 0) cellData.neighborSouth = gridData.cells[cellData.z - 1][cellData.x]
        if(cellData.x < gridData.gridLnX-1) cellData.neighborEast = gridData.cells[cellData.z][cellData.x + 1]
        if(cellData.x > 0) cellData.neighborWest = gridData.cells[cellData.z][cellData.x - 1]
    }
}

function isHiddenCorner(cell:Entity, maxX:number, maxY:number):boolean{

    const cellData = Cell.get(cell)
    //const gridData = Grid.get(grid)
    if(cellData.x <=1 && cellData.z <= 1
        || cellData.x >= maxX -2 && cellData.z >= maxY -2
        || cellData.x <= 1 && cellData.z >= maxY -2
        || cellData.x >= maxX -2 && cellData.z <= 1
     ){
        return true
     }
     return false

}

function getClosestCell(position:Vector3):Entity | null {

    const gridGrp = engine.getEntitiesWith(Grid, Transform)
    
   
    for(const [grid, gridData] of gridGrp){

        const rootTransForm = Transform.get(gridData.root)
        let positionRotated = Vector3.subtract(position, rootTransForm.position)
        positionRotated = Vector3.rotate(positionRotated, Quaternion.fromEulerDegrees(0, -gridData.rotationAngle, 0))
        positionRotated = Vector3.add(positionRotated, rootTransForm.position)
        
        if( 
            position.y < 0.35 
            && realDistance(position, rootTransForm.position) < 7
            && positionRotated.x > rootTransForm.position.x - gridData.sideLengthX/2
            && positionRotated.x < rootTransForm.position.x + gridData.sideLengthX/2 
            && positionRotated.z > rootTransForm.position.z - gridData.sideLengthY/2
            && positionRotated.z < rootTransForm.position.z  + gridData.sideLengthY/2
           
        ){
           let x = Math.floor((positionRotated.x - (rootTransForm.position.x - gridData.sideLengthX/2)) / gridData.stepX)
           let y = Math.floor((positionRotated.z - (rootTransForm.position.z - gridData.sideLengthY/2)) / gridData.stepY)

           if(isHiddenCorner(gridData.cells[y][x], gridData.gridLnX, gridData.gridLnY)){
            return null
           }


           if(Grid.get(grid).lastVisitedCell != Cell.get(gridData.cells[y][x]).id){
            Cell.getMutable(gridData.cells[y][x]).playerEntered = false
            Grid.getMutable(grid).lastVisitedCell = gridData.cells[y][x]
            return gridData.cells[y][x]
           }
           
        }
    }

    return null

       
}


export function gridMainSystem(dt:number){

    let playerPos = Transform.get(engine.PlayerEntity).position

    let closestCell = getClosestCell(playerPos)

    if(closestCell){        

        //console.log("PLAYER ENTERED: " +Cell.get(closestCell).playerEntered)
        if(!Cell.get(closestCell).playerEntered){
            setColor(closestCell, 'white')
            startShrinking(closestCell)
            Cell.getMutable(closestCell).playerEntered = true
            //highlightNeighbors(closestCell,0)
            startWaveAnimation(closestCell)
            
        }

        // if(Grid.get(engine.PlayerEntity).lastVisitedCell != Cell.get(closestCell).id){
        //     Cell.getMutable(closestCell).playerEntered = false
        //     setColor(closestCell, 'white')
        // }

    }
    

   
}

export function setGridAnimationState(state:GRID_ANIMATION_STATE){
    const gridGrp = engine.getEntitiesWith(Grid, Transform)

    for(const [grid, gridData] of gridGrp){
        const gridDataMutable = Grid.getMutable(grid)
        gridDataMutable.animationState = state

        if(state == GRID_ANIMATION_STATE.MATRIX_MOVEMENT){
            startMatrixMovement(true)
        }

        if(state == GRID_ANIMATION_STATE.WAVE_MOVEMENT){
            startMatrixMovement(false)
        }
    }
}

export function startShrinking(cell:Entity, duration?:number){
    Tween.createOrReplace(cell, {
        duration: duration? duration + (Math.random()* duration * 0.2)  : 1 * 1000,
        easingFunction: EasingFunction.EF_EASEINCUBIC,
        currentTime: 0,
        playing: true,
        mode: Tween.Mode.Scale({
            start: Vector3.create(1,1,1),
            end: Vector3.Zero(), 
        }),
    }) 
}

export function highlightRandomCell(){

    const gridGrp = engine.getEntitiesWith(Grid, Transform)

    for(const [grid, gridData] of gridGrp){
        
        const randomCell = gridData.cells[Math.floor(Math.random() * gridData.gridLnY)][Math.floor(Math.random() * gridData.gridLnX)]
        //setColor(randomCell, 'white')
        if(!isHiddenCorner(randomCell, gridData.gridLnX, gridData.gridLnY)){
            setRandomColor(randomCell)
            startShrinking(randomCell)
        }
    }
}

export function highlightRandomPattern(){

    const cellGrp = engine.getEntitiesWith(Cell, Transform)
    const gridGrp = engine.getEntitiesWith(Grid, Transform)

    for(const [grid, gridData] of gridGrp){

        for(const [cell, celllData] of cellGrp){
            
            if(!isHiddenCorner(cell, gridData.gridLnX, gridData.gridLnY)){
                if(Math.random() > 0.7){
                    setRandomColor(cell)
                    startShrinking(cell, 300)
                }
                else{
                    setColor(cell, 'default')
                }
            }
            
        }   
    }
    
}

export function startRotationAnimation(){
    const gridGrp = engine.getEntitiesWith(Grid, Transform)

    for(const [grid, gridData] of gridGrp){
        const gridDataMutable = Grid.getMutable(grid)
        gridDataMutable.isRotating = true
    }
}

export function stopRotationAnimation(){
    const gridGrp = engine.getEntitiesWith(Grid, Transform)

    for(const [grid, gridData] of gridGrp){
        const gridDataMutable = Grid.getMutable(grid)
        gridDataMutable.isRotating = false
    }
}
let waveID = 0
export function startWaveAnimation(startCell:Entity){

    const gridGrp = engine.getEntitiesWith(Grid, Transform)

    for(const [grid, gridData] of gridGrp){

        waveID++
        highlightNeighbors(startCell, waveID)
    }
}


export function startMatrixMovement(random:boolean = false){
    const gridGrp = engine.getEntitiesWith(Grid, Transform)

    for(const [grid, gridData] of gridGrp){
        const gridDataMutable = Grid.getMutable(grid)
        gridDataMutable.animationState = GRID_ANIMATION_STATE.MATRIX_MOVEMENT

        //reset all cells
        for(let x=0; x< gridData.gridLnX; x++){
            for(let y=0; y< gridData.gridLnY; y++){
                const cell = gridData.cells[y][x]
                Cell.getMutable(cell).highlighted = false
            }
        }

        //highlight random cells in each column
        for(let x=0; x< gridData.gridLnX; x++){
            let randomY = gridData.gridLnY-1
            if(random){
             randomY = Math.floor(Math.random() * gridData.gridLnY)
            }           
            let cell = gridData.cells[randomY][x]
            //if(!isHiddenCorner(cell, gridData.gridLnX, gridData.gridLnY)){
                setRandomColor(cell)
                startShrinking(cell, 500)
                Cell.getMutable(cell).highlighted = true
           // }
        }
           
    }
}
export function updateMatrixMovement(){
    const gridGrp = engine.getEntitiesWith(Grid, Transform)

    for(const [grid, gridData] of gridGrp){
       
        for(let x=0; x< gridData.gridLnX; x++){
            for(let y=0; y< gridData.gridLnY; y++){
                const cell = gridData.cells[y][x]
                let cellData = Cell.get(cell)
                if(cellData.highlighted){
                    if(cellData.neighborSouth){
                        setRandomColor(cellData.neighborSouth)
                        startShrinking(cellData.neighborSouth, 500)
                       Cell.getMutable(cellData.neighborSouth).highlighted = true
                    }
                    else{
                        //console.log("no neighbor south")
                        if(gridData.cells[gridData.gridLnY-1][x]){
                            //console.log("neighbor switched to 0 , " + x)                        
                            setRandomColor(gridData.cells[gridData.gridLnY-1][x])
                            startShrinking(gridData.cells[gridData.gridLnY-1][x], 500)
                            Cell.getMutable(gridData.cells[gridData.gridLnY-1][x]).highlighted = true
                        }
                    }
                    Cell.getMutable(cell).highlighted = false
                  

                }
            }
        }
    }
}

export function applyPattern(grid:Entity, pattern:number[][], flash:boolean = true, clear:boolean = true, shrinkTime:number = 300){
    const gridData = Grid.get(grid)

    for(let x=0; x< gridData.gridLnX; x++){
        for(let y=0; y< gridData.gridLnY; y++){
            const cell = gridData.cells[y][x]
            if(pattern[y][x] == 0){
                setRandomColor(cell)
                if(flash){
                    startShrinking(cell, shrinkTime)
                }
            }
            else{
                if(clear){
                    setColor(cell, 'default')
                }
            }
        }
    }
}

function highlightNeighbors(cell:Entity, waveID:number){

    const cellData = Cell.getMutable(cell)
    cellData.waveID = waveID

    if(cellData.neighborNorth){
        if(!isHiddenCorner(cellData.neighborNorth, 12, 12)){           
            setRandomColor(cellData.neighborNorth)   
            startShrinking(cellData.neighborNorth,400)
            // if(Cell.get(cellData.neighborNorth).waveID != waveID){
            //     utils.timers.setTimeout(()=>{ highlightNeighbors(cellData.neighborNorth, waveID)}, WAVE_SPEED)                
            // }
        }
    }
    if(cellData.neighborSouth){
        if(!isHiddenCorner(cellData.neighborSouth, 12, 12)){           
                setRandomColor(cellData.neighborSouth)    
                startShrinking(cellData.neighborSouth,400)  
                // if(Cell.get(cellData.neighborSouth).waveID != waveID){
                //     utils.timers.setTimeout(()=>{ highlightNeighbors(cellData.neighborSouth, waveID)}, WAVE_SPEED)                
                // }
              //  utils.timers.setTimeout(()=>{highlightNeighbors(cellData.neighborWest)}, 400)         
        }
    }
    if(cellData.neighborEast){
        if(!isHiddenCorner(cellData.neighborEast, 12, 12)){           
            setRandomColor(cellData.neighborEast)   
            startShrinking(cellData.neighborEast,400)   
            // if(Cell.get(cellData.neighborEast).waveID != waveID){
            //     utils.timers.setTimeout(()=>{ highlightNeighbors(cellData.neighborEast, waveID)}, WAVE_SPEED)                
            // }
           // utils.timers.setTimeout(()=>{highlightNeighbors(cellData.neighborWest)}, 400)        
        }
    }
    if(cellData.neighborWest){
        if(!isHiddenCorner(cellData.neighborWest, 12, 12)){           
            setRandomColor(cellData.neighborWest)   
            startShrinking(cellData.neighborWest,400)   
            // if(Cell.get(cellData.neighborWest).waveID != waveID){
            //     utils.timers.setTimeout(()=>{ highlightNeighbors(cellData.neighborWest, waveID)}, WAVE_SPEED)                
            // }
            
          //  utils.timers.setTimeout(()=>{highlightNeighbors(cellData.neighborWest)}, 400)
        }

        
     }
    
    
}

function realDistance(pos1: Vector3, pos2: Vector3): number 
{
    const a = pos1.x - pos2.x
    const b = pos1.y - pos2.y
    const c = pos1.z - pos2.z
    return Math.sqrt(a * a + b * b + c * c)
}
