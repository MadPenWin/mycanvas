import { drawSaturationValueCanvas } from '../ColorPickerDraw/drawSaturationValueCanvas.js'

import { applyColorToTarget } from '../ColorPickerFunction/applyColorToTarget.js'
import { updateActiveColorBox } from './updateActiveColorBox.js'

import { saveColorState } from '../ColorPickerSaved/saveColorState.js'


export function updateSaturationValueFromEvent(engine, event)
{
  const canvasBoundingRectangle = engine.saturationValueCanvas.getBoundingClientRect()

  let positionX = event.clientX - canvasBoundingRectangle.left
      positionX = Math.max(0, Math.min(engine.saturationValueCanvas.width, positionX))

  let positionY = event.clientY - canvasBoundingRectangle.top
      positionY = Math.max(0, Math.min(engine.saturationValueCanvas.height, positionY))

  engine.saturation = positionX / engine.saturationValueCanvas.width
  engine.value = 1 - (positionY / engine.saturationValueCanvas.height)

  drawSaturationValueCanvas(engine)
  applyColorToTarget(engine)
  
  updateActiveColorBox(engine)
  saveColorState(engine)
}