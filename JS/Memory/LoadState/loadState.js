import { domStation } from '../../MyCanvasStation/domStation.js'
import { storeStation } from '../../MyCanvasStation/storeStation.js'

import { updateTheCanvasPosition } from '../../CanvasFunction/updateTheCanvasPosition.js'

import { loadShapeElements } from '../LoadElements/loadShapeElements.js'
import { loadTextElements } from '../LoadElements/loadTextElements.js'
import { loadImageElements } from '../LoadElements/loadImageElements.js'

import { attachElementEvents } from '../../ElementFunction/attachElementEvents.js'
import { updateCursorsResizePosition } from '../../ElementFunction/updateCursorsResizePosition.js'
import { pushTheElementToMemory } from '../../SaveState/SaveTheElementState/pushTheElementToMemory.js'


export function loadState()
{
  if (!storeStation.canvas.myCanvas)
  {
    console.warn('"MyCanvas" Is Not Initialized.')
    return
  }

  const savedName = localStorage.getItem('projectName')
  const projectName = savedName || storeStation.project.name

  storeStation.project.name = projectName
  domStation.projectNameInput.value = projectName
  document.title = 'My Canvas - ' + projectName

  storeStation.memory.isRestoringState = true

  const myCanvasTransaction = storeStation.canvas.myCanvas.transaction('canvas', 'readonly')
  const canvasObjectStore = myCanvasTransaction.objectStore('canvas')

  const theCanvasStateOnRequest = canvasObjectStore.get('theCanvasState')
  theCanvasStateOnRequest.onsuccess = () =>
  {
    const theCanvasState = theCanvasStateOnRequest.result
    if (theCanvasState)
    {
      storeStation.canvas.theCanvasScale = theCanvasState.theCanvasScale
      updateTheCanvasPosition()

      storeStation.canvas.theCanvasEditorBarScrollLeft = theCanvasState.theCanvasEditorBarScrollLeft || 0
      storeStation.canvas.theCanvasEditorBarScrollTop = theCanvasState.theCanvasEditorBarScrollTop || 0

      domStation.theCanvasEditorBar.scrollLeft = storeStation.canvas.theCanvasEditorBarScrollLeft
      domStation.theCanvasEditorBar.scrollTop = storeStation.canvas.theCanvasEditorBarScrollTop

      domStation.theCanvasDesignSurface.style.backgroundColor = theCanvasState.theCanvasColor || 'var(--backgroundcolor-2)'
    }

    domStation.theCanvasDesignSurface.innerHTML = ''
    domStation.uploadImageContainer.innerHTML = ''

    const theElementStateOnRequest = canvasObjectStore.get('theElementState')
    theElementStateOnRequest.onsuccess = () =>
    {
      const theElementState = theElementStateOnRequest.result
      if (!theElementState)
      {
        console.log('Cannot Find Any Elements.')
        return
      }

      const theElementLoaders = { shapes: loadShapeElements, texts: loadTextElements, images: loadImageElements }
      for (const theElementType in theElementLoaders)
      {
        const loaderFunction = theElementLoaders[theElementType]
        const theElementList = theElementState[theElementType]
        if (!theElementList) continue

        theElementList.forEach(theElementData =>
        {
          const loadedElement = loaderFunction(theElementData)
          if (!loadedElement) return

          domStation.theCanvasDesignSurface.appendChild(loadedElement)
          attachElementEvents(loadedElement)

          const rotatedAngle = Number(theElementData.rotationAngle) || 0
          updateCursorsResizePosition(loadedElement, rotatedAngle)
        })
      }

      const uploadedImagesRequest = canvasObjectStore.get('uploadedImages')
      uploadedImagesRequest.onsuccess = () =>
      {
        const recordRequest = uploadedImagesRequest.result
        if (!recordRequest) return

        recordRequest.images.forEach(imageData =>
        {
          const theImage = document.createElement('img')
          theImage.src = imageData.src
          theImage.classList.add('upload-image-preview')

          domStation.uploadImageContainer.appendChild(theImage)
        })
      }

      storeStation.memory.isRestoringState = false
      pushTheElementToMemory()

      console.log('All The Elements Loaded Successfully.')
    }
  }
}