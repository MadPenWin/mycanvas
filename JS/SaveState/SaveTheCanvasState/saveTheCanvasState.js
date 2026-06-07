import { domStation } from '../../MyCanvasStation/domStation.js'
import { storeStation } from '../../MyCanvasStation/storeStation.js'

import { getTheCanvasState } from './getTheCanvasState.js'


export function saveTheCanvasState()
{
  if (!storeStation.canvas.myCanvas)
  {
    return
  }

  const myCanvasTransaction = storeStation.canvas.myCanvas.transaction('canvas', 'readwrite')
  const objectStoreMyCanvas = myCanvasTransaction.objectStore('canvas')

  objectStoreMyCanvas.put(getTheCanvasState())
}