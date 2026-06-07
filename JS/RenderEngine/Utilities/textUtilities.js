export function wrapCanvasText(context, text, maxWidth)
{
  const words = text.split(' ')
  const textLines = []

  let currentTextLine = ''
  for (const word of words)
  {
    const testLine = currentTextLine ? currentTextLine + ' ' + word : word
    const testWidth = context.measureText(testLine).width

    if (testWidth > maxWidth && currentTextLine !== '')
    {
      textLines.push(currentTextLine)
      currentTextLine = word
    }

    else currentTextLine = testLine
  }

  if (currentTextLine !== '') textLines.push(currentTextLine)
  return textLines
}


export function splitParagraphs(text) { return text.split('\n') }