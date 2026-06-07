import { resolveTheElementEdgeData } from '../GeometryHelpers/resolveTheElementEdgeData.js'

import { snapHorizontally } from './snapHorizontally.js'
import { snapVertically } from './snapVertically.js'


export function snapToElements({snapState, currentElement, allElements, currentEdges, allowLeft, allowRight, allowTop, allowBottom})
{
  for (const otherElement of allElements)
  {
    const otherEdges = resolveTheElementEdgeData(otherElement)
    if (!otherEdges || otherEdges.element === currentElement) continue

    if (allowLeft)
    {
      snapHorizontally(snapState, currentEdges.left, otherEdges.left, otherEdges.left)
      snapHorizontally(snapState, currentEdges.left, otherEdges.right, otherEdges.right)
    }
    
    if (allowRight)
    {
      snapHorizontally(snapState, currentEdges.right, otherEdges.left - currentEdges.width, otherEdges.left)
      snapHorizontally(snapState, currentEdges.right, otherEdges.right - currentEdges.width, otherEdges.right)
    }

    if (allowTop)
    {
      snapVertically(snapState, currentEdges.top, otherEdges.top, otherEdges.top)
      snapVertically(snapState, currentEdges.top, otherEdges.bottom, otherEdges.bottom)
    }

    if (allowBottom)
    {
      snapVertically(snapState, currentEdges.bottom, otherEdges.top - currentEdges.height, otherEdges.top)
      snapVertically(snapState, currentEdges.bottom, otherEdges.bottom - currentEdges.height, otherEdges.bottom)
    }
  }
}