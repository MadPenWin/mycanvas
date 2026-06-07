import { shapeRegistry } from '../../ElementRegistry/shapeRegistry.js'
import { applyTransform } from '../../ElementFunction/applyTransform.js'

import { updateCursorsResizePosition } from '../../ElementFunction/updateCursorsResizePosition.js'


export function loadShapeElements(shapeData)
{
  const shapeRegistryEntry = shapeRegistry[shapeData.shapeType]
  if (!shapeRegistryEntry) return null
  
  const shapeElement = document.createElement('div')
  shapeElement.dataset.shape = shapeData.shapeType

  shapeElement.dataset.id = shapeData.id
  shapeElement.dataset.shapeType = shapeData.shapeType

  shapeElement.classList.add(...shapeRegistryEntry.className.split(' '))
  shapeElement.tabIndex = 0

  shapeElement.dataset.translateX = Number(shapeData.translateX) || 0
  shapeElement.dataset.translateY = Number(shapeData.translateY) || 0

  shapeElement.style.width = shapeData.width + 'px'
  shapeElement.style.height = shapeData.height + 'px'
  
  shapeElement.dataset.rotationAngle = shapeData.rotationAngle
  applyTransform(shapeElement)

  const innerShape = document.createElement('div')
  innerShape.classList.add('shape-inner')

  innerShape.style.width = '100%'
  innerShape.style.height = '100%'

  innerShape.style.backgroundColor = shapeData.backgroundColor

  shapeElement.appendChild(innerShape)
  shapeElement.insertAdjacentHTML('beforeend',
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

  updateCursorsResizePosition(shapeElement, Number(shapeData.rotationAngle) || 0)
  return shapeElement
}