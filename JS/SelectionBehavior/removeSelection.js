import { storeStation } from '../MyCanvasStation/storeStation.js'


export function removeSelection(theElement)
{
  storeStation.memory.elementsSelectedArray = storeStation.memory.elementsSelectedArray.filter(element => element !== theElement)
  theElement.classList.remove(`the-element-selected`)
}