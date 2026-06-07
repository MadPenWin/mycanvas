import { hueSaturationValueToHexadecimal } from '../ColorPickerConvert/hueSaturationValueToHexadecimal.js'


export function updateColorPreviewOnly(engine)
{
  const hexadecimalColor = hueSaturationValueToHexadecimal(engine.hue, engine.saturation, engine.value)
  engine.activeColorBoxElement.style.backgroundColor = hexadecimalColor
  engine.hexadecimalUserInput.value = hexadecimalColor
}