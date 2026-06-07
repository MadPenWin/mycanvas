export function renderImage(context, imageObject)
{
  const { x, y, width, height, rotation, source } = imageObject

  const image = new Image()
  image.src = source

  const drawTheImage = () =>
  {
    const centerX = x + width / 2
    const centerY = y + height / 2

    context.save()

    context.translate(centerX, centerY)
    context.rotate(rotation * Math.PI / 180)
    context.translate(-centerX, -centerY)

    drawFittedImage(context, image, x, y, width, height)
    context.restore()
  }

  if (image.complete) drawTheImage()
  else image.onload = drawTheImage
}


function drawFittedImage(context, image, x, y, width, height)
{
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)

  const drawWidth = image.naturalWidth * scale
  const drawHeight = image.naturalHeight * scale

  const offsetX = (width - drawWidth) / 2
  const offsetY = (height - drawHeight) / 2

  context.beginPath()
  context.rect(x, y, width, height)

  context.clip()
  context.drawImage(image, x + offsetX, y + offsetY, drawWidth, drawHeight)
}