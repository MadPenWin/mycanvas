export function hexadecimalToHueSaturationValue(hexadecimal)
{
  function hexadecimalDigit(character)
  {
    if (character === '0') return 0
    if (character === '1') return 1
    if (character === '2') return 2
    if (character === '3') return 3
    if (character === '4') return 4
    if (character === '5') return 5
    if (character === '6') return 6
    if (character === '7') return 7
    if (character === '8') return 8
    if (character === '9') return 9

    if (character === 'a' || character === 'A') return 10
    if (character === 'b' || character === 'B') return 11
    if (character === 'c' || character === 'C') return 12
    if (character === 'd' || character === 'D') return 13
    if (character === 'e' || character === 'E') return 14
    if (character === 'f' || character === 'F') return 15

    return 0
  }

  let colorPointer = 1

  // Hex Digits: 0 1 2 3 4 5 6 7 8 9 A B C D E F (16 Values)
  // First Two Digits: 16 * 16 = 256 Combinations -> [0 - 255]
  const redHighValue = hexadecimalDigit(hexadecimal[colorPointer]); colorPointer++
  const redLowValue = hexadecimalDigit(hexadecimal[colorPointer]); colorPointer++
  const red = (redHighValue * 16 + redLowValue) / 255

  const greenHighValue = hexadecimalDigit(hexadecimal[colorPointer]); colorPointer++
  const greenLowValue = hexadecimalDigit(hexadecimal[colorPointer]); colorPointer++
  const green = (greenHighValue * 16 + greenLowValue) / 255

  const blueHighValue = hexadecimalDigit(hexadecimal[colorPointer]); colorPointer++
  const blueLowValue = hexadecimalDigit(hexadecimal[colorPointer]); colorPointer++
  const blue = (blueHighValue * 16 + blueLowValue) / 255

  let brightestColor = red > green ? (red > blue ? red : blue) : (green > blue ? green : blue)
  let darkestColor = red < green ? (red < blue ? red : blue) : (green < blue ? green: blue)
  let hue = 0

  const differentColorAmount = brightestColor - darkestColor
  if (differentColorAmount !== 0)
  {
    if (brightestColor === red) hue = (green - blue) / differentColorAmount % 6
    else if (brightestColor === green) hue = (blue - red) / differentColorAmount + 2
    else hue = (red - green) / differentColorAmount + 4
  }

  // Same Position On The Color Wheel
  // But Expressed AS A Positive Angle
  hue = hue * 60
  if (hue < 0) hue += 360

  const saturation = brightestColor === 0 ? 0 : differentColorAmount / brightestColor
  const value = brightestColor

  return { hue, saturation, value }
}