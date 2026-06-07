import { hueSaturationValueToHexadecimal } from '../ColorPickerConvert/hueSaturationValueToHexadecimal.js'


export function drawSaturationValueCanvas(engine)
{
  const canvasContext = engine.saturationValueCanvasContext
  const canvasWidth = engine.saturationValueCanvas.width
  const canvasHeight = engine.saturationValueCanvas.height

  canvasContext.fillStyle = `hsl(${ engine.hue }, 100%, 50%)`
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight)

  const whiteGradient = canvasContext.createLinearGradient(0, 0, canvasWidth, 0)
  whiteGradient.addColorStop(0, 'white')
  whiteGradient.addColorStop(1, 'transparent')

  canvasContext.fillStyle = whiteGradient
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight)

  const blackGradient = canvasContext.createLinearGradient(0, 0, 0, canvasHeight)
  blackGradient.addColorStop(0, 'transparent')
  blackGradient.addColorStop(1, 'black')

  canvasContext.fillStyle = blackGradient
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight)

  const positionX = engine.saturation * canvasWidth
  const positionY = (1 - engine.value) * canvasHeight

  canvasContext.beginPath()
  canvasContext.arc(positionX, positionY, 8, 0, Math.PI * 2)

  canvasContext.fillStyle = hueSaturationValueToHexadecimal(engine.hue, engine.saturation, engine.value)
  canvasContext.fill()

  canvasContext.strokeStyle = 'white'
  canvasContext.lineWidth = 2

  canvasContext.stroke()
}