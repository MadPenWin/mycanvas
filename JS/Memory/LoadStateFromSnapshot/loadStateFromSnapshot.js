import { domStation } from '../../MyCanvasStation/domStation.js'

import { attachElementEvents } from '../../ElementFunction/attachElementEvents.js'
import { updateCursorsResizePosition } from '../../ElementFunction/updateCursorsResizePosition.js'

import { loadShapeElementsFromSnapshot } from '../LoadElementsFromSnapshot/loadShapeElementsFromSnapshot.js'
import { loadTextElementsFromSnapshot } from '../LoadElementsFromSnapshot/loadTextElementsFromSnapshot.js'


export function loadStateFromSnapshot(theElementData)
{
  if (!theElementData) return
  domStation.theCanvasDesignSurface.innerHTML = ''

  const theElementLoaders = { shapes: loadShapeElementsFromSnapshot, texts: loadTextElementsFromSnapshot }
  for (const theElementType in theElementLoaders)
  {
    const loaderFunction = theElementLoaders[theElementType]
    const theElementList = theElementData[theElementType] || []

    theElementList.forEach(singleElementData =>
    {
      const loadedElement = loaderFunction(singleElementData)
      if (!loadedElement) return

      domStation.theCanvasDesignSurface.appendChild(loadedElement)
      attachElementEvents(loadedElement)

      const rotatedAngle = Number(singleElementData.rotationAngle) || 0
      updateCursorsResizePosition(loadedElement, rotatedAngle)
    })
  }
}