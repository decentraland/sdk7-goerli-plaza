import { engine, Transform } from "@dcl/sdk/ecs";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";

export function createDebugPlayerPositionUI(): ReactEcs.JSX.Element{
    return (
        <UiEntity key={"ui-debug-player-position-container"}
            uiTransform={{
                display: 'flex',
                width: 320,
                height: 60,
                positionType: 'absolute',
                position: {top: "1%", left: "20%"},
                borderRadius: 10,
                alignContent: 'center',
                justifyContent: 'center',
            }}
            uiBackground={{
                color: Color4.create(0.2, 0, 0.4, 1)
            }}
        >
            <UiEntity
                uiTransform={{
                    display: 'flex',
                    width: "30%",
                    height: "80%",
                    alignSelf: 'center',
                    margin: {top: "10%", bottom: "10%", left: "1%", right: "1%"},
                    borderRadius: 10
                }}
                uiBackground={{
                    color: Color4.create(0.4, 0, 0, 1)
                }}
                uiText={{
                    value: "<b>X:</b> "+Math.round(Transform.get(engine.PlayerEntity).position.x*100)/100,
                    fontSize: 16,
                    //textAlign: "middle-left",
                    color: Color4.create(1, 1, 1, 1)
                }}
            />
            <UiEntity
                uiTransform={{
                    display: 'flex',
                    width: "30%",
                    height: "80%",
                    alignSelf: 'center',
                    margin: {top: "10%", bottom: "10%", left: "1%", right: "1%"},
                    borderRadius: 10
                }}
                uiBackground={{
                    color: Color4.create(0.4, 0, 0, 1)
                }}
                uiText={{
                    value: "<b>Y:</b> "+Math.round(Transform.get(engine.PlayerEntity).position.y*100)/100, 
                    fontSize: 16,
                    //textAlign: "middle-left",
                    color: Color4.create(1, 1, 1, 1)
                }}
            />
            <UiEntity
                uiTransform={{
                    display: 'flex',
                    width: "30%",
                    height: "80%",
                    alignSelf: 'center',
                    margin: {top: "10%", bottom: "10%", left: "1%", right: "1%"},
                    borderRadius: 10
                }}
                uiBackground={{
                    color: Color4.create(0.4, 0, 0, 1)
                }}
                uiText={{
                    value: "<b>Z:</b> "+Math.round(Transform.get(engine.PlayerEntity).position.z*100)/100,
                    fontSize: 16,
                    //textAlign: "middle-left",
                    color: Color4.create(1, 1, 1, 1)
                }}
            />
        </UiEntity>
    )
}