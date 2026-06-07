import { updateCursorsResizePosition } from './updateCursorsResizePosition.js'


export function applyTransform(theElement)
{
  const translateX = Number(theElement.dataset.translateX) || 0
  const translateY = Number(theElement.dataset.translateY) || 0

  const rotationAngle = Number(theElement.dataset.rotationAngle) || 0

  theElement.style.transformOrigin = 'center center'
  theElement.style.transform = `translate(${ translateX }px, ${ translateY }px) rotate(${ rotationAngle }deg)`

  updateCursorsResizePosition(theElement, rotationAngle)
}