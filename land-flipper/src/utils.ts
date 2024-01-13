export function getRandomHexColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function generateHexColor(seed: number): string {
  // Ensure the seed is a positive integer
  const positiveSeed = Math.abs(Math.floor(seed))

  // Generate a hex color using the seed
  const color = (positiveSeed * 2654435761).toString(16).slice(0, 6)

  // Ensure the hex color has exactly 6 characters
  const paddedColor = color.padStart(6, '0')
  console.log(paddedColor)
  return `#${paddedColor}`
}
