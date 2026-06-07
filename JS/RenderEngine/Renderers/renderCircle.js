import { hasLowContrastBetweenColors, getContrastStrokeColorForShape } from '../Utilities/contrastUtilities.js'


export function renderCircle(context, shape, canvasBackgroundColor)
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

  context.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, Math.PI * 2)
  context.fill()

  if (hasLowContrastBetweenColors(fill, canvasBackgroundColor))
  {
    context.strokeStyle = getContrastStrokeColorForShape(fill)
    context.lineWidth = 3

    context.beginPath()
    context.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, Math.PI * 2)
    context.stroke()
  }

  context.restore()
}