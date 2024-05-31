

import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label } from '@dcl/sdk/react-ecs'

type AnnouncementProps = {
    visible: boolean
    color: Color4
    text: string
}

function Announcement({ visible, text, color }: AnnouncementProps): ReactEcs.JSX.Element {
    return (
        <Label
            uiTransform={{
                width: 13,
                height: 13,
                margin: { top: '5%', bottom: '0%', left: '50%', right: '50%' },
                positionType: 'absolute',
                position: { bottom: '0%', top: '0%', left: '0%' },
                display: visible ? 'flex' : 'none',
            }}
            fontSize={40}
            font='sans-serif'
            value={text}
            color={color}
        />
    )
}

export default Announcement