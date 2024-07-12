import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { fetchSignatures, getSignaturePage, getSignatureTotalPage, signGuestbook } from './serverHandler'

const scaleMultiplier = 0.5

var isVisible: boolean = false
var hasPreviousPage: boolean = false
var hasNextPage: boolean = false
var currentSignatures: string = ''
var currentPage: number

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: 1024 * scaleMultiplier,
      height: 912 * scaleMultiplier,
      display: isVisible ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      positionType: 'absolute',
      position: { top: '50%', left: '50%' },
      margin: { top: -1024 * scaleMultiplier / 2, left: -912 * scaleMultiplier / 2 },
    }}
    uiBackground={{
      textureMode: 'stretch',
      texture: {
        src: 'images/UI_Guestbook_Background.png',
      }
    }}
  >
    
    <Button
      uiTransform={{
        width: 76 * scaleMultiplier,
        height: 76 * scaleMultiplier,
        display: hasPreviousPage ? 'flex' : 'none',
        positionType: 'absolute',
        position: { right: '85%' }
      }}
      uiBackground={{
        textureMode: 'stretch',
        texture: {
          src: 'images/UI_Guestbook_Arrow_Left.png',
        },
      }}
      value=''
      variant='secondary'
      onMouseDown={() => {
        currentPage--
        displaySignature(getSignaturePage(currentPage), currentPage > 0, true)
      }}
    />
    
    <Button
      uiTransform={{
        width: 76 * scaleMultiplier,
        height: 76 * scaleMultiplier,
        display: hasNextPage ? 'flex' : 'none',
        positionType: 'absolute',
        position: { left: '85%' }
      }}
      uiBackground={{
        textureMode: 'stretch',
        texture: {
          src: 'images/UI_Guestbook_Arrow_Right.png',
        },
      }}
      value=''
      variant='secondary'
      onMouseDown={() => {
        currentPage++
        displaySignature(getSignaturePage(currentPage), true, getSignatureTotalPage() > currentPage + 1)
      }}
    />

    <Button
      uiTransform={{
        width: 460 * scaleMultiplier,
        height: 75 * scaleMultiplier,
        positionType: 'absolute',
        position: { top: '85%' }
      }}
      uiBackground={{
        textureMode: 'stretch',
        texture: {
          src: 'images/UI_Guestbook_SignButton.png',
        },
      }}
      value=''
      variant='secondary'
      onMouseDown={() => {
        signGuestbook()
      }}
    />

    <Label
      uiTransform={{
        positionType: 'absolute',
        position: { top: '15%' }
      }}
      value='I was also blown away by the crater!'
      color={ Color4.Black() }
      fontSize={ 50 * scaleMultiplier }
    />

    <Label
      uiTransform={{
        height: 76 * scaleMultiplier,
        positionType: 'absolute',
        position: { top: '51%' }
      }}
      value={ currentSignatures }
      color={ Color4.Gray() }
      fontSize={ 50 * scaleMultiplier }
    />
    
    <Button
      uiTransform={{
        width: 76 * scaleMultiplier,
        height: 76 * scaleMultiplier,
        positionType: 'absolute',
        position: { top: '2%', right: '2%' }
      }}
      value='X'
      fontSize={ 20 }
      variant='primary'
      onMouseDown={() => {
        closeUi()
      }}
    />

  </UiEntity>
)

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

export function showUi() {
  if (isVisible) {
    return
  }

  console.log('OPENED GUESTBOOK')

  isVisible = true
  currentPage = 0
  displaySignature('Fetching Signatures', false, false)
  fetchSignatures()
}

export function closeUi() {
  isVisible = false
}

export function displaySignature(signatures: string, hasPrevious: boolean, hasNext: boolean) {
  currentSignatures = signatures
  hasPreviousPage = hasPrevious
  hasNextPage = hasNext

  console.log('signature to show from page ' + currentPage + ' : ' + signatures)
}
