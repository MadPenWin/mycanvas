import { domStation } from '../../MyCanvasStation/domStation.js'
import { storeStation } from '../../MyCanvasStation/storeStation.js'

import { hueSaturationValueToHexadecimal } from '../ColorPickerConvert/hueSaturationValueToHexadecimal.js'

import { saveTheCanvasState } from '../../SaveState/SaveTheCanvasState/saveTheCanvasState.js'
import { saveTheElementState } from '../../SaveState/SaveTheElementState/saveTheElementState.js'


export function applyColorToTarget(engine)
{
  const hexadecimalColor = hueSaturationValueToHexadecimal(engine.hue, engine.saturation, engine.value)
  if (storeStation.canvas.isSelectingTheCanvas)
  {
    domStation.theCanvasDesignSurface.style.backgroundColor = hexadecimalColor
    saveTheCanvasState()
  }

  else if (storeStation.element.isSelectingTheElement)
  {
    const elementInner = storeStation.element.theElement?.querySelector('.shape-inner, .text-inner')
    if (elementInner)
    {
      if (elementInner.classList.contains('text-inner')) elementInner.style.color = hexadecimalColor
      else elementInner.style.backgroundColor = hexadecimalColor
    }

    saveTheElementState()
  }
}