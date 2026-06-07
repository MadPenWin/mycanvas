import { loadSavedColorState } from './ColorPickerSaved/loadSavedColorState.js'

import { drawHueCanvas } from './ColorPickerDraw/drawHueCanvas.js'
import { drawSaturationValueCanvas } from './ColorPickerDraw/drawSaturationValueCanvas.js'

import { updateColorPreviewOnly } from './ColorPickerUpdate/updateColorPreviewOnly.js'
import { attachEventListeners } from './ColorPickerFunction/attachEventListeners.js'


export class colorPickerEngine
{
  constructor(hueCanvas, saturationValueCanvas, activeColorBoxElement, hexadecimalUserInput)
  {
    this.hueCanvas = hueCanvas
    this.saturationValueCanvas = saturationValueCanvas

    this.activeColorBoxElement = activeColorBoxElement
    this.hexadecimalUserInput = hexadecimalUserInput

    this.hueCanvasContext = hueCanvas.getContext('2d', { willReadFrequently: true })
    this.saturationValueCanvasContext = saturationValueCanvas.getContext('2d', { willReadFrequently: true })

    this.hue = 0
    this.saturation = 1
    this.value = 1

    this.isDraggingHue = false
    this.isDraggingSaturationValue = false

    this.targetElement = null
    this.targetIsText = false

    loadSavedColorState(this)

    drawHueCanvas(this)
    drawSaturationValueCanvas(this)

    updateColorPreviewOnly(this)
    attachEventListeners(this)
  }
}