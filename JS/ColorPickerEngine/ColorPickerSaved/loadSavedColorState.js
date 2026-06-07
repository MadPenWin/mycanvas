import { drawHueCanvas } from '../ColorPickerDraw/drawHueCanvas.js'
import { drawSaturationValueCanvas } from '../ColorPickerDraw/drawSaturationValueCanvas.js'

import { updateColorPreviewOnly } from '../ColorPickerUpdate/updateColorPreviewOnly.js'


export function loadSavedColorState(engine)
{
  const savedStateRawText = localStorage.getItem('colorPickerState')
  if (!savedStateRawText) return

  try
  {
    const savedStateData = JSON.parse(savedStateRawText)
    if (typeof savedStateData.hue === 'number' && typeof save)
    {
      engine.hue = savedStateData.hue
      engine.saturation = savedStateData.saturation
      engine.value = savedStateData.value

      drawHueCanvas(engine)
      drawSaturationValueCanvas(engine)

      updateColorPreviewOnly(engine)
    }
  }

  catch (error) { console.error('Failed To Load Saved Color State.', error) }
}