import { drawHueCanvas } from '../ColorPickerDraw/drawHueCanvas.js'

import { applyColorToTarget } from '../ColorPickerFunction/applyColorToTarget.js'
import { updateActiveColorBox } from './updateActiveColorBox.js'

import { saveColorState } from '../ColorPickerSaved/saveColorState.js'


export function updateHueFromEvent(engine, event)
{
  const canvasBoundingRectangle = engine.hueCanvas.getBoundingClientRect()

  let positionX = event.clientX - canvasBoundingRectangle.left
      positionX = Math.max(0, Math.min(engine.hueCanvas.width, positionX))

  engine.hue = positionX / engine.hueCanvas.width * 360

  drawHueCanvas(engine)
  applyColorToTarget(engine)
  
  updateActiveColorBox(engine)
  saveColorState(engine)
}