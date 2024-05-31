import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label, UiEntity } from '@dcl/sdk/react-ecs'

type CornerStatusProps = {
    message: string
    color: Color4
}

{/* Corner - UI - Conecction */ }
function CornerStatus({ message, color }: CornerStatusProps): ReactEcs.JSX.Element {
    return (
        <UiEntity
            uiTransform={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                positionType: 'absolute',
                position: { right: "10%", bottom: '3%' },
            }}
        >
            <UiEntity
                uiTransform={{
                    width: '100',
                    height: '100',
                }}
                uiBackground={{ color: Color4.create(0, 0, 0, 0) }}
            />
            {/* Label - Title */}
            <Label
                uiTransform={{
                    position: { right: '30%', bottom: '20%' }
                }}
                value={message}
                fontSize={18}
                font='sans-serif'
                color={color}
            />
        </UiEntity>
    )
}

export default CornerStatus