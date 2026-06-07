import { storeStation } from '../../MyCanvasStation/storeStation.js'


export function saveUploadedImages(imageSource)
{
  const transaction = storeStation.canvas.myCanvas.transaction('canvas', 'readwrite')
  const objectStore = transaction.objectStore('canvas')

  const request = objectStore.get('uploadedImages')
  request.onsuccess = () =>
  {
    const recordRequest = request.result || { id: 'uploadedImages', images: [] }
    recordRequest.images.push({ id: crypto.randomUUID(), src: imageSource })

    objectStore.put(recordRequest)
  }
}