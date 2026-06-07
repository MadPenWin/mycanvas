import { normalizeToRGBColor, convertRGBStringToArray } from './colorUtilities.js'


export function calculateBrightness(redGreenBlueArray)
{
  const [red, green, blue] = redGreenBlueArray
  return 0.299 * red + 0.587 * green + 0.114 * blue
}


export function hasLowContrastBetweenColors(shapeColor, canvasColor)
{
  const shapeRGB = convertRGBStringToArray(normalizeToRGBColor(shapeColor))
  const canvasRGB = convertRGBStringToArray(normalizeToRGBColor(canvasColor))

  const shapeBrightness = calculateBrightness(shapeRGB)
  const canvasBrightness = calculateBrightness(canvasRGB)

  const brightnessDifference = Math.abs(shapeBrightness - canvasBrightness)
  return brightnessDifference < 40
}


export function getContrastStrokeColorForShape(shapeColor)
{
  const redGreenBlueArray = convertRGBStringToArray(normalizeToRGBColor(shapeColor))
  const brightness = calculateBrightness(redGreenBlueArray)

  return brightness > 128 ? '#000000' : '#FFFFFF'
}