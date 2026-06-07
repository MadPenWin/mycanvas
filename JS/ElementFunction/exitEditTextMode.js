import { storeStation } from '../MyCanvasStation/storeStation.js'


export function exitEditTextMode(textElement)
{
  const innerText = textElement.querySelector('.text-inner')
  innerText.contentEditable = false
  innerText.blur()

  storeStation.element.isEditingText = false
}