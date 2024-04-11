export function timeStampConverter(timeStamp: number) {
  const currentDate = new Date().getTime()

  let timeCompleted = false
  const differenceInMilliseconds = currentDate - timeStamp

  if (differenceInMilliseconds >= 86400000) {
    timeCompleted = true
  }
  const timeLeft = 86400000 - differenceInMilliseconds
  const hours = Math.floor(timeLeft / 3600000)
  const minutes = Math.floor((timeLeft % 3600000) / 60000)
  const seconds = Math.floor(((timeLeft % 3600000) % 60000) / 1000)

  const formattedTime = `${hours}:${minutes}:${seconds}`
  return { formattedTime, timeCompleted }
}
