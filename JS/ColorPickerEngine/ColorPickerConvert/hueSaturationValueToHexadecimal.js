export function hueSaturationValueToHexadecimal(hue, saturation, value)
{
  function floorNumber(number)
  {
    let fractional = number

    while (fractional >= 1) fractional -= 1
    while (fractional < 0) fractional += 1

    if (fractional === 0) return number
    if (number >= 0) return number - fractional

    return number - (1 - fractional)
  }

  function roundNumber(number)
  {
    let fractional = number

    while (fractional >= 1) fractional -= 1
    while (fractional < 0) fractional += 1

    return number - (fractional + (fractional >= 0.5 ? 1 : 0))
  }

  function divideBy16(colorType)
  {
    let quotient = 0

    while (colorType >= 16)
    {
      colorType -= 16
      quotient++
    }

    return quotient
  }

  function moduloBy16(colorType)
  {
    while (colorType >= 16) colorType -= 16
    return colorType
  }

  const hexadecimalDigits = '0123456789ABCDEF'
  function toHexadecimalByte(color)
  {
    const highColorValue = divideBy16(color)
    const lowColorValue = moduloBy16(color)

    return hexadecimalDigits[highColorValue] + hexadecimalDigits[lowColorValue]
  }

  while (hue < 0) hue += 360
  while (hue >= 360) hue -= 360

  const hueSegment = hue / 60
  const segmentIndex = floorNumber(hueSegment)
  const fractional = hueSegment - segmentIndex

  const lowBrightness = value * (1 - saturation)
  const descendingBrightness = value * (1 - saturation * fractional)
  const ascendingBrightness = value * (1 - saturation * (1 - fractional))

  let red = 0
  let green = 0
  let blue = 0

  if (segmentIndex === 0)
  {
    red = value
    green = ascendingBrightness
    blue = lowBrightness
  }

  else if (segmentIndex === 1)
  {
    red = descendingBrightness
    green = value 
    blue = lowBrightness
  }

  else if (segmentIndex === 2)
  {
    red = lowBrightness
    green = value 
    blue = ascendingBrightness
  }

  else if (segmentIndex === 3)
  {
    red = lowBrightness
    green = descendingBrightness
    blue = value
  }

  else if (segmentIndex === 4)
  {
    red = ascendingBrightness
    green = lowBrightness
    blue = value
  }

  else 
  {
    red = value
    green = lowBrightness
    blue = descendingBrightness
  }

  const redInByte = roundNumber(red * 255)
  const greenInByte = roundNumber(green * 255)
  const blueInByte = roundNumber(blue * 255)

  return '#' + toHexadecimalByte(redInByte) + toHexadecimalByte(greenInByte) + toHexadecimalByte(blueInByte)
}