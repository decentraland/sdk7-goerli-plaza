type FunctionItem = {
  nextTick: number
  cb: () => void
  toRemove: boolean
}

let now: number = 0.0
let funcList: FunctionItem[] = []

export function timeOutUpdate(dt: number) {
  let isThereAnyCall = false
  const toCall: (() => void)[] = []
  now += dt * 1000.0
  for (const func of funcList) {
    if (now >= func.nextTick) {
      toCall.push(func.cb)
      func.toRemove = true
      isThereAnyCall = true
    }
  }

  if (isThereAnyCall) {
    funcList = funcList.filter((item) => !item.toRemove)
    for (const f of toCall) {
      f()
    }
  }
}

export default function (cb: () => void, time: number) {
  funcList.push({
    cb,
    nextTick: now + time,
    toRemove: false
  })
}
