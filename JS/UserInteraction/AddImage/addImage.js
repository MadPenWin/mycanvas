import { domStation } from '../../MyCanvasStation/domStation.js'
import { storeStation } from '../../MyCanvasStation/storeStation.js'

import { imageRegistry } from '../../ElementRegistry/imageRegistry.js'

import { attachElementEvents } from '../../ElementFunction/attachElementEvents.js'
import { applyTransform } from '../../ElementFunction/applyTransform.js'

import { updateCursorsResizePosition } from '../../ElementFunction/updateCursorsResizePosition.js'

import { clearSelection } from '../../SelectionBehavior/clearSelection.js'
import { addSelection } from '../../SelectionBehavior/addSelection.js'

import { saveTheElementState } from '../../SaveState/SaveTheElementState/saveTheElementState.js'
import { pushTheElementToMemory } from '../../SaveState/SaveTheElementState/pushTheElementToMemory.js'


export function addImage(imageSource)
{
  const imageType = imageRegistry.image
  if (!imageType)
  {
    console.error('Image Registry Not Found.')
    return
  }

  const imageLoader = new Image()
  imageLoader.onload = () =>
  {
    const defaultWidth = imageType.defaultWidth
    const aspectRatio = imageLoader.naturalHeight / imageLoader.naturalWidth
    const defaultHeight = Math.round(defaultWidth * aspectRatio)

    const theImage = document.createElement('div')
    theImage.classList.add(...imageType.className.split(' '))

    theImage.dataset.id = crypto.randomUUID()
    theImage.dataset.shapeType = 'image'

    theImage.dataset.translateX = 1
    theImage.dataset.translateY = 1

    theImage.tabIndex = 0
    theImage.dataset.rotationAngle = imageType.defaultRotation

    theImage.style.width = `${ defaultWidth }px`
    theImage.style.height = `${ defaultHeight }px`

    theImage.style.transformOrigin = 'center center'

    const innerImage = document.createElement('img')
    innerImage.classList.add('image-inner')

    innerImage.src = imageSource
    innerImage.draggable = false

    innerImage.style.width = '100%'
    innerImage.style.height = '100%'

    innerImage.style.objectFit = imageType.defaultFit
    innerImage.style.pointerEvents = 'none'

    theImage.appendChild(innerImage)
    theImage.insertAdjacentHTML('beforeend',
      `
        <div class="rotate-handle"></div>

        <div class="resize-handle top-left"></div>
        <div class="resize-handle top-right"></div>

        <div class="resize-handle bottom-left"></div>
        <div class="resize-handle bottom-right"></div>

        <div class="resize-handle top"></div>
        <div class="resize-handle bottom"></div>

        <div class="resize-handle left"></div>
        <div class="resize-handle right"></div>
      `
    )

    applyTransform(theImage)

    updateCursorsResizePosition(theImage, Number(theImage.dataset.rotationAngle) || 0)

    domStation.theCanvasDesignSurface.appendChild(theImage)
    attachElementEvents(theImage)

    clearSelection()
    addSelection(theImage)

    storeStation.canvas.isSelectingTheCanvas = false

    storeStation.element.isSelectingTheElement = true
    storeStation.element.theElement = theImage

    saveTheElementState()
    pushTheElementToMemory()

    console.log('Add New Image', theImage)
  }

  imageLoader.onerror = () => { console.error('Failed To Load Image:', imageSource) }
  imageLoader.src = imageSource
}