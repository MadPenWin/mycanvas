import { storeStation } from '../MyCanvasStation/storeStation.js'


export function enterEditTextMode(textElement)
{
  const innerText = textElement.querySelector('.text-inner')
  innerText.contentEditable = true
  innerText.focus()

  storeStation.element.isEditingText = true
}