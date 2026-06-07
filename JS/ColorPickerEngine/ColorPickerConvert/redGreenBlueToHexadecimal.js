export function convertRGBToHexadecimal(redGreenBlue)
{
  const hexadecimalDigits = '0123456789ABCDEF'

  let red = 0
  let green = 0
  let blue = 0

  let counterIndex = 0
  let currentColorString = ''

  for (let colorIndex = 0; colorIndex < redGreenBlue.length; colorIndex++)
  {
    const colorStringIndex = redGreenBlue[colorIndex]
    if (colorStringIndex >= '0' && colorStringIndex <= '9')
    {
      currentColorString += colorStringIndex
    }

    // Hits Non-Digit -> Assign Value
    else if (currentColorString !== '')
    {
      if (counterIndex === 0) red = currentColorString * 1
      else if (counterIndex === 1) green = currentColorString * 1
      else blue = currentColorString * 1

      currentColorString = ''
      counterIndex++
    }
  }

  // Red && Green Were Assigned -> The Stair Leads To The BLue
  if (currentColorString !== '')
  {
    if (counterIndex === 0) red = currentColorString * 1
    else if (counterIndex === 1) green = currentColorString * 1
    else blue = currentColorString * 1
  }

  function convertToHexadecimal(value)
  {
    const theColorValue = value * 1

    function divideBy16(value)
    {
      let highColorValue = 0

      while (value >= 16)
      {
        value -= 16
        highColorValue++
      }
      
      return highColorValue
    }

    function moduloBy16(value)
    {
      while (value >= 16) value -= 16
      return value
    }

    const highColorValue = divideBy16(theColorValue)
    const lowColorValue = moduloBy16(theColorValue)
    
    return hexadecimalDigits[highColorValue] + hexadecimalDigits[lowColorValue]
  }

  return '#' + convertToHexadecimal(red) + convertToHexadecimal(green) + convertToHexadecimal(blue)
}