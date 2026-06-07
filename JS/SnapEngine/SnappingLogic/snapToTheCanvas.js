import { snapHorizontally } from '../SnappingLogic/snapHorizontally.js'
import { snapVertically } from '../SnappingLogic/snapVertically.js'


export function snapToTheCanvas({snapState, currentEdges, theCanvasWidth, theCanvasHeight, allowLeft, allowRight, allowTop, allowBottom})
{
  if (allowLeft) snapHorizontally(snapState, currentEdges.left, 0, 0)
  if (allowRight) snapHorizontally(snapState, currentEdges.right, theCanvasWidth - currentEdges.width, theCanvasWidth)
  if (allowTop) snapVertically(snapState, currentEdges.top, 0, 0)
  if (allowBottom) snapVertically(snapState, currentEdges.bottom, theCanvasHeight - currentEdges.height, theCanvasHeight)
}