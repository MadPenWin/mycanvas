import { hasLowContrastBetweenColors, getContrastStrokeColorForShape } from '../Utilities/contrastUtilities.js'


export function renderTriangle(context, shape, canvasBackgroundColor)
{
  const { x, y, width, height, rotation, fill } = shape

  const centerX = x + (width / 2)
  const centerY = y + (height / 2)

  context.save()

  if (rotation !== 0)
  {
    context.translate(centerX, centerY)
    context.rotate(rotation * Math.PI / 180)
    context.translate(-centerX, -centerY)
  }

  context.fillStyle = fill

  context.beginPath()
  context.moveTo(centerX, y)

  context.lineTo(x + width, y + height)
  context.lineTo(x, y + height)

  context.closePath()
  context.fill()

  if (hasLowContrastBetweenColors(fill, canvasBackgroundColor))
  {
    context.strokeStyle = getContrastStrokeColorForShape(fill)
    context.lineWidth = 3

    context.beginPath()
    context.moveTo(centerX, y)

    context.lineTo(x + width, y + height)
    context.lineTo(x, y + height)

    context.closePath()
    context.stroke()
  }

  context.restore()
}