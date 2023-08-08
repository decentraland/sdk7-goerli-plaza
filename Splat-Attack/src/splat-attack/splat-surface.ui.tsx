/*    SPLAT SURFACE
    contains all functional components of the splat surface object, including model's file path,
    interface for placement calls, splat placement functionality, and total area calculation. 

    because this module provides a ui render, so the file extension needs to be 'ui.tsx' 
*/

import { Entity, GltfContainer, InputAction, PointerEventType, PointerEvents, Transform, engine, inputSystem } from "@dcl/sdk/ecs";
import { ReactEcs, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { SplatObject } from "./splat-object";
import { Color4 } from "@dcl/sdk/math";

//begin rendering the ui, this can only be called once within the scene, if you have a ui
//  wrapper you can pull this code up to that.
ReactEcsRenderer.setUiRenderer(() => (<UiEntity
    key={-1}
    uiTransform={{
        position: { top:'55%', left:'50%'},
        width: 0,
        height: 0,
        positionType: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    }}
>
    {SplatSurface.GetUIRender()}
</UiEntity>));

/** manages the state of the splat surface, acting as the interaction point for players to place 
 *  splats & calculate the entire area covered by splat objects.
 */
export module SplatSurface
{
    /** when true debug logs are generated (toggle off when you deploy) */
    const isDebugging:boolean = false;
    
    /** splat surface model location */
    const MODEL_SPLAT_SURFACE:string = "models/splat-attack/splat-surface.glb";
    /** */
    var splatVolume:number = 0;

    /** interaction surface used by player to create splats */
    var splatSurfaceEntity:undefined|Entity = undefined;

    /** object interface used to define all data required to manipulate the transform of the splat surface object */
    export interface SplatSurfaceTransformData {
        x:number; y:number; z:number;
    }

    //prepare splat surface object interactions
    engine.addSystem(() => {
        //consume primary key-down event -> place splat object
        if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, SplatSurface.GetSurfaceObject())){
            //access and process result
            const result = inputSystem.getInputCommand(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, SplatSurface.GetSurfaceObject());
            if(result && result.hit && result.hit.position) {
                SplatSurface.PlaceSplatObject(result.hit.position);
            }
        }
        //consume secondary key-down event -> calculate volume
        if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN, SplatSurface.GetSurfaceObject())){
            SplatSurface.DisplaySplatVolume();
        }
        //consume '1' key-down event -> reset splat objects
        if (inputSystem.isTriggered(InputAction.IA_ACTION_3, PointerEventType.PET_DOWN, SplatSurface.GetSurfaceObject())){
            SplatSurface.ResetSplatSurface();
        }
    });

    /** returns the surface object, only one instance is maintained. */
    export function GetSurfaceObject():Entity {
        //ensure surface object has been initialized
        if(splatSurfaceEntity == undefined) {
            if(isDebugging) console.log("Splat Surface: object does not exist, creating new surface...");
            //create surface object
            //  entity
            splatSurfaceEntity = engine.addEntity();
            Transform.create(splatSurfaceEntity);
            //  custom model
            GltfContainer.create(splatSurfaceEntity, {
                src: MODEL_SPLAT_SURFACE,
                visibleMeshesCollisionMask: undefined,
                invisibleMeshesCollisionMask: undefined
            });
            //  pointer event system
            PointerEvents.create(splatSurfaceEntity, {
                pointerEvents: [
                  { //primary key -> places a new splat object
                    eventType: PointerEventType.PET_DOWN,
                    eventInfo: { button: InputAction.IA_PRIMARY, hoverText: "Place Splat" }
                  },
                  { //secondary key -> calculates the volume of all splat objects
                    eventType: PointerEventType.PET_DOWN,
                    eventInfo: { button: InputAction.IA_SECONDARY, hoverText: "Calculate Volume" }
                  },
                  { //secondary key -> resets the splat surface
                    eventType: PointerEventType.PET_DOWN,
                    eventInfo: { button: InputAction.IA_ACTION_3, hoverText: "Reset Splat Surface" }
                  }
                ]
            });
            if(isDebugging) console.log("Splat Surface: created new surface!");
        }
        return splatSurfaceEntity;
    }

    export function PlaceSplatObject(position:SplatSurfaceTransformData) {
        if(isDebugging) console.log("Splat Surface: action call -> place splat object");
        //place splat object
        SplatObject.Create(position);
        //add splat's volume as a new circle listing
        circles.push(new Circle(position.x, position.y, 0.5));
        //play splat sound
        SplatObject.PlaySound();
    }

    export function DisplaySplatVolume() {
        if(isDebugging) console.log("Splat Surface: action call -> display splat volume");
        //get splat volume amount
        splatVolume = calculateArea();
        //update ui
    }

    export function ResetSplatSurface() {
        if(isDebugging) console.log("Splat Surface: action call -> reset splat objects");
        //reset volume readout
        splatVolume = 0;
        //disable all splat objects
        SplatObject.DisableAll();
        //reset volume data
        circles = [];
    }

    /** moves the splat surface to the given location */
    export function Move(mod:SplatSurfaceTransformData) {
        if(isDebugging) console.log("Splat Surface: splat surface moved to pos(x="+mod.x+", y="+mod.y+", z="+mod.z+")");
        Transform.getMutable(GetSurfaceObject()).position = mod;
    }

    /** rescales the splat surface to the given size */
    export function Scale(mod:SplatSurfaceTransformData) {
        if(isDebugging) console.log("Splat Surface: splat surface rescaled to scale(x="+mod.x+", y="+mod.y+", z="+mod.z+")");
        Transform.getMutable(GetSurfaceObject()).scale = mod;
    }
    
    /** returns ui element for displaying the current splat volume */
    export function GetUIRender() {
        //ensure splat volume has been calculated
        if(splatVolume == 0) return null;
        //return draw with splat volume
        return <UiEntity key= {"SA0"}
        uiTransform={{
            width: 0, height: 0,
            position: { top:0, bottom:0, left:0, right:0 },
            alignContent: 'center',
            justifyContent: 'center',
            positionType: 'absolute',
        }}
        uiText={{ 
            value: "AREA COVERED BY SPLAT: "+splatVolume.toFixed(3), 
            textAlign: 'middle-center',
            fontSize: 8, 
            color: Color4.Teal(),
        }}
    />
    }

    /*          circle fill calculation
    *   adapted from the grid sampling solution versino 4 to the total circles area problem.
    *   link: https://rosettacode.org/wiki/Total_circles_area#Grid_Sampling_Version_4
    * 
    *   NOTE: also works with any circle with an arbitrary radius
    */
    /** resolution for sampling */
    const sample_size = 256;
    /** listing of all circles */
    var circles: Circle[] = [];
    //grid diff sets
    var x_min_diffs: number[];
    var x_max_diffs: number[];
    var y_min_diffs: number[];
    var y_max_diffs: number[];

    /** represents a splat's volume */
    class Circle {
        constructor(public x: number, public y: number, public r: number) {

        }
    }
    
    /** returns the full area covered by all circles within the circle array, represents volume of splat */
    function calculateArea(): number {
        if(isDebugging) console.log("Splat Surface: calculating splat area...");
        //reset processing arrays
        x_min_diffs = [];
        x_max_diffs = [];
        y_min_diffs = [];
        y_max_diffs = [];
        //process all circles, adding their range bounds to the calc map
        for (let c of circles) {
            x_min_diffs.push(c.x - c.r);
            x_max_diffs.push(c.x + c.r);
            y_min_diffs.push(c.y - c.r);
            y_max_diffs.push(c.y + c.r);
        }
        //determine coverage
        let x_min = Math.min(...x_min_diffs);
        let x_max = Math.max(...x_max_diffs);
        let y_min = Math.min(...y_min_diffs);
        let y_max = Math.max(...y_max_diffs);
        //sampling definition
        let dx = (x_max - x_min) / sample_size;
        let dy = (y_max - y_min) / sample_size;
        //process range check, adding each new extension on the grid
        let count = 0;
        for (let r = 0; r < sample_size; r++) {
            let y = y_min + r * dy
            for (let c = 0; c < sample_size; c++) {
                let x = x_min + c * dx
                for (let i = 0; i < circles.length; i++) {
                    if (Math.pow(x - circles[i].x, 2) + Math.pow(y - circles[i].y, 2) <= Math.pow(circles[i].r, 2)) {
                        count += 1;
                        break;
                    }
                }
            }
        }
        let areaCovered = count * dx * dy;
        if(isDebugging) console.log("Splat Surface: calculated splat area="+areaCovered);
        return areaCovered;
    }
}