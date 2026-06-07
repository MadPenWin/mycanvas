import { storeStation } from '../../MyCanvasStation/storeStation.js'
import { loadState } from '../LoadState/loadState.js'


const requestDB = indexedDB.open('myCanvas', 1)
requestDB.onerror = event => { console.log('IndexedDB Error:', event.target.error) }


requestDB.onupgradeneeded = event =>
{
  storeStation.canvas.myCanvas = event.target.result
  if (!storeStation.canvas.myCanvas.objectStoreNames.contains('canvas')) storeStation.canvas.myCanvas.createObjectStore('canvas', { keyPath: 'id'})
}


requestDB.onsuccess = event =>
{
  storeStation.canvas.myCanvas = event.target.result
  if (!storeStation.canvas.myCanvas.objectStoreNames.contains('canvas')) console.error('My Canvas - Object Store Not Found.')

  loadState()
  console.log('Database Request Completed Successfully.')
}