
declare type SceneMessage =
    SceneMessageEquiptmentChange |
    SceneMessageFuseChange |
    SceneMessageVote |
    SceneMessageJoin |
    SceneMessageStartVote |
    SceneMessageReadyData

declare type SceneMessageEquiptmentChange = {
    msg: 'equiptmentChange'
    id: number
    broken: boolean
}

declare type SceneMessageFuseChange = {
    msg: 'fuseChange'
    id: number
    doorOpen?: boolean
    redCut?: boolean
    greenCut?: boolean
    blueCut?: boolean
}

declare type SceneMessageVote = {
    msg: 'vote'
    voter: string
    voted: string
}

declare type SceneMessageJoin = {
    msg: 'join'
}

declare type SceneMessageStartVote = {
    msg: 'startvote'
}

declare type SceneMessageReadyData = {
    msg: 'ready'
    sender: string
}

declare type JoinOptions = {
    displayName: string
    userId: string
}


declare type ServerMessage = ServerMessageText | ServerMessageEndVote | ServerMessageStartVote | ServerMessageEnd | ServerMessageNew | ServerMessageReset

declare type ServerMessageText = {
    msg: 'text'
    text: string
}
declare type ServerMessageEndVote = {
    msg: 'endvote'
    voted: string | null
    wasTraitor: boolean
}
declare type ServerMessageStartVote = {
    msg: 'startvote'
    timeLeft: number
    players: unknown
}
declare type ServerMessageEnd = {
    msg: 'end'
    traitorWon: boolean,
    fixCount: number,
    timeLeft: number,
}
declare type ServerMessageNew = {
    msg: 'new'
    duration: number
}
declare type ServerMessageReset = {
    msg: 'reset'
}