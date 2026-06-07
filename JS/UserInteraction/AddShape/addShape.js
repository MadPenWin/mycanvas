import { domStation } from '../../MyCanvasStation/domStation.js'
import { storeStation } from '../../MyCanvasStation/storeStation.js'

import { shapeRegistry } from '../../ElementRegistry/shapeRegistry.js'

import { attachElementEvents } from '../../ElementFunction/attachElementEvents.js'
import { applyTransform } from '../../ElementFunction/applyTransform.js'

import { updateCursorsResizePosition } from '../../ElementFunction/updateCursorsResizePosition.js'

import { clearSelection } from '../../SelectionBehavior/clearSelection.js'
import { addSelection } from '../../SelectionBehavior/addSelection.js'


export function addShape(shapeType)
{
  const shapeTyped = shapeRegistry[shapeType]
  if (!shapeTyped)
  {
    console.error('Shape Type', `${ shapeType }`, 'Not Found.')
    return
  }

  const theShape = document.createElement('div')
  theShape.classList.add(shapeTyped.className)

  theShape.dataset.shape = shapeType
  theShape.tabIndex = 0

  theShape.dataset.id = crypto.randomUUID()
  theShape.dataset.shapeType = shapeType

  theShape.dataset.translateX = 1
  theShape.dataset.translateY = 1

  theShape.style.width = shapeTyped.defaultWidth + 'px'
  theShape.style.height = shapeTyped.defaultHeight + 'px'

  theShape.dataset.rotationAngle = shapeTyped.defaultRotation
  theShape.style.transformOrigin = 'center center'

  const innerShape = document.createElement('div')
  innerShape.classList.add('shape-inner')
  
  innerShape.style.width = '100%'
  innerShape.style.height = '100%'

  innerShape.style.backgroundColor = shapeTyped.defaultBackground

  theShape.appendChild(innerShape)
  theShape.insertAdjacentHTML('beforeend', 
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

  applyTransform(theShape)
  updateCursorsResizePosition(theShape, Number(theShape.dataset.rotationAngle) || 0)

  domStation.theCanvasDesignSurface.appendChild(theShape)
  attachElementEvents(theShape)

  clearSelection()
  addSelection(theShape)

  storeStation.canvas.isSelectingTheCanvas = false

  storeStation.element.isSelectingTheElement = true
  storeStation.element.theElement = theShape

  console.log('Add New Shape', theShape)
}