import { computeEdges } from './computeEdges.js'


export function resolveTheElementEdgeData(theElement)
{
  if (!(theElement instanceof HTMLElement))
  {
    return null
  }

  const left = Number(theElement.dataset.translateX) || 0
  const top = Number(theElement.dataset.translateY) || 0

  const width = parseFloat(theElement.style.width) || 0
  const height = parseFloat(theElement.style.height) || 0

  const rotation = Number(theElement.dataset.rotationAngle) || 0
  const edges = computeEdges(left, top, width, height, rotation)

  return { element: theElement, ...edges }
}