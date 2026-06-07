import { storeStation } from '../../MyCanvasStation/storeStation.js'

import { textRegistry } from '../../ElementRegistry/textRegistry.js'
import { applyTransform } from '../../ElementFunction/applyTransform.js'

import { updateCursorsResizePosition } from '../../ElementFunction/updateCursorsResizePosition.js'
import { enterEditTextMode } from '../../ElementFunction/enterEditTextMode.js'

import { addSelection } from '../../SelectionBehavior/addSelection.js'
import { clearSelection } from '../../SelectionBehavior/clearSelection.js'
 
import { saveTheElementState } from '../../SaveState/SaveTheElementState/saveTheElementState.js'
import { pushTheElementToMemory } from '../../SaveState/SaveTheElementState/pushTheElementToMemory.js'


export function loadTextElements(textData)
{
  const textRegistryEntry = textRegistry[textData.textType]
  if (!textRegistryEntry) return null

  const textElement = document.createElement('div')
  textElement.dataset.id = textData.id

  textElement.dataset.shapeType = 'text'
  textElement.dataset.textType = textData.textType

  textElement.classList.add(...textRegistryEntry.className.split(' '))
  textElement.tabIndex = 0

  textElement.dataset.translateX = Number(textData.translateX) || 0
  textElement.dataset.translateY = Number(textData.translateY) || 0

  textElement.style.width = textData.width + 'px'
  textElement.style.height = textData.height + 'px'

  textElement.dataset.rotationAngle = Number(textData.rotationAngle) || 0
  textElement.addEventListener('mousedown', event => 
  { 
    if (storeStation.element.isEditingText) return

    const alreadySelected = storeStation.element.theElement === textElement
    if (!alreadySelected)
    {
      clearSelection()
      addSelection(textElement)

      storeStation.element.theElement = textElement
      return
    }

    enterEditTextMode(textElement) 
  })
  
  applyTransform(textElement)

  const innerText = document.createElement('div')
  innerText.classList.add('text-inner')

  innerText.contentEditable = false
  innerText.spellcheck = false

  innerText.textContent = textData.textContent

  innerText.style.fontFamily = textData.fontFamily
  innerText.style.fontSize = textData.fontSize

  innerText.style.whiteSpace = 'pre-wrap'
  innerText.style.wordBreak = 'break-word'

  innerText.style.overflowWrap = 'break-word'
  innerText.style.cursor = 'text'

  innerText.style.width = '100%'
  innerText.style.height = '100%'

  innerText.addEventListener('input', () =>
  {
    if (storeStation.element.isResizingTheElement) return

    const cloneNode = innerText.cloneNode(true)
    const computed = window.getComputedStyle(innerText)

    cloneNode.style.fontSize = computed.fontSize
    cloneNode.style.fontFamily = computed.fontFamily

    cloneNode.style.lineHeight = computed.lineHeight
    cloneNode.style.letterSpacing = computed.letterSpacing

    cloneNode.style.padding = computed.padding
    cloneNode.style.boxSizing = computed.boxSizing

    cloneNode.style.border = computed.border
    cloneNode.style.whiteSpace = computed.whiteSpace

    cloneNode.style.wordBreak = computed.wordBreak
    cloneNode.style.overflowWrap = computed.overflowWrap

    cloneNode.style.width = textElement.offsetWidth + 'px'
    cloneNode.style.height = 'auto'

    cloneNode.style.position = 'absolute'
    cloneNode.style.visibility = 'hidden'

    document.body.appendChild(cloneNode)

    const newWidth = cloneNode.offsetWidth
    const newHeight = cloneNode.offsetHeight

    cloneNode.remove()

    textElement.style.width = newWidth + 'px'
    textElement.style.height = newHeight + 'px'

    applyTransform(textElement)

    saveTheElementState()
    pushTheElementToMemory()
  })

  if (textElement.dataset.shapeType === 'text') innerText.style.color = textData.fontColor
  else innerText.style.backgroundColor = textData.fontColor

  textElement.dataset.lineHeight = getComputedStyle(innerText).lineHeight

  textElement.appendChild(innerText)
  textElement.insertAdjacentHTML('beforeend', 
    `
      <div class="rotate-handle"></div>

      <div class="resize-handle top-left"></div>
      <div class="resize-handle top-right"></div>

      <div class="resize-handle bottom-left"></div>
      <div class="resize-handle bottom-right"></div>

      <div class="resize-handle top"></div>
      <div class="resize-handle bottom"></div>
      
      <div class="resize-handle left"></div>
      <div class="resize-handle right"></div>
    `
  )

  updateCursorsResizePosition(textElement, Number(textData.rotationAngle) || 0)
  return textElement
}