import { InputAction, 
    Material, 
    MeshCollider, 
    MeshRenderer, 
    TextShape, 
    Transform, 
    engine, 
    pointerEventsSystem, 
} from "@dcl/sdk/ecs";
import { Color4, Vector3 } from "@dcl/sdk/math";
import { TeamModels, changeModel } from "./modelsHandler";

export function createJoinTeamControl(team : TeamModels, position : Vector3, color : Color4){
    let teamBall = engine.addEntity();

    MeshRenderer.setSphere(teamBall);
    Material.setPbrMaterial(teamBall, {
        albedoColor : color,
    });

    MeshCollider.setBox(teamBall);

    Transform.create(teamBall, {
        position : position,
        scale : Vector3.create(.5,.5,.5), 
    });

    pointerEventsSystem.onPointerDown(teamBall, function (){
        changeModel(team);
    },
    {
        button: InputAction.IA_PRIMARY,
        hoverText: "Join Team: "+ team,
        maxDistance : 5
    });

    let label = engine.addEntity();
    Transform.create(label, {
        parent : teamBall,
        position : Vector3.create(0,2,0),
    });
    TextShape.create(label, {
        text: "Join Team:\n"+ team,
        fontSize: 5,
    });
}