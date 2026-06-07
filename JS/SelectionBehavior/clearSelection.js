import { storeStation } from '../MyCanvasStation/storeStation.js'


export function clearSelection()
{
  storeStation.memory.elementsSelectedArray.forEach(element =>
  {
    element.classList.remove(`the-element-selected`)
  })

  storeStation.memory.elementsSelectedArray = []
}