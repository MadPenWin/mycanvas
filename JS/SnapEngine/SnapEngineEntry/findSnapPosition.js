import { storeStation } from '../../MyCanvasStation/storeStation.js'

import { snapToTheCanvas } from '../SnappingLogic/snapToTheCanvas.js'
import { snapToElements } from '../SnappingLogic/snapToElements.js'

import { computeEdges } from '../GeometryHelpers/computeEdges.js'


export function findSnapPosition(currentElement, allElements, theCanvasRectangle, position, resizeDirection)
{
  const theCanvasScale = storeStation.canvas.theCanvasScale
  const scaledSnapDistance = storeStation.calculation.snapDistanceOfElements / theCanvasScale

  const theCanvasWidth = theCanvasRectangle.width / theCanvasScale
  const theCanvasHeight = theCanvasRectangle.height / theCanvasScale

  const rotation = Number(currentElement?.dataset?.rotationAngle) || 0
  const currentEdges = computeEdges(position.left, position.top, position.width, position.height)

  const snapState = 
  {
    bestLeftSnap: position.left,
    bestTopSnap: position.top,

    smallestHorizontalDistance: scaledSnapDistance,
    smallestVerticalDistance: scaledSnapDistance,

    guideX: null,
    guideY: null
  }

  const isResizing = resizeDirection != null

  const allowLeft = !isResizing || resizeDirection.includes('left')
  const allowRight = !isResizing || resizeDirection.includes('right')

  const allowTop = !isResizing || resizeDirection.includes('top')
  const allowBottom = !isResizing || resizeDirection.includes('bottom')

  snapToTheCanvas({ snapState, currentEdges, theCanvasWidth, theCanvasHeight, allowLeft, allowRight, allowTop, allowBottom })
  snapToElements({ snapState, currentElement, allElements, currentEdges, allowLeft, allowRight, allowTop, allowBottom })

  return {
    left: snapState.bestLeftSnap,
    top: snapState.bestTopSnap,

    right: snapState.bestLeftSnap + position.width,
    bottom: snapState.bestTopSnap + position.height,

    guideX: snapState.guideX,
    guideY: snapState.guideY
  }
}