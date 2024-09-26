import { AvatarShape, Transform, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'

export function testAvatarShape(position: Vector3) {
  const post = createPost(position, { windowSize: { x: 1.5, y: 1.5 }, fontSize: 1 }).move(Vector3.create(2, 0, 0))
  const avatarTimer = circularSlider(1.0)
  engine.addSystem(avatarTimer.system)
  post.onNext(avatarTimer.forceNext)
  post.onPrevious(avatarTimer.forcePrevious)
  post.onPauseResume(avatarTimer.togglePause)

  const avatarEntity = engine.addEntity()
  Transform.create(avatarEntity, { 
    position: Vector3.create(position.x, position.y - 1, position.z),
  })


  avatarTimer.add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.Identity()
    AvatarShape.createOrReplace(avatarEntity)
    post.displayText('Avatar Default')
    post.displayImage('src/test/mesh/cylinder.png')

  }).add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.fromAngleAxis(90, Vector3.Up())
    post.displayText('Avatar Default - 90deg')
    post.displayImage('src/test/mesh/cylinder.png')
  }).add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.fromAngleAxis(180, Vector3.Up())
    post.displayText('Avatar Default - 180deg')
    post.displayImage('src/test/mesh/cylinder.png')
  }).add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.Identity()
    AvatarShape.createOrReplace(avatarEntity,{
      id: "none",
      bodyShape: "urn:decentraland:off-chain:base-avatars:BaseMale",
      wearables:[
        "urn:decentraland:off-chain:base-avatars:Mustache_Short_Beard",
        "urn:decentraland:off-chain:base-avatars:f_eyes_07",
        "urn:decentraland:off-chain:base-avatars:mouth_06",
        "urn:decentraland:off-chain:base-avatars:eyebrows_00",
        "urn:decentraland:matic:collections-v2:0x300c8583c5f18fd3f2bcc251ce913394a8c5d8f9:0",
        "urn:decentraland:matic:collections-v2:0xbaa24df74ebd721da500863fd7f8b4d9fcd8c574:0",
        "urn:decentraland:matic:collections-v2:0x956b8d57066fc3d2562de22efd63624a1ba56e35:17",
        "urn:decentraland:matic:collections-v2:0xf9dc839e0629f04f0bb0d6c027bb7f271117dc46:0",
        "urn:decentraland:matic:collections-v2:0x41051151cc9e2052d27a98b19977c4a2c1dae648:1",
        "urn:decentraland:matic:collections-v2:0x3743bd99ece00f68fe0c141540311c35e9459593:0",
        "urn:decentraland:matic:collections-v2:0xcbe0668a29387e41ddcef4146f0248c744cc09c8:0",
        "urn:decentraland:matic:collections-v2:0xf0ec60f4a7df52cd3e4565aec77bcb6feb7301f7:0"
      ],
      emotes: []
    })
    post.displayText('Avatar A')
    post.displayImage('src/test/mesh/cylinder.png')
  }).add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.fromAngleAxis(90, Vector3.Up())
    post.displayText('Avatar A - 90deg')
    post.displayImage('src/test/mesh/cylinder.png')
  }).add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.fromAngleAxis(180, Vector3.Up())
    post.displayText('Avatar A - 180deg')
    post.displayImage('src/test/mesh/cylinder.png')
  }).add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.Identity()
    AvatarShape.createOrReplace(avatarEntity,{
      id: "none",
      bodyShape: "urn:decentraland:off-chain:base-avatars:BaseFemale",
      wearables:[
          "urn:decentraland:off-chain:base-avatars:f_mouth_05",
          "urn:decentraland:off-chain:base-avatars:f_eyes_04",
          "urn:decentraland:off-chain:base-avatars:eyebrows_17",
          "urn:decentraland:matic:collections-v2:0x2f1932c54374631b5fbaea8d4c5fef9cd8e82e3f:0",
          "urn:decentraland:matic:collections-v2:0x574a56013d8bb09795f3d2b32e2b7b9d9949d22b:0",
          "urn:decentraland:matic:collections-v2:0x595445e9cbfbc8728b465eb35229d307239a72a7:0",
          "urn:decentraland:matic:collections-v2:0x863e4c6825c95631aed5c61fc3e7f253ff529da9:0",
          "urn:decentraland:matic:collections-v2:0xb5ecd528dfc9d6c0c3fdbe63ae5d2a088a63bfc3:0",
          "urn:decentraland:matic:collections-v2:0xc11b3f56f77ec99b7a0cf62b6e82efc0e735cebd:0"
      ],
      emotes: []
    })
    post.displayText('Avatar B')
    post.displayImage('src/test/mesh/cylinder.png')

  }).add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.fromAngleAxis(90, Vector3.Up())
    post.displayText('Avatar A - 90deg')
    post.displayImage('src/test/mesh/cylinder.png')
  }).add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.fromAngleAxis(180, Vector3.Up())
    post.displayText('Avatar A - 180deg')
    post.displayImage('src/test/mesh/cylinder.png')
  }).add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.Identity()
    AvatarShape.createOrReplace(avatarEntity,{
      id: "none",
      bodyShape: "urn:decentraland:off-chain:base-avatars:BaseFemale",
      wearables:[
        "urn:decentraland:off-chain:base-avatars:eyebrows_00",
        "urn:decentraland:matic:collections-v2:0x189e481389dec43d33c735712b5f1fa4b2c9dd63:0",
        "urn:decentraland:matic:collections-v2:0x29554fa157672de7236021b1eefbc5f991fb17e7:0",
        "urn:decentraland:matic:collections-v2:0x563e2081b3cd716ed76fc0993b7e49939cb342a5:0",
        "urn:decentraland:matic:collections-v2:0x9e73ece3e842e71b9ee82a55874e9910b6c377ab:0",
        "urn:decentraland:matic:collections-v2:0xac3b666704ec025b2e59f22249830a07b6fb9573:0",
        "urn:decentraland:matic:collections-v2:0xb006528835dd1db5361ffc86c1b11ac0adb69251:0",
        "urn:decentraland:matic:collections-v2:0xca7c347ffdeee480092f3b1268550b60ea031077:6",
        "urn:decentraland:matic:collections-v2:0xeea3d5ca1522c567fcf1e1928ed755684dbe8c09:0",
        "urn:decentraland:matic:collections-v2:0xfc5bb739f7dd92ac9c5389fda24af3a25e440a21:0"
      ],
      emotes: []
    })
    post.displayText('Avatar C')
    post.displayImage('src/test/mesh/cylinder.png')
  
  }).add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.fromAngleAxis(90, Vector3.Up())
    post.displayText('Avatar A - 90deg')
    post.displayImage('src/test/mesh/cylinder.png')
  }).add((index) => {
    Transform.getMutable(avatarEntity).rotation = Quaternion.fromAngleAxis(180, Vector3.Up())
    post.displayText('Avatar A - 180deg')
    post.displayImage('src/test/mesh/cylinder.png')
  })




}

/**
 * 
 * [
    {
        "timestamp": 1691087883215,
        "avatars": [
            {
                "hasClaimedName": true,
                "description": "",
                "tutorialStep": 256,
                "avatar": {
                    "bodyShape": "urn:decentraland:off-chain:base-avatars:BaseMale",
                    "wearables": [
                        "urn:decentraland:off-chain:base-avatars:Mustache_Short_Beard",
                        "urn:decentraland:off-chain:base-avatars:f_eyes_07",
                        "urn:decentraland:off-chain:base-avatars:mouth_06",
                        "urn:decentraland:off-chain:base-avatars:eyebrows_00",
                        "urn:decentraland:matic:collections-v2:0x300c8583c5f18fd3f2bcc251ce913394a8c5d8f9:0",
                        "urn:decentraland:matic:collections-v2:0xbaa24df74ebd721da500863fd7f8b4d9fcd8c574:0",
                        "urn:decentraland:matic:collections-v2:0x956b8d57066fc3d2562de22efd63624a1ba56e35:17",
                        "urn:decentraland:matic:collections-v2:0xf9dc839e0629f04f0bb0d6c027bb7f271117dc46:0",
                        "urn:decentraland:matic:collections-v2:0x41051151cc9e2052d27a98b19977c4a2c1dae648:1",
                        "urn:decentraland:matic:collections-v2:0x3743bd99ece00f68fe0c141540311c35e9459593:0",
                        "urn:decentraland:matic:collections-v2:0xcbe0668a29387e41ddcef4146f0248c744cc09c8:0",
                        "urn:decentraland:matic:collections-v2:0xf0ec60f4a7df52cd3e4565aec77bcb6feb7301f7:0"
                    ],
                    "forceRender": [],
                    "emotes": [
                        {
                            "slot": 0,
                            "urn": "handsair"
                        },
                        {
                            "slot": 1,
                            "urn": "tik"
                        },
                        {
                            "slot": 2,
                            "urn": "urn:decentraland:matic:collections-v2:0x875146d1d26e91c80f25f5966a84b098d3db1fc8:1"
                        },
                        {
                            "slot": 3,
                            "urn": "urn:decentraland:matic:collections-v2:0xf9d6b233594b56fde782a247b4647a4a689f50fe:0"
                        },
                        {
                            "slot": 4,
                            "urn": "urn:decentraland:matic:collections-v2:0x31f25715ca73d8b78c6b21333768bf1ba52a05b7:0"
                        },
                        {
                            "slot": 5,
                            "urn": "hammer"
                        },
                        {
                            "slot": 6,
                            "urn": "money"
                        },
                        {
                            "slot": 7,
                            "urn": "kiss"
                        },
                        {
                            "slot": 8,
                            "urn": "urn:decentraland:matic:collections-v2:0x6999b7c0c806fb739fdef25332a53ffa2a03e797:0"
                        },
                        {
                            "slot": 9,
                            "urn": "shrug"
                        }
                    ],
                    "snapshots": {
                        "body": "https://peer-ec1.decentraland.org/content/contents/bafkreif2oaqybby5hy6imypfuh42aggk245mrj3v45xxwyp4vsdkvga7km",
                        "face256": "https://peer-ec1.decentraland.org/content/contents/bafkreif3kkwo7hubrgdizrokgtiijcq6cf7plr44skqv7ho64gi3onvaqe"
                    },
                    "eyes": {
                        "color": {
                            "r": 0.3176470100879669,
                            "g": 0.615686297416687,
                            "b": 0.9686275124549866,
                            "a": 1
                        }
                    },
                    "hair": {
                        "color": {
                            "r": 0.32549020648002625,
                            "g": 0.2352941334247589,
                            "b": 0.1764705926179886,
                            "a": 1
                        }
                    },
                    "skin": {
                        "color": {
                            "r": 0.800000011920929,
                            "g": 0.6078431606292725,
                            "b": 0.46666666865348816,
                            "a": 1
                        }
                    }
                },
                "name": "GeneSimmons",
                "version": 1789,
                "userId": "0x31d0dfd048875e6bfc9db0a812a4dd5b2eaf0638",
                "ethAddress": "0x31d0dfd048875e6bfc9db0a812a4dd5b2eaf0638",
                "hasConnectedWeb3": true
            }
        ]
    },
    {
        "timestamp": 1691088317051,
        "avatars": [
            {
                "hasClaimedName": true,
                "description": "Just your regular time traveler. [Twitter](https://twitter.com/xkronosx_eth)",
                "tutorialStep": 4095,
                "name": "xKronosx",
                "userId": "0x697c6a6aea3671b1a6e10aea736f18fa3079cb97",
                "email": "",
                "ethAddress": "0x697c6a6aea3671b1a6e10aea736f18fa3079cb97",
                "version": 8342,
                "avatar": {
                    "bodyShape": "urn:decentraland:off-chain:base-avatars:BaseFemale",
                    "wearables": [
                        "urn:decentraland:off-chain:base-avatars:f_mouth_05",
                        "urn:decentraland:off-chain:base-avatars:f_eyes_04",
                        "urn:decentraland:off-chain:base-avatars:eyebrows_17",
                        "urn:decentraland:matic:collections-v2:0x2f1932c54374631b5fbaea8d4c5fef9cd8e82e3f:0",
                        "urn:decentraland:matic:collections-v2:0x574a56013d8bb09795f3d2b32e2b7b9d9949d22b:0",
                        "urn:decentraland:matic:collections-v2:0x595445e9cbfbc8728b465eb35229d307239a72a7:0",
                        "urn:decentraland:matic:collections-v2:0x863e4c6825c95631aed5c61fc3e7f253ff529da9:0",
                        "urn:decentraland:matic:collections-v2:0xb5ecd528dfc9d6c0c3fdbe63ae5d2a088a63bfc3:0",
                        "urn:decentraland:matic:collections-v2:0xc11b3f56f77ec99b7a0cf62b6e82efc0e735cebd:0"
                    ],
                    "forceRender": [],
                    "emotes": [
                        {
                            "slot": 0,
                            "urn": "clap"
                        },
                        {
                            "slot": 1,
                            "urn": "robot"
                        },
                        {
                            "slot": 2,
                            "urn": "disco"
                        },
                        {
                            "slot": 3,
                            "urn": "urn:decentraland:matic:collections-v2:0xcf14b60111f5bd0bb1160f2028786c80880a012e:0"
                        },
                        {
                            "slot": 4,
                            "urn": "kiss"
                        },
                        {
                            "slot": 5,
                            "urn": "urn:decentraland:matic:collections-v2:0xbada8a315e84e4d78e3b6914003647226d9b4001:10"
                        },
                        {
                            "slot": 6,
                            "urn": "urn:decentraland:matic:collections-v2:0xee3d536845a4750906b3dbc66629f6aed3023f27:3"
                        },
                        {
                            "slot": 7,
                            "urn": "urn:decentraland:matic:collections-v2:0xf9d6b233594b56fde782a247b4647a4a689f50fe:0"
                        },
                        {
                            "slot": 8,
                            "urn": "urn:decentraland:matic:collections-v2:0xc3c1758fa178405ce195f3a03392c4b283736f2e:1"
                        },
                        {
                            "slot": 9,
                            "urn": "urn:decentraland:matic:collections-v2:0x781dc89de1e5a38d21423e6b5dc0893435d206e9:1"
                        }
                    ],
                    "snapshots": {
                        "body": "https://peer-ec1.decentraland.org/content/contents/bafkreict3bf67jihm2q5gvz425ruhxmmv7viu6j7ynbugc7u6w2vsycgtq",
                        "face256": "https://peer-ec1.decentraland.org/content/contents/bafkreiczbzxrnkyx5gvpo5pcl6rg7tdklrddtiqemugct2zrq72n27yqwm"
                    },
                    "eyes": {
                        "color": {
                            "r": 0.8392157554626465,
                            "g": 0.8313271403312683,
                            "b": 0.8308236002922058,
                            "a": 1
                        }
                    },
                    "hair": {
                        "color": {
                            "r": 0.6465336084365845,
                            "g": 0.11198579519987106,
                            "b": 0.32766568660736084,
                            "a": 1
                        }
                    },
                    "skin": {
                        "color": {
                            "r": 0.9900000095367432,
                            "g": 0.8580000400543213,
                            "b": 0.7298823595046997,
                            "a": 1
                        }
                    }
                },
                "blocked": [
                    "0xf7deeebe598c037033b4bfc86fa31f3a668be349"
                ],
                "muted": [],
                "interests": [],
                "unclaimedName": "Kronos",
                "hasConnectedWeb3": true
            }
        ]
    }
]
 */