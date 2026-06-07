export function normalizeToRGBColor(scssColor)
{
  const temporaryCanvas = document.createElement('canvas')
  const temporaryContext = temporaryCanvas.getContext('2d')

  temporaryContext.fillStyle = '#000000'
  temporaryContext.fillStyle = scssColor

  const normalized = temporaryContext.fillStyle
  if (normalized === '' || normalized === 'transparent') return '#000000'

  return normalized
}


export function convertRGBStringToArray(redGreenBlueString)
{
  const values = redGreenBlueString.match(/\d+/g)
  if (!values) return [0, 0, 0]

  return values.map(Number)
}