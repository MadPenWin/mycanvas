import { imageRegistry } from '../../ElementRegistry/imageRegistry.js'

import { applyTransform } from '../../ElementFunction/applyTransform.js'
import { updateCursorsResizePosition } from '../../ElementFunction/updateCursorsResizePosition.js'


export function loadImageElements(imageData)
{
  const imageType = imageRegistry.image
  if (!imageType) return null

  const imageElement = document.createElement('div')
  imageElement.classList.add(...imageType.className.split(' '))

  imageElement.dataset.id = imageData.id
  imageElement.dataset.shapeType = 'image'

  imageElement.dataset.translateX = Number(imageData.translateX) || 0
  imageElement.dataset.translateY = Number(imageData.translateY) || 0

  imageElement.tabIndex = 0
  imageElement.dataset.rotationAngle = Number(imageData.rotationAngle) || imageType.defaultRotation

  imageElement.style.width = `${ imageData.width }px`
  imageElement.style.height = `${ imageData.height }px`

  imageElement.style.transformOrigin = 'center center'
  applyTransform(imageElement)

  const innerImage = document.createElement('img')
  innerImage.classList.add('image-inner')

  innerImage.src = imageData.source || imageData.src || imageType.defaultSource
  innerImage.draggable = false

  innerImage.style.width = '100%'
  innerImage.style.height = '100%'

  innerImage.style.objectFit = imageType.defaultFit
  innerImage.style.pointerEvents = 'none'

  imageElement.appendChild(innerImage)
  imageElement.insertAdjacentHTML('beforeend',
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

  updateCursorsResizePosition(imageElement, Number(imageElement.dataset.rotationAngle) || 0)
  return imageElement
}