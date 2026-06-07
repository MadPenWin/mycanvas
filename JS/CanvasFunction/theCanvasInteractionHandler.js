import { domStation } from '../MyCanvasStation/domStation.js'
import { storeStation } from '../MyCanvasStation/storeStation.js'

import { colorPickerEngine } from '../ColorPickerEngine/colorPickerEngine.js'

import { addSelection } from '../SelectionBehavior/addSelection.js'
import { clearSelection } from '../SelectionBehavior/clearSelection.js'

import { shapeSelector } from '../ElementFunction/elementSelector.js'
import { textSelector } from '../ElementFunction/elementSelector.js'
import { imageSelector } from '../ElementFunction/elementSelector.js'

import { exitEditTextMode } from '../ElementFunction/exitEditTextMode.js'

import { convertRGBToHexadecimal } from '../ColorPickerEngine/ColorPickerConvert/redGreenBlueToHexadecimal.js'
import { setColorFromHexadecimal } from '../ColorPickerEngine/ColorPickerFunction/setColorFromHexadecimal.js'

import { colorPickerDom } from '../ColorPickerEngine/ColorPickerDom/colorPickerDom.js'


domStation.theCanvasDesignSurface.addEventListener('mousedown', event =>
{
  const theElement = event.target.closest(shapeSelector()) || event.target.closest(textSelector()) || event.target.closest(imageSelector())
  if (theElement) 
  {
    storeStation.canvas.isSelectingTheCanvas = false
    domStation.theCanvasDesignSurface.classList.remove('the-canvas-design-surface-selected')

    storeStation.element.isSelectingTheElement = true

    if (!event.ctrlKey) clearSelection()
    addSelection(theElement) 

    storeStation.element.theElement = theElement
    return
  }  

  clearSelection()
  
  storeStation.canvas.isSelectingTheCanvas = true
  domStation.theCanvasDesignSurface.classList.add('the-canvas-design-surface-selected')

  storeStation.element.isSelectingTheElement = false
  storeStation.element.theElement = null

  const getTheRGBColor = getComputedStyle(domStation.theCanvasDesignSurface).backgroundColor
  const toHexadecimal = convertRGBToHexadecimal(getTheRGBColor)

  setColorFromHexadecimal(colorPickerDom, toHexadecimal)
  console.log('Selected The Canvas Design Surface.')
})


document.addEventListener('mousedown', event =>
{
  if (storeStation.element.isEditingText) 
  {
    const textElement = storeStation.element.theElement
    const innerText = textElement?.querySelector('.text-inner')

    if (innerText) 
    {
      innerText.contentEditable = false
      innerText.blur()
    }

    storeStation.element.isEditingText = false
  }

  const clickedInsideColorPickerBar = event.target.closest('.saturation-value-canvas, .hue-canvas, .active-color-box-element, .hexadecimal-user-input')
  if (clickedInsideColorPickerBar || domStation.theCanvasDesignSurface.contains(event.target) || event.target.closest('#hideTheColorBarButton')) return

  clearSelection()

  storeStation.element.isSelectingTheElement = false
  storeStation.element.theElement = null

  storeStation.canvas.isSelectingTheCanvas = false
  domStation.theCanvasDesignSurface.classList.remove('the-canvas-design-surface-selected')
})