import ReactEcs, { Button, Input, Label, ReactEcsRenderer, UiEntity, scaleFontSize } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { gameController } from '../controllers/game.controller'
import { timeStampConverter } from '../functions/timestamp.function'
import { ClaimConfigInstType } from '../config/claim.config'
import { executeTask } from '@dcl/sdk/ecs'
import { getRealm } from '~system/Runtime'
import { GitHubLinkUi, descriptionUI } from '../ui'

export class UI {
  private gameController: gameController
  private timerId: number = 0
  private timerText: string = ''
  private timeLeft: number = 60
  private timerTextColor: Color4 = Color4.Red();
  private thumbnail: string = 'images/wearable_thumbnail.png'
  //Visibles
  private welcome_ui_visible: boolean = false
  private timer_label_visible: boolean = false
  private master_ui_visible: boolean = false
  private claim_label_visible: boolean = false
  private thumbnail_image_visible: boolean = false
  private corner_ui_visible: boolean = true
  private captcha_ui_visible: boolean = false
  private error_ui_visible: boolean = false
  private already_claimed_ui_visible: boolean = false
  private close_button_visible: boolean = false
  //Data
  private data_userID: string = ''
  private data_wearablesAmount: number = 0
  private data_wearableName: string = ''
  private data_timesVisited: number = 0
  private data_timeForNextWearable: string = ''
  private data_timeStamp: number = 0
  //Captcha
  private captcha_text: string = ''
  private captcha_image: string = ''
  private captcha_id: string = ''
  private campaign: ClaimConfigInstType
  private campaign_key: string = ''
  //Error
  private error: string = ''
  constructor(gameController: gameController) {
    this.gameController = gameController
    this.campaign = this.gameController.camp
    this.updatePlayerData()
    this.gameController.user()
    this.timerId = utils.timers.setInterval(this.checkTimeStamp.bind(this), 1000);
    this.updateUI('welcome')
    //* UI - SET UP *
    const uiComponent = () => (
      [
        this.mainUi(),
        this.cornerUi(),
        GitHubLinkUi(),
        descriptionUI()
      ]
    )
    ReactEcsRenderer.setUiRenderer(uiComponent)

  }
  mainUi() {
    return <UiEntity
      uiTransform={{
        width: '50%',
        height: '30%',
        margin: { top: '10%', left: '25%', right: '25%' },
        position: { top: '40%' },
        padding: { top: 4, bottom: 4, left: 4, right: 4 },
        display: this.master_ui_visible ? 'flex' : 'none',
      }}
      uiBackground={{ color: Color4.create(0.5, 0.5, 0.5, 0.6) }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: '100%',
          positionType: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { top: 4, bottom: 4, left: 4, right: 4 },
          display: this.master_ui_visible ? 'flex' : 'none',
          flexDirection: 'column',
        }}
        uiBackground={{
          textureMode: 'stretch',
        }}
      >
        {/* Welcome - Label - Title */}
        <Label
          uiTransform={{
            width: 13,
            height: '10%',
            padding: { top: '3%', bottom: '3%', left: '20%', right: '20%' },
            margin: { top: '35%', bottom: '0%', left: '50%', right: '50%' },
            positionType: 'relative',

            // display: this.welcome_ui_visible ? 'flex' : 'none',
          }}
          value={`Welcome to a Simple Recurrent Giveaway Scene!`}
          fontSize={scaleFontSize(18, 0.8)}
          font='sans-serif'
          color={Color4.fromHexString("#000000")}
        />
        {/* Welcome - Label - Subtitle */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            padding: { top: '3%', bottom: '3%', left: '20%', right: '20%' },
            margin: { top: '0%', bottom: '0%', left: '50%', right: '50%' },
            positionType: 'relative',

            display: this.welcome_ui_visible ? 'flex' : 'none',
          }}
          value={`*Stay 1' to Recieve a Free Wearable \n *You can Claim 1 per/day (Max 3)`}
          fontSize={scaleFontSize(15, 0.8)}
          font='sans-serif'
          color={Color4.Gray()}
        />
        {/* Timer - Label */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            padding: { top: '3%', bottom: '3%', left: '20%', right: '20%' },
            margin: { top: '0%', bottom: '0%', left: '50%', right: '50%' },
            positionType: 'relative',

            display: this.timer_label_visible ? 'flex' : 'none',
          }}
          value={`Time left: ${this.timerText}`}
          color={this.timerTextColor}
          fontSize={scaleFontSize(15, 0.8)}
        />
        {/* Testnet - Label - Subtitle */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            padding: { top: '5%', bottom: '0%', left: '20%', right: '20%' },
            margin: { top: '0%', bottom: '35%', left: '50%', right: '50%' },
            positionType: 'relative',

            display: this.welcome_ui_visible ? 'flex' : 'none',
          }}
          value={`*Wearables reside in the Amoy Polygon testnet`}
          fontSize={scaleFontSize(15, 0.8)}
          font='sans-serif'
          color={Color4.Gray()}
        />

        {/* Wearable - Label - Title */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            margin: { top: '0%', bottom: '0%', left: '0%', right: '0%' },
            positionType: 'absolute',
            position: { bottom: '0%', top: '13%', left: '40%' },
            display: this.claim_label_visible ? 'flex' : 'none',
          }}
          value={`${this.data_wearableName}\nWearable incoming! `}
          fontSize={18}
          color={Color4.Black()}
          font='sans-serif'
          textAlign='middle-left'
        />
        {/* Wearable - Label - Data */}
        <Label
          uiTransform={{
            width: 'auto',
            height: 'auto',
            margin: { top: '15%', bottom: '0%', left: '0%', right: '0%' },
            positionType: 'absolute',
            position: { bottom: '30%', top: '10%', left: '40%' },
            display: this.claim_label_visible ? 'flex' : 'none',
          }}
          value={`User ID: ${this.data_userID} \nWearables Collected: ${this.data_wearablesAmount}/3 \nTime for Next Wearable: ${this.data_timeForNextWearable} \nTimes Visited: ${this.data_timesVisited} `}
          fontSize={scaleFontSize(15, 0.8)}
          color={Color4.Gray()}
          textAlign='middle-left'
        />
        {/* Wearable - Label - Info */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            margin: { top: '25%', bottom: '0%', left: '0%', right: '0%' },
            positionType: 'absolute',
            position: { bottom: '0%', top: '20%', left: '50%' },
            display: this.claim_label_visible ? 'flex' : 'none',
          }}
          value={`*Wearable will arrive in your backpack in a few minutes. `}
          fontSize={scaleFontSize(15, 0.8)}
          color={Color4.Gray()}
          textAlign='middle-center'
        />
        {/* Close - Button */}
        <Button
          value="Close"
          variant="primary"
          uiTransform={{
            width: 130, height: 39, positionType: 'relative',
            position: { bottom: '0%', top: '30%', left: '0%', right: '0%' },
            display: this.close_button_visible ? 'flex' : 'none',
          }}
          onMouseDown={() => {
            this.closeUI()
          }}
          fontSize={14}
          uiBackground={{ color: Color4.Gray() }}
        />
        {/* Thumbnail Airdrop - Image */}
        <UiEntity
          uiTransform={{
            width: 130, height: 130,
            positionType: 'absolute',
            position: { bottom: '0%', top: '10%', left: '0%', right: '50%' },
            margin: { top: '0%', bottom: '0%', left: '10%', right: '50%' },
            display: this.thumbnail_image_visible ? 'flex' : 'none',
          }}
          uiBackground={{
            textureMode: 'center',
            texture: {
              src: this.thumbnail,
            },
          }}
        />
        {/* Captcha - Title */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            margin: { top: '6%', bottom: '0%', left: '50%', right: '50%' },
            positionType: 'absolute',
            position: { bottom: '0%', top: '0%', left: '0%' },
            display: this.captcha_ui_visible ? 'flex' : 'none',
          }}
          value={`Please Solve this Captcha`}
          fontSize={18}
          font='sans-serif'
          color={Color4.fromHexString("#000000")}
        />
        {/* Captcha - Image */}
        <UiEntity
          uiTransform={{
            width: 550, height: 125,
            positionType: 'absolute',
            position: { bottom: '0%', top: '22%', left: '0%', right: '0%' },
            margin: { top: '0%', bottom: '0%', left: '0%', right: '0%' },
            display: this.captcha_ui_visible ? 'flex' : 'none',
          }}
          uiBackground={{
            textureMode: 'center',
            texture: {
              src: this.captcha_image,
            },
          }}
        />
        {/* Captcha - Input */}
        <Input
          onChange={(value) => {
            this.captcha_text = value
          }}
          fontSize={12}
          placeholder={'            Type this captcha'}
          placeholderColor={Color4.Gray()}
          uiTransform={{
            width: 200,
            height: 35,
            display: this.captcha_ui_visible ? 'flex' : 'none',
            positionType: 'absolute',
            position: { bottom: '0%', top: '67%', left: '30%', right: '0%' },
            margin: { top: '0%', bottom: '0%', left: '0%', right: '50%' },

          }}
        ></Input>
        {/* Enter Captcha - Button */}
        <Button
          value="OK"
          variant="primary"
          uiTransform={{
            width: 110, height: 30, positionType: 'relative',
            position: { bottom: '0%', top: '40%', left: '0%' },
            margin: { top: '0%', bottom: '0%', left: '0%', right: '0%' },
            display: this.captcha_ui_visible ? 'flex' : 'none',
          }}
          fontSize={15}
          onMouseDown={() => {
            this.closeUI()
            this.gameController.claim.validateCaptcha(this.captcha_text, this.captcha_id, this.campaign, this.campaign_key)
          }}
        />
        {/* Error - Label */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            margin: { top: '20%', bottom: '0%', left: '50%', right: '50%' },
            positionType: 'absolute',
            position: { bottom: '0%', top: '0%', left: '0%' },
            display: this.error_ui_visible ? 'flex' : 'none',
          }}
          value={this.error}
          fontSize={18}
          color={Color4.Red()}
          font='sans-serif'
          textAlign='middle-center'
        />
        {/* Already Claimed - Label */}
        <Label
          uiTransform={{
            width: 13,
            height: 13,
            margin: { top: '20%', bottom: '0%', left: '50%', right: '50%' },
            positionType: 'absolute',
            position: { bottom: '0%', top: '0%', left: '0%' },
            display: this.already_claimed_ui_visible ? 'flex' : 'none',
          }}
          value={'You already claimed this wearable!'}
          fontSize={18}
          color={Color4.Red()}
          font='sans-serif'
          textAlign='middle-center'
        />
      </UiEntity>
    </UiEntity>
  }
  cornerUi() {
    {/* Corner - UI */ }
    return <UiEntity
      uiTransform={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        positionType: 'absolute',
        position: { right: "2%", bottom: '35%' },
        display: this.corner_ui_visible ? 'flex' : 'none',
      }}
    >
      <UiEntity
        uiTransform={{
          width: '100',
          height: '100',
          display: this.corner_ui_visible ? 'flex' : 'none',
        }}
        uiBackground={{ color: Color4.create(0, 0, 0, 0) }}
      />
      <Label
        value={`\nWearables Collected: ${this.data_wearablesAmount}/3 \nTime for Next Wearable: ${this.data_timeForNextWearable}`}
        color={Color4.Black()}
        fontSize={scaleFontSize(15, 0.8)}
        textAlign="middle-right"
        uiTransform={{ position: { right: '30%', bottom: '20%' }, display: this.corner_ui_visible ? 'flex' : 'none', }}
      />
    </UiEntity>
  }
  captchaUI(image: string, id: string, campaign: ClaimConfigInstType, campaign_key: string) {
    this.captcha_image = image
    this.captcha_id = id
    this.campaign = campaign
    this.campaign_key = campaign_key
    this.updateUI('captcha')
  }
  alreadyClaimedUI() {
    this.closeUI()
    this.updateUI('already_claimed')
  }
  errorUI(errorString: string) {
    this.error = errorString
    this.closeUI()
    this.updateUI('error')
  }
  confirmationUI(thumbnail: string, wearableName: string,) {
    executeTask(async () => {
      const { realmInfo } = await getRealm({})
      if (realmInfo?.isPreview === false) {
        this.thumbnail = thumbnail
      }
    })
    this.data_wearableName = wearableName
    this.updateUI('wearable')
  }
  breakLines(text: string, linelength: number) {
    const lineBreak = '\n'
    var counter = 0
    var line = ''
    var returnText = ''
    var bMatchFound = false
    const lineLen = linelength ? linelength : 50


    if (!text) return ''
    if (text.length < lineLen + 1) { return text }

    while (counter < text.length) {
      line = text.substring(counter, counter + lineLen);
      bMatchFound = false
      if (line.length == lineLen) {
        for (var i = line.length; i > -1; i--) {
          if (line[i] == ' ' || line[i] == '-' || line[i] == '_' || line[i] == '.' || line[i] == '/') {
            counter += line.substring(0, i).length
            line = line.substring(0, i) + lineBreak
            returnText += line
            bMatchFound = true
            break
          }
        }

        if (!bMatchFound) {
          counter += line.length
          line = line + lineBreak
          returnText += line
        }
      }
      else {
        returnText += line
        break // We're breaking out of the the while(), not the for()
      }
    }

    return returnText
  }
  updateUI(id: string) {
    switch (id) {
      case 'welcome':
        this.master_ui_visible = true
        this.welcome_ui_visible = true
        this.timer_label_visible = true
        this.thumbnail_image_visible = false
        this.close_button_visible = false
        break
      case 'wearable':
        this.master_ui_visible = true
        this.welcome_ui_visible = false
        this.timer_label_visible = false
        this.claim_label_visible = true
        this.thumbnail_image_visible = true
        this.close_button_visible = true
        break
      case 'captcha':
        this.master_ui_visible = true
        this.welcome_ui_visible = false
        this.timer_label_visible = false
        this.claim_label_visible = false
        this.thumbnail_image_visible = false
        this.error_ui_visible = false
        this.captcha_ui_visible = true
        this.close_button_visible = false
        break
      case 'error':
        this.master_ui_visible = true
        this.welcome_ui_visible = false
        this.timer_label_visible = false
        this.claim_label_visible = false
        this.thumbnail_image_visible = false
        this.captcha_ui_visible = false
        this.error_ui_visible = true
        this.close_button_visible = true
        break
      case 'already_claimed':
        this.master_ui_visible = true
        this.welcome_ui_visible = false
        this.timer_label_visible = false
        this.claim_label_visible = false
        this.thumbnail_image_visible = false
        this.captcha_ui_visible = false
        this.error_ui_visible = false
        this.already_claimed_ui_visible = true
        this.close_button_visible = true
        break
    }
  }
  startTimer() {
    this.timerId = utils.timers.setInterval(this.updateTime.bind(this), 1000);
  }
  updateTime() {
    this.timeLeft--;
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.timerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (this.timeLeft <= 0) {
      this.stopTimer();
      this.closeUI()
      if (this.data_timeForNextWearable === 'Available') {
        if (this.data_wearablesAmount == 0) {
          this.gameController.airdrop_1.randomCrateSpawn()
        } if (this.data_wearablesAmount == 1) {
          this.gameController.airdrop_2.randomCrateSpawn()
        } if (this.data_wearablesAmount == 2) {
          this.gameController.airdrop_3.randomCrateSpawn()
        }
      } else {
        this.errorUI(this.gameController.ui.breakLines('Less than 24 hours have passed since the last time the wearable was delivered', 20))
      }
    }
  }
  stopTimer() {
    this.timeLeft = 60;
    utils.timers.clearInterval(this.timerId);
  }
  closeUI() {
    this.welcome_ui_visible = false
    this.timer_label_visible = false
    this.master_ui_visible = false
    this.claim_label_visible = false
    this.thumbnail_image_visible = false
    this.corner_ui_visible = true
    this.captcha_ui_visible = false
    this.error_ui_visible = false
    this.already_claimed_ui_visible = false
    this.close_button_visible = false
  }
  checkTimeStamp() {
    timeStampConverter(this.data_timeStamp)
    const result = timeStampConverter(this.data_timeStamp)
    if (result.timeCompleted == true || this.data_wearablesAmount == 0) {
      this.data_timeForNextWearable = 'Available'
    } else {
      this.data_timeForNextWearable = result.formattedTime
    }

  }
  async updatePlayerData() {
    const data = await this.gameController.fetchPlayerData()
    this.data_userID = data.id.length > 23 ? data.id.substring(0, 23) + '..' : data.id;
    this.data_wearablesAmount = data.wearable
    this.data_timesVisited = data.visits
    this.data_timeStamp = data.timeStamp
  }
}
