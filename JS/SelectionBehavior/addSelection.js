import { storeStation } from '../MyCanvasStation/storeStation.js'


export function addSelection(theElement)
{
  if (storeStation.memory.elementsSelectedArray.includes(theElement))
  {
    return
  }

  storeStation.memory.elementsSelectedArray.push(theElement)
  theElement.classList.add('the-element-selected')
}