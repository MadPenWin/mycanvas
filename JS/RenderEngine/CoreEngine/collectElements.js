import { shapeSelector } from '../../ElementFunction/elementSelector.js'
import { textSelector } from '../../ElementFunction/elementSelector.js'
import { imageSelector } from '../../ElementFunction/elementSelector.js'


export function collectElements(theCanvasDesignSurface)
{
  const elementSelector = `${ shapeSelector() }, ${ textSelector() }, ${ imageSelector() }`
  const allTheElements = theCanvasDesignSurface.querySelectorAll(elementSelector)

  return allTheElements
}