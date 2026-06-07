import { storeStation } from '../MyCanvasStation/storeStation.js'

import { removeSelection } from './removeSelection.js'
import { addSelection } from './addSelection.js'


export function toggleSelection(theElement)
{
  if (storeStation.memory.elementsSelectedArray.includes(theElement))
  {
    removeSelection(theElement)
  }

  else
  {
    addSelection(theElement)
  }
}