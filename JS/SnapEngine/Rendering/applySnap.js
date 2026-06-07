import { computeEdges } from '../GeometryHelpers/computeEdges.js'


export function applySnap(theElement, snapResult)
{
  const width = parseFloat(theElement.style.width) || 0
  const height = parseFloat(theElement.style.height) || 0

  const rotation = Number(theElement.dataset.rotationAngle) || 0
  if (rotation === 0)
  {
    theElement.dataset.translateX = snapResult.left
    theElement.dataset.translateY = snapResult.top
    return
  }

  const aabbAtOrigin = computeEdges(0, 0, width, height, rotation)
  theElement.dataset.translateX = snapResult.left - aabbAtOrigin.left
  theElement.dataset.translateY = snapResult.top - aabbAtOrigin.top
}