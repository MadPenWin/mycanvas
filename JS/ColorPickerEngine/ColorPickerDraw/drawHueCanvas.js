export function drawHueCanvas(engine)
{
  const canvasWidth = engine.hueCanvas.width
  const canvasHeight = engine.hueCanvas.height

  const canvasContext = engine.hueCanvasContext
  const canvasGradient = canvasContext.createLinearGradient(0, 0, canvasWidth, 0)

  const positionX = engine.hue / 360 * canvasWidth
  const centerY = canvasHeight / 2

  for (let degree = 0; degree <= 360; degree += 10)
  {
    canvasGradient.addColorStop(degree / 360, `hsl(${ degree }, 100%, 50%)`)
  }

  canvasContext.fillStyle = canvasGradient
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight)

  canvasContext.beginPath()
  canvasContext.arc(positionX, centerY, 9, 0, Math.PI * 2)

  canvasContext.strokeStyle = 'black'
  canvasContext.lineWidth = 2

  canvasContext.stroke()
}