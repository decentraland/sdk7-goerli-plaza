export function timeStringFromMs(millisec: number): string {
  const minutes = Math.floor(millisec / 60000)
  const remainingSeconds = millisec % 60000
  const seconds = Math.floor(remainingSeconds / 1000)
  const remainingMilliseconds = remainingSeconds % 1000
  const milliseconds = Math.floor(remainingMilliseconds / 10)

  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(Math.floor(seconds)).padStart(2, '0')
  const formattedMilliseconds = String(Math.floor(milliseconds)).padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`
}
