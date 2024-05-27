import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { GameController } from '../game.controller'

export class SwitchTogglers {
  private disable_button1 = false
  private disable_button2 = false
  private disable_button3 = false
  private disable_button4 = false
  private disable_button5 = false
  private disable_button6 = false
  private disable_button7 = false
  private disable_button8 = false
  private disable_button9 = false
  private disable_button10 = false
  private disable_button11 = false
  private disable_button12 = false
  private visibleUi = false
  successNeeded = 12
  currentSuccesses = 0
  started: boolean
  onWinCallback: () => any
  gameController: GameController
  constructor(gameController: GameController, onWinCallback: () => any) {
    this.gameController = gameController
    this.onWinCallback = onWinCallback
    this.started = false
  }
  mainUi() {
    return <UiEntity
      uiTransform={{
        width: 800,
        height: 600,
        margin: '10% 50px 50% 30%',
        position: { top: '0%' },
        padding: { top: 4, bottom: 4, left: 4, right: 4 },
        display: this.visibleUi ? 'flex' : 'none',
      }}
    >
      <UiEntity
        uiTransform={{
          width: 800,
          height: 600,
          maxWidth: '100%',
          maxHeight: '100%',
          minHeight: '12%',
          minWidth: '15%',
          positionType: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        uiBackground={{
          color: Color4.fromHexString('#342E39'),
          textureMode: 'stretch'
        }}
      >
        {/* Label - Title */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            margin: { top: '9%', bottom: '0%', left: '50%', right: '50%' },
            positionType: 'absolute',
            position: { bottom: '0%', top: '0%', left: '0%' },
          }}
          fontSize={40}
          font='sans-serif'
          value={'TURN EVERYTHING OFF'}
          color={Color4.Green()}
        />
        {/* Label - Success */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            margin: { top: '0%', bottom: '0%', left: '50%', right: '50%' },
            positionType: 'absolute',
            position: { bottom: '0%', top: '80%', left: '0%' },
          }}
          fontSize={40}
          font='sans-serif'
          value={'SUCCESS: ' + this.currentSuccesses + '/12'}
          color={Color4.Yellow()}
        />
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* First Row of Buttons */}
          <UiEntity
            uiTransform={{
              width: '100%',
              height: 'auto',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button1}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button1 = true
              }}
            />
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button2}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button2 = true

              }}

            />
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button3}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button3 = true

              }}

            />
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button4}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button4 = true

              }}

            />
          </UiEntity>
          {/* Second Row of Buttons */}
          <UiEntity
            uiTransform={{
              width: '100%',
              height: 'auto',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button5}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button5 = true

              }}

            />
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button6}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button6 = true

              }}

            />
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button7}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button7 = true

              }}

            />
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button8}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button8 = true

              }}

            />
          </UiEntity>
          {/* Third Row of Buttons */}
          <UiEntity
            uiTransform={{
              width: '100%',
              height: 'auto',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button9}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button9 = true

              }}

            />
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button10}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button10 = true

              }}

            />
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button11}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button11 = true

              }}

            />
            <Button
              value=""
              variant='primary'
              uiTransform={{ width: 80, height: 20, margin: 4 }}
              disabled={this.disable_button12}
              onMouseDown={() => {
                this.addSuccess(1)
                this.disable_button12 = true

              }}
            />
          </UiEntity>
        </UiEntity>
      </UiEntity>
    </UiEntity>
  }
  Start() {
    this.reset()
    this.visibleUi = true
  }
  addSuccess(newSuccesses: number) {
    this.currentSuccesses = this.currentSuccesses + newSuccesses
    if (this.currentSuccesses === this.successNeeded) {
      this.visibleUi = false
      this.Win()
    }
  }
  Win() {
    this.visibleUi = false
    this.reset()
    this.onWinCallback()
}
  reset() {
    this.currentSuccesses = 0
    this.disable_button1 = false
    this.disable_button2 = false
    this.disable_button3 = false
    this.disable_button4 = false 
    this.disable_button5 = false
    this.disable_button6 = false
    this.disable_button7 = false
    this.disable_button8 = false
    this.disable_button9 = false
    this.disable_button10 = false
    this.disable_button11 = false
    this.disable_button12 = false
  }
}