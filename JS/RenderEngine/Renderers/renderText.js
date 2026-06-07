import { wrapCanvasText, splitParagraphs } from '../Utilities/textUtilities.js'
import { normalizeToRGBColor } from '../Utilities/colorUtilities.js'


export function renderText(context, textObject)
{
  const { x, y, width, height, rotation, color, fontSize, fontFamily, text } = textObject

  const centerX = x + (width / 2)
  const centerY = y + (height / 2)

  context.save()

  if (rotation !== 0)
  {
    context.translate(centerX, centerY)
    context.rotate(rotation * Math.PI / 180)
    context.translate(-centerX, -centerY)
  }

  context.font = `${ fontSize }px ${ fontFamily }`
  context.fillStyle = normalizeToRGBColor(color)

  context.textBaseline = 'top'
  context.textAlign = 'left'

  const padding = 2
  const maxWidth = width - (padding * 2)

  const paragraphs = splitParagraphs(text)
  
  const lines = paragraphs.flatMap(paragraph => wrapCanvasText(context, paragraph, maxWidth))
  const lineHeight = fontSize * 1.2

  context.beginPath()
  context.rect(x, y, width, height)
  context.clip()

  lines.forEach((line, index) => { context.fillText(line, x + padding, y + padding + index * lineHeight) })
  context.restore()
}