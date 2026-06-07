import { domStation } from '../../MyCanvasStation/domStation.js'
import { storeStation } from '../../MyCanvasStation/storeStation.js'

import { textRegistry } from '../../ElementRegistry/textRegistry.js'

import { attachElementEvents } from '../../ElementFunction/attachElementEvents.js'
import { applyTransform } from '../../ElementFunction/applyTransform.js'

import { enterEditTextMode } from '../../ElementFunction/enterEditTextMode.js'

import { clearSelection } from '../../SelectionBehavior/clearSelection.js'
import { addSelection } from '../../SelectionBehavior/addSelection.js'

import { saveTheElementState } from '../../SaveState/SaveTheElementState/saveTheElementState.js'
import { pushTheElementToMemory } from '../../SaveState/SaveTheElementState/pushTheElementToMemory.js'


export function addText(textType = 'text')
{
  const textTyped = textRegistry[textType]
  if (!textTyped)
  {
    console.error('Text Type', `${ textType }`, 'Not Found.')
    return
  }

  const theText = document.createElement('div')
  theText.classList.add(textTyped.className)

  theText.dataset.id = crypto.randomUUID()

  theText.dataset.shapeType = 'text'
  theText.dataset.textType = textType

  theText.dataset.translateX = 0
  theText.dataset.translateY = 0

  theText.style.width = textTyped.defaultWidth + 'px'
  theText.style.height = textTyped.defaultHeight + 'px'

  theText.dataset.rotationAngle = 0
  theText.style.display = 'flex'

  theText.addEventListener('mousedown', event => 
  { 
    if (storeStation.element.isEditingText) return

    const alreadySelected = storeStation.element.theElement === theText
    if (!alreadySelected)
    {
      clearSelection()
      addSelection(theText)

      storeStation.element.theElement = theText
      return
    }

    enterEditTextMode(theText) 
  })

  applyTransform(theText)

  const innerText = document.createElement('div')
  innerText.classList.add('text-inner')

  innerText.contentEditable = true
  innerText.spellcheck = false

  innerText.textContent = textTyped.defaultContent

  innerText.style.width = '100%'
  innerText.style.height = '100%'

  innerText.style.fontSize = textTyped.defaultFontSize
  innerText.style.fontFamily = textTyped.defaultFontFamily

  innerText.style.color = textTyped.defaultFontColor

  innerText.style.whiteSpace = 'pre-wrap'
  innerText.style.wordBreak = 'break-word'

  innerText.style.overflowWrap = 'break-word'
  innerText.style.cursor = 'text'

  innerText.addEventListener('input', () =>
  {
    if (storeStation.element.isResizingTheElement) return

    const cloneNode = innerText.cloneNode(true)
    cloneNode.style.overflowWrap = 'break-word'

    cloneNode.style.position = 'absolute'
    cloneNode.style.visibility = 'hidden'

    cloneNode.style.height = 'auto'
    cloneNode.style.width = theText.offsetWidth + 'px'

    cloneNode.style.whiteSpace = 'pre-wrap'
    cloneNode.style.wordBreak = 'break-word'

    document.body.appendChild(cloneNode)

    const newWidth = cloneNode.offsetWidth
    const newHeight = cloneNode.offsetHeight

    cloneNode.remove()

    theText.style.width = newWidth + 'px'
    theText.style.height = newHeight + 'px'

    applyTransform(theText)
    
    saveTheElementState()
    pushTheElementToMemory()
  })

  theText.dataset.lineHeight = getComputedStyle(innerText).lineHeight
  theText.appendChild(innerText)
  
  theText.insertAdjacentHTML('beforeend', 
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

  clearSelection()
  addSelection(theText)

  applyTransform(theText)
  attachElementEvents(theText)

  domStation.theCanvasDesignSurface.appendChild(theText)
  storeStation.canvas.isSelectingTheCanvas = false

  storeStation.element.isSelectingTheElement = true
  storeStation.element.theElement = theText

  console.log('Add New Text', theText)
}