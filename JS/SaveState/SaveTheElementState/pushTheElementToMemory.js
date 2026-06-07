import { storeStation } from '../../MyCanvasStation/storeStation.js'
import { getTheElementState } from './getTheElementState.js'


export function pushTheElementToMemory()
{
  if (!storeStation.canvas.myCanvas)
  {
    return
  }

  const snapShot = JSON.stringify(getTheElementState())
  storeStation.memory.elementsMemoryArray = storeStation.memory.elementsMemoryArray.slice(0, storeStation.memory.theElementMemoryIndex + 1)
    
  storeStation.memory.elementsMemoryArray.push(snapShot)
  storeStation.memory.theElementMemoryIndex++
}