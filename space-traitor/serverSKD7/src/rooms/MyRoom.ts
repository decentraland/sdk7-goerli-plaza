import { Room, Client } from "colyseus";
import {
  FIXES_TO_WIN,
  GAME_DURATION,
  MINIMUM_PLAYERS,
  randomBreakProbability,
  sabotagePenalty,
  VOTING_TIME,
} from '../config'
import {
  MyRoomState,
  Player,
  JoinData,
  EquiptmentChange,
  FuseChange,
  Vote,
  FuseBox,
  Equiptment,
} from './MyRoomState'

const ROUND_DURATION = 60

export class MyRoom extends Room<MyRoomState> {
  private currentHeight: number = 0
  private isFinished: boolean = false

  onCreate(options: any) {
    this.setState(new MyRoomState())
    // this.setPatchRate(33)  > 30 fps   (default 20 fps)

    // set-up the game!
    this.reset()

    this.onMessage('join', (client: Client, atIndex: number) => {
      // set player new position
      const player = this.state.players.get(client.sessionId)
    })
    
    this.onMessage('ready', (client: Client, data: JoinData) => {
      if (this.state.active) {
        client.send('msg', { text: 'Wait for the current game to end' })
        return
      }

      const player = this.state.players.get(client.sessionId)

      if (player.ready) {
        
        client.send('msg', {
          text: "You're already in the game. Waiting for other players.",
        })
        return
      }

      player.ready = true
      player.alive = true

      if (data.thumb) {
        player.thumb = data.thumb
      }

      let playerCount: number = 0

      this.state.players.forEach((player) => {
        if (player.ready) playerCount += 1
      })

      console.log(
        player.name,
        'is ready! ',
        playerCount,
        ' players ready so far'
      )

      if (playerCount >= MINIMUM_PLAYERS) {
        this.clock.clear()
        console.log(
          'Starting new game on room ',
          this.roomId,
          ' with ',
          playerCount,
          ' players'
        )
        this.setUp()
      } else {
        let message =
          playerCount +
          ' players read. At least ' +
          MINIMUM_PLAYERS +
          ' required. Invite your fiends/nemesis!'
        this.broadcast(message)
      }
    })

    this.onMessage('shipChange', (client: Client, data: EquiptmentChange) => {
      const player = this.state.players.get(client.sessionId)

      if (!this.state.active) {
        return
      }

      if (player.isTraitor && !data.broken) return

      if (!player.isTraitor && data.broken) return

      let eqpt: Equiptment = null
      this.state.toFix.forEach((currenteqpt) => {
        if (currenteqpt.id == data.id) {
          eqpt = currenteqpt
        }
      })

      if (eqpt.broken == data.broken) {
        console.log(
          'equiptment ',
          data.id,
          ' was already in the state ',
          data.broken
        )
        return
      }

      console.log('equiptment ', data.id, ' new broken state ', data.broken)

      eqpt.broken = data.broken

      if (!data.broken) {
        this.state.fixCount += 1
        if (this.state.fixCount >= FIXES_TO_WIN) {
          setTimeout(() => {
            this.end()
          }, 2000)
        }
      }
    })

    this.onMessage('FuseBoxChange', (client: Client, data: FuseChange) => {
      if (!this.state.active) {
        return
      }
      console.log(
        'fusebox ',
        data.id,
        ' open ',
        data.doorOpen,
        'RGB',
        data.redCut,
        data.greenCut,
        data.blueCut
      )

      let box: FuseBox = null
      this.state.fuseBoxes.forEach((currentBox) => {
        if (currentBox.id == data.id) {
          box = currentBox
        }
      })

      if (!box) return

      if ('doorOpen' in data && data.doorOpen != box.doorOpen) {
        box.doorOpen = data.doorOpen
        return
      }

      if (box.broken) return

      const player = this.state.players.get(client.sessionId)

      if (player.isTraitor) {
        if (!box.redCut && data.redCut) {
          box.redCut = true
        }
        if (!box.blueCut && data.blueCut) {
          box.blueCut = true
        }
        if (!box.greenCut && data.greenCut) {
          box.greenCut = true
        }

        if (box.redCut && box.blueCut && box.greenCut) {
          this.state.countdown -= sabotagePenalty
          box.broken = true
        }
      } else {
        client.send('msg', {
          text: 'Only a traitor would sabotage their own ship like that.',
        })
      }
    })

    this.onMessage('startvote', (client: Client) => {
      if (!this.state.active || this.state.paused) {
        console.log('room inactive or already voting')
        return
      }
      console.log('STARTING VOTES ', VOTING_TIME, ' time left')

      let playersAlive: number = 0

      this.state.players.forEach((player) => {
        if (player.alive) playersAlive++
      })

      if (playersAlive <= 2) {
        this.broadcast('msg', {
          text: 'too few players left to vote',
        })
        return
      } else {
        this.state.votingCountdown = VOTING_TIME
        this.state.players.forEach((player) => {
          player.votes = []
        })
        this.state.paused = true
        this.broadcast('startvote', {
          timeLeft: VOTING_TIME,
          players: this.state.players,
        })
      }
    })

    this.onMessage('vote', (client: Client, data: Vote) => {
      if (!this.state.active || !this.state.paused) {
        console.log('room inactive or not paused')
        return
      }
      console.log(data.voter, ' VOTED FOR ', data.voted)

      let voter: Player = null
      let voted: Player = null

      this.state.players.forEach((player) => {
        if (player.name == data.voter) voter = player
        if (player.name == data.voted) voted = player
      })

      if (!voter || !voted) return
      if (!voter.alive || !voter.ready) return
      if (!voted.alive || !voted.ready) return

      voted.votes.push(data.voter)

      let voteCount = 0
      let playersAlive: number = 0
      this.state.players.forEach((player) => {
        if (player.alive) {
          playersAlive++
          voteCount += player.votes.length
        }
      })

      if (voteCount >= playersAlive) {
        setTimeout(() => {
          this.endVotes()
        }, 2000)
      } else {
        console.log('We have ', voteCount, ' votes, we need ', playersAlive)
      }
    })
  }

  endVotes() {
    // TODO
    this.state.paused = false

    let playersAlive: number = 0
    let mostVotesAgainst = 0
    let playerWithMostVotes: Player = null
    let weHaveATie: boolean = false
    let traitorKilled: boolean = false

    this.state.players.forEach((player) => {
      if (player.alive) playersAlive++
      let votesAgainst = player.votes.length
      if (votesAgainst > mostVotesAgainst) {
        playerWithMostVotes = player
        mostVotesAgainst = votesAgainst
        weHaveATie = false
        if (player.isTraitor) {
          traitorKilled = true
        } else {
          traitorKilled = false
        }
      } else if (votesAgainst == mostVotesAgainst) {
        weHaveATie = true
      }
    })

    if (weHaveATie) {
      console.log("it's a tie! ", mostVotesAgainst)
      this.broadcast('endvote', { voted: null, wasTraitor: false })
      return
    } else if (playerWithMostVotes && playerWithMostVotes.alive) {
      console.log(
        'We have a victim! ',
        playerWithMostVotes.name,
        ' is traitor? ',
        playerWithMostVotes.isTraitor
      )
      playerWithMostVotes.alive = false
    }

    playersAlive = 0
    this.state.players.forEach((player) => {
      if (player.alive) playersAlive++
    })

    setTimeout(() => {
      this.broadcast('endvote', {
        voted: playerWithMostVotes.name,
        wasTraitor: traitorKilled,
      })
      this.state.paused = false
      setTimeout(() => {
        if (playersAlive < 2 || traitorKilled) {
          this.end()
        }
      }, 3000)
    }, 3000)
  }

  pickTraitor() {
    let currentPlayers = 0
    this.state.players.forEach((player) => {
      if (player.ready) currentPlayers++
    })

    const rnd = Math.floor(Math.random() * currentPlayers)

    const traitor = this.clients[rnd]

    const traitorPlayer = this.state.players.get(traitor.id)

    traitorPlayer.isTraitor = true
    this.state.traitors = 1
    console.log(
      'Player ',
      rnd,
      ' , ',
      traitorPlayer.name,
      ' is the traitor, id: ',
      traitor.id
    )
  }

  setUp() {
    this.isFinished = false
    this.state.paused = false

    this.state.fuseBoxes.forEach((box) => {
      box.reset()
    })

    this.state.toFix.forEach((equipt) => {
      equipt.reset()
    })

    this.broadcast('msg', { text: 'Game starts in ...' })

    this.state.countdown = 3

    // make sure we clear previous interval
    this.clock.clear()

    this.clock.setTimeout(() => {
      this.broadcast('msg', { text: '3' })
    }, 2000)

    this.clock.setTimeout(() => {
      this.broadcast('msg', { text: '2' })
    }, 4000)

    this.clock.setTimeout(() => {
      this.broadcast('msg', { text: '1' })
    }, 6000)

    this.clock.setTimeout(() => {
      this.startGame()
    }, 8000)
  }

  startGame() {
    // pick traitor
    this.pickTraitor()

    // Maybe I can just add a listener in the scene
    this.state.players.forEach((player) => {
      let currentClient: Client
      this.clients.forEach((client) => {
        if (client.id == player.id) {
          currentClient = client
        }
      })
      if (player.isTraitor) {
        currentClient.send('msg', { text: 'You are the treasoning android!' })
      } else {
        currentClient.send('msg', {
          text: 'One of your mates is a treacherous android.',
        })
      }
    })

    // maybe I dont need this eiter, listener to active = true
    this.broadcast('new', { duration: ROUND_DURATION })

    this.state.active = true

    // setup round countdown
    this.state.countdown = GAME_DURATION
    this.state.votingCountdown = VOTING_TIME

    // make sure we clear previous interval
    this.clock.clear()

    this.isFinished = true

    this.clock.setInterval(() => {
      if (!this.isFinished) return
      // normal countdown
      if (!this.state.paused) {
        if (this.state.countdown > 0) {
          this.state.countdown--
          let randomBreak = Math.random()
          if (randomBreak < 1 / randomBreakProbability) {
            this.randomBreakEquipt()
          }
        } else {
          // countdown reached zero! end the game!
          this.end()
          this.clock.clear()
        }
      } else if (this.state.paused) {
        // voting countdown
        if (this.state.votingCountdown > 0) {
          this.state.votingCountdown--
        } else {
          this.endVotes()
        }
      }
    }, 1000)
  }

  end() {
    this.state.active = false
    this.state.paused = false
    this.isFinished = true

    let traitorAlive = true

    this.state.players.forEach((player) => {
      if (player.isTraitor && !player.alive) traitorAlive = false
    })

    let traitorWon =
      this.state.fixCount < FIXES_TO_WIN && traitorAlive ? true : false

    console.log(
      'FINISHED GAME in room ',
      this.roomName,
      ' time remaining: ',
      this.state.countdown,
      ' fix count: ',
      this.state.fixCount,
      ' traitor won: ',
      traitorWon
    )

    this.broadcast('end', {
      traitorWon: traitorWon,
      fixCount: this.state.fixCount,
      timeLeft: this.state.countdown,
    })

    // reset after 10 seconds

    this.clock.setTimeout(() => {
      this.reset()
      this.broadcast('reset')
    }, 10000)
  }

  reset() {
    //this.state.players.clear()

    this.state.active = false

    this.state.fuseBoxes.forEach((box) => {
      box.reset()
    })

    this.state.toFix.forEach((equipt) => {
      equipt.reset()
    })

    this.state.players.forEach((player) => {
      player.reset()
    })

    this.state.fixCount = 0
    this.state.traitors = 0
    this.state.countdown = GAME_DURATION
    this.state.votingCountdown = VOTING_TIME
  }

  randomBreakEquipt() {
    let attempts = 0
    let brokeSomething = false
    while (!brokeSomething) {
      let randomI = Math.floor(Math.random() * this.state.toFix.length)

      let eqpt: Equiptment
      this.state.toFix.forEach((element) => {
        if (element.id == randomI) eqpt = element
      })
      if (!eqpt.broken) {
        eqpt.broken = true
        brokeSomething = true
        console.log('Randomly breaking equiptment ', randomI)
      } else {
        attempts++
        if (attempts > 10) {
          console.log('Nothing broke this time')
          brokeSomething = true
        }
      }
    }
  }

  onJoin(client: Client, options: any) {
    const newPlayer = new Player(
      client.id,
      options.userData.data.displayName || 'Anonymous',
      options.thumb || null
    )
    this.state.players.set(client.sessionId, newPlayer)
  
    console.log(newPlayer.name, 'joined! => ', options.userData)
  }

  onLeave(client: Client, consented: boolean) {
    const player = this.state.players.get(client.sessionId)
    console.log(player.name, 'left!')

    this.state.players.delete(client.sessionId)

    let playersAlive: number = 0
    this.state.players.forEach((player) => {
      if (player.alive) playersAlive++
    })

    if (this.state.active && playersAlive <= 1) {
      this.end()
    }
  }

  onDispose() {
    console.log('Disposing room...')
  }
}