import { hexadecimalToHueSaturationValue } from '../ColorPickerConvert/hexadecimalToHueSaturationValue.js'

import { drawHueCanvas } from '../ColorPickerDraw/drawHueCanvas.js'
import { drawSaturationValueCanvas } from '../ColorPickerDraw/drawSaturationValueCanvas.js'

import { updateColorPreviewOnly } from '../ColorPickerUpdate/updateColorPreviewOnly.js'
import { saveColorState } from '../ColorPickerSaved/saveColorState.js'


export function setColorFromHexadecimal(engine, hexadecimal)
{
  const hueSaturationValueFromHex = hexadecimalToHueSaturationValue(hexadecimal)

  engine.hue = hueSaturationValueFromHex.hue
  engine.saturation = hueSaturationValueFromHex.saturation
  engine.value = hueSaturationValueFromHex.value

  drawHueCanvas(engine)
  drawSaturationValueCanvas(engine)

  updateColorPreviewOnly(engine)
  saveColorState(engine)
}