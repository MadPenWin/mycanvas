import { updateHueFromEvent } from '../ColorPickerUpdate/updateHueFromEvent.js'
import { updateSaturationValueFromEvent } from '../ColorPickerUpdate/updateSaturationValueFromEvent.js'

import { hexadecimalToHueSaturationValue } from '../ColorPickerConvert/hexadecimalToHueSaturationValue.js'

import { drawHueCanvas } from '../ColorPickerDraw/drawHueCanvas.js'
import { drawSaturationValueCanvas } from '../ColorPickerDraw/drawSaturationValueCanvas.js'

import { applyColorToTarget } from './applyColorToTarget.js'
import { updateActiveColorBox } from '../ColorPickerUpdate/updateActiveColorBox.js'

import { saveColorState } from '../ColorPickerSaved/saveColorState.js'


export function attachEventListeners(engine)
{
  engine.hueCanvas.addEventListener('mousedown', event =>
  {
    engine.isDraggingHue = true
    updateHueFromEvent(engine, event)
  })

  engine.saturationValueCanvas.addEventListener('mousedown', event =>
  {
    engine.isDraggingSaturationValue = true
    updateSaturationValueFromEvent(engine, event)
  })

  document.addEventListener('mousemove', event =>
  {
    if (engine.isDraggingHue) updateHueFromEvent(engine, event)
    if (engine.isDraggingSaturationValue) updateSaturationValueFromEvent(engine, event)
    if (engine.isDraggingHue || engine.isDraggingSaturationValue)
    {
      drawHueCanvas(engine)
      drawSaturationValueCanvas(engine)
      
      applyColorToTarget(engine)
      updateActiveColorBox(engine)

      saveColorState(engine)
    }
  })

  document.addEventListener('mouseup', () =>
  {
    engine.isDraggingHue = false
    engine.isDraggingSaturationValue = false
  })

  // Block The User From Deleting The First Character { # }
  engine.hexadecimalUserInput.addEventListener('keydown', event =>
  {
    if 
    (
      engine.hexadecimalUserInput.selectionStart === 0 && 
      engine.hexadecimalUserInput.selectionEnd === 1 &&
      (event.key === 'Backspace' || event.key === 'Delete')
    ) { event.preventDefault() }
  })

  engine.hexadecimalUserInput.addEventListener('paste', event =>
  {
    event.preventDefault()

    let pastedText = (event.clipboardData || window.clipboardData).getData('text')
        pastedText = pastedText.replace(/[^0-9A-Fa-f]/g, '').toUpperCase()

    if (pastedText.length > 0) pastedText = pastedText.slice(0, 6)
    engine.hexadecimalUserInput.value = '#' + pastedText

    if (pastedText.length === 6)
    {
      const hueSaturationValueFromHex = hexadecimalToHueSaturationValue('#' + pastedText)

      engine.hue = hueSaturationValueFromHex.hue
      engine.saturation = hueSaturationValueFromHex.saturation
      engine.value = hueSaturationValueFromHex.value

      drawHueCanvas(engine)
      drawSaturationValueCanvas(engine)

      applyColorToTarget(engine)
      updateActiveColorBox(engine)

      saveColorState(engine)
    }
  })

  engine.hexadecimalUserInput.addEventListener('input', () =>
  {
    let userInputValue = engine.hexadecimalUserInput.value.toUpperCase()

    if (!userInputValue.startsWith('#')) userInputValue = '#' + userInputValue.replace(/[^0-9A-F]/g, '')
    userInputValue = '#' + userInputValue.slice(1).replace(/[^0-9A-F]/g, '')

    if (userInputValue.length > 7) userInputValue = userInputValue.slice(0, 7)
    engine.hexadecimalUserInput.value = userInputValue

    if (/^#[0-9A-F]{6}$/.test(userInputValue))
    {
      const hueSaturationValueFromHex = hexadecimalToHueSaturationValue(userInputValue)

      engine.hue = hueSaturationValueFromHex.hue
      engine.saturation = hueSaturationValueFromHex.saturation
      engine.value = hueSaturationValueFromHex.value

      drawHueCanvas(engine)
      drawSaturationValueCanvas(engine)

      applyColorToTarget(engine)
      updateActiveColorBox(engine)

      saveColorState(engine)
    }
  })
}