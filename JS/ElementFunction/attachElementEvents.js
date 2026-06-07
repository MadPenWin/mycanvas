import { domStation } from '../MyCanvasStation/domStation.js'
import { storeStation } from '../MyCanvasStation/storeStation.js'

import { saveTheElementState } from '../SaveState/SaveTheElementState/saveTheElementState.js'
import { pushTheElementToMemory } from '../SaveState/SaveTheElementState/pushTheElementToMemory.js'

import { applyTransform } from './applyTransform.js'
import { updateCursorsResizePosition } from './updateCursorsResizePosition.js'
import { snapEngine } from '../SnapEngine/snapEngine.js'

import { addSelection } from '../SelectionBehavior/addSelection.js'
import { clearSelection } from '../SelectionBehavior/clearSelection.js'

import { convertRGBToHexadecimal } from '../ColorPickerEngine/ColorPickerConvert/redGreenBlueToHexadecimal.js'
import { setColorFromHexadecimal } from '../ColorPickerEngine/ColorPickerFunction/setColorFromHexadecimal.js'

import { colorPickerEngine } from '../ColorPickerEngine/colorPickerEngine.js'
import { colorPickerDom } from '../ColorPickerEngine/ColorPickerDom/colorPickerDom.js'


document.addEventListener('keydown', event => { if (event.key === 'Control') storeStation.element.isMultiSelectingElements = true })
document.addEventListener('keyup', event => { if (event.key === 'Control') storeStation.element.isMultiSelectingElements = false })


export function attachElementEvents(theElement)
{
  theElement.addEventListener('mousedown', event => 
  {
    event.stopPropagation()

    if (storeStation.element.isEditingText)
    {
      const clickedInsideTextInner = event.target.closest('.text-inner')
      if (!clickedInsideTextInner)
      {
        const textElement = storeStation.element.theElement
        const innerText = textElement?.querySelector('.text-inner')

        if (innerText)
        {
          innerText.contentEditable = false
          innerText.blur()
        }

        storeStation.element.isEditingText = false
        clearSelection()
      }
    }

    if (event.target.classList.contains('rotate-handle') || event.target.classList.contains('resize-handle')) return

    storeStation.canvas.isSelectingTheCanvas = false
    storeStation.element.isSelectingTheElement = true

    domStation.theCanvasDesignSurface.classList.remove('the-canvas-design-surface-selected')

    const alreadySelectedTheElement = storeStation.memory.elementsSelectedArray.includes(theElement)
    if (storeStation.element.isMultiSelectingElements)
    {
      if (!alreadySelectedTheElement) addSelection(theElement)
    }

    else
    {
      if (!alreadySelectedTheElement)
      {
        clearSelection()
        addSelection(theElement)
      }
    }

    storeStation.element.theElement = theElement
    
    const innerElement = theElement.querySelector('.shape-inner') || theElement.querySelector('.text-inner')  
    if (innerElement instanceof Element)
    {
      const computedStyle = window.getComputedStyle(innerElement)
      const isShape = innerElement.classList.contains('shape-inner')

      const innerElementColor = isShape ? computedStyle.backgroundColor : computedStyle.color
      const hexadecimalColor = convertRGBToHexadecimal(innerElementColor)
      
      setColorFromHexadecimal(colorPickerDom, hexadecimalColor)

      colorPickerDom.targetElement = innerElement
      colorPickerDom.targetIsText = innerElement.classList.contains('text-inner')
    }

    console.log('Selected The Element.')
  })

  const dragTheElement = theElement
  dragTheElement.addEventListener('mousedown', event => 
  {
    event.stopPropagation()
    if 
    (
      event.target.classList.contains('rotate-handle') || 
      event.target.classList.contains('resize-handle') || 

      storeStation.element.isEditingText || 
      storeStation.element.isRotatingTheElement || 
      storeStation.element.isResizingTheElement
    )
    {
      return
    }

    storeStation.element.theElement = theElement
    storeStation.element.isDraggingTheElement = true

    const theCanvasRectangle = domStation.theCanvasDesignSurface.getBoundingClientRect()
    const theCanvasScale = storeStation.canvas.theCanvasScale

    const currentTranslateX = Number(theElement.dataset.translateX) || 0
    const currentTranslateY = Number(theElement.dataset.translateY) || 0

    const mouseX = (event.clientX - theCanvasRectangle.left) / theCanvasScale
    const mouseY = (event.clientY - theCanvasRectangle.top) / theCanvasScale

    storeStation.calculation.offsetX = mouseX - currentTranslateX
    storeStation.calculation.offsetY = mouseY - currentTranslateY

    document.body.style.userSelect = 'none'
  })

  const rotateTheElement = theElement.querySelector('.rotate-handle')
  if (rotateTheElement)
  {
    rotateTheElement.addEventListener('mousedown', event => 
    {
      event.preventDefault()
      event.stopPropagation()

      storeStation.canvas.isSelectingTheCanvas = false
      
      storeStation.element.isSelectingTheElement = true
      storeStation.element.isRotatingTheElement = true

      const alreadySelectedElement = storeStation.memory.elementsSelectedArray.includes(theElement)
      if (!alreadySelectedElement)
      {
        clearSelection()
        addSelection(theElement)
      }

      const theElementClientRectangle = theElement.getBoundingClientRect()
      storeStation.calculation.rotationCenterX = theElementClientRectangle.left + (theElementClientRectangle.width / 2)
      storeStation.calculation.rotationCenterY = theElementClientRectangle.top + (theElementClientRectangle.height / 2)

      storeStation.calculation.mouseStartRotationAngle = Math.atan2(event.clientY - storeStation.calculation.rotationCenterY, event.clientX - storeStation.calculation.rotationCenterX)
      storeStation.calculation.theElementStartRotationAngle = Number(theElement.dataset.rotationAngle) || 0
    })
  }

  const resizeTheElement = theElement.querySelectorAll('.resize-handle')
  resizeTheElement.forEach(resizeHandle => 
  {
    resizeHandle.addEventListener('mousedown', event => 
    {
      event.preventDefault()
      event.stopPropagation()

      storeStation.canvas.isSelectingTheCanvas = false

      storeStation.element.isSelectingTheElement = true
      storeStation.element.isResizingTheElement = true

      if (!storeStation.element.isMultiSelectingElements)
      {
        if (!storeStation.memory.elementsSelectedArray.includes(theElement))
        {
          clearSelection()
          addSelection(theElement)
        }
      }

      storeStation.calculation.resizeDirection = resizeHandle.classList[1]

      storeStation.calculation.startWidth = Number.parseFloat(theElement.style.width) || theElement.offsetWidth
      storeStation.calculation.startHeight = Number.parseFloat(theElement.style.height) || theElement.offsetHeight

      storeStation.calculation.startTranslateX = Number(theElement.dataset.translateX) || 0
      storeStation.calculation.startTranslateY = Number(theElement.dataset.translateY) || 0

      storeStation.calculation.resizeStartRotationAngle = Number(theElement.dataset.rotationAngle) || 0

      const textInner = theElement.querySelector('.text-inner')
      storeStation.calculation.startInnerTextWidth = textInner instanceof Element ? textInner.offsetWidth : 0
      storeStation.calculation.startFontSize = textInner instanceof Element ? Number.parseFloat(window.getComputedStyle(textInner).fontSize) : 0

      const rotationInRadian = storeStation.calculation.resizeStartRotationAngle * Math.PI / 180
      const cosine = Math.cos(rotationInRadian)
      const sine = Math.sin(rotationInRadian)

      const startAnchorLocalPoint = getOppositeAnchorLocalPoint(storeStation.calculation.resizeDirection, storeStation.calculation.startWidth, storeStation.calculation.startHeight)

      const beginElementCenterX = storeStation.calculation.startWidth / 2
      const beginElementCenterY = storeStation.calculation.startHeight / 2

      const startAnchorVectorX = startAnchorLocalPoint.x - beginElementCenterX
      const startAnchorVectorY = startAnchorLocalPoint.y - beginElementCenterY

      storeStation.calculation.resizeAnchorWorldX = storeStation.calculation.startTranslateX + beginElementCenterX + (startAnchorVectorX * cosine) - (startAnchorVectorY * sine)
      storeStation.calculation.resizeAnchorWorldY = storeStation.calculation.startTranslateY + beginElementCenterY + (startAnchorVectorX * sine) + (startAnchorVectorY * cosine)
      
      storeStation.calculation.startMouseX = event.clientX
      storeStation.calculation.startMouseY = event.clientY
    })
  })
}

document.addEventListener('mousemove', event =>
{
  const theCanvasScale = storeStation.canvas.theCanvasScale
  const theElement = storeStation.element.theElement

  if (!theElement) return
  if (storeStation.element.isDraggingTheElement)
  {
    if (storeStation.element.isEditingText) return

    const theCanvasRectangle = domStation.theCanvasDesignSurface.getBoundingClientRect()

    const mouseX = (event.clientX - theCanvasRectangle.left) / theCanvasScale
    const mouseY = (event.clientY - theCanvasRectangle.top) / theCanvasScale

    const newTranslateX = mouseX - storeStation.calculation.offsetX
    const newTranslateY = mouseY - storeStation.calculation.offsetY

    const allElements = [...domStation.theCanvasDesignSurface.children]
    const elementSnapResult = snapEngine.findSnapPosition(
      theElement,
      allElements,

      theCanvasRectangle,
      {
        left: newTranslateX,
        top: newTranslateY,

        width: Number.parseFloat(theElement.style.width) || theElement.offsetWidth,
        height: Number.parseFloat(theElement.style.height) || theElement.offsetHeight
      },

      null
    )

    const moveDeltaX = elementSnapResult.left - (Number(theElement.dataset.translateX) || 0)
    const moveDeltaY = elementSnapResult.top - (Number(theElement.dataset.translateY) || 0)

    storeStation.memory.elementsSelectedArray.forEach(element => 
    {
      const currentX = Number(element.dataset.translateX) || 0
      const currentY = Number(element.dataset.translateY) || 0

      element.dataset.translateX = currentX + moveDeltaX
      element.dataset.translateY = currentY + moveDeltaY

      applyTransform(element)
    })

    snapEngine.renderGuideLines()
  }

  if (storeStation.element.isRotatingTheElement)
  {
    const angleInRadian = Math.atan2(event.clientY - storeStation.calculation.rotationCenterY, event.clientX - storeStation.calculation.rotationCenterX)

    const deltaAngle = angleInRadian - storeStation.calculation.mouseStartRotationAngle
    const newRotationAngle = storeStation.calculation.theElementStartRotationAngle + (deltaAngle * 180 / Math.PI)

    theElement.dataset.rotationAngle = newRotationAngle
    applyTransform(theElement)

    updateCursorsResizePosition(theElement, newRotationAngle)
  }

  if (storeStation.element.isResizingTheElement)
  {
    const rotationInDegree = storeStation.calculation.resizeStartRotationAngle || 0
    const rotationInRadian = rotationInDegree * Math.PI / 180

    const cosineRadian = Math.cos(rotationInRadian)
    const sineRadian = Math.sin(rotationInRadian)

    const worldDeltaX = (event.clientX - storeStation.calculation.startMouseX) / storeStation.canvas.theCanvasScale
    const worldDeltaY = (event.clientY - storeStation.calculation.startMouseY) / storeStation.canvas.theCanvasScale

    const localDeltaX = worldDeltaX * cosineRadian + (worldDeltaY * sineRadian)
    const localDeltaY = -worldDeltaX * sineRadian + (worldDeltaY * cosineRadian)

    const minimumSize = 10

    let deltaWidth = 0
    let deltaHeight = 0

    const resizeDirection = storeStation.calculation.resizeDirection
    const isCornerHandle = resizeDirection.includes('top-left') || resizeDirection.includes('top-right') || resizeDirection.includes('bottom-left') || resizeDirection.includes('bottom-right')
    
    if (resizeDirection.includes('left'))
    {
      deltaWidth = -localDeltaX
      if ((storeStation.calculation.startWidth + deltaWidth) < minimumSize) deltaWidth = minimumSize - storeStation.calculation.startWidth
    }

    if (resizeDirection.includes('right'))
    {
      deltaWidth = localDeltaX
      if ((storeStation.calculation.startWidth + deltaWidth) < minimumSize) deltaWidth = minimumSize - storeStation.calculation.startWidth
    }

    if (resizeDirection.includes('top'))
    {
      deltaHeight = -localDeltaY
      if ((storeStation.calculation.startHeight + deltaHeight) < minimumSize) deltaHeight = minimumSize - storeStation.calculation.startHeight
    }

    if (resizeDirection.includes('bottom'))
    {
      deltaHeight = localDeltaY
      if ((storeStation.calculation.startHeight + deltaHeight) < minimumSize) deltaHeight = minimumSize - storeStation.calculation.startHeight
    }

    const finalWidth = storeStation.calculation.startWidth + deltaWidth
    const finalHeight = storeStation.calculation.startHeight + deltaHeight

    const startAnchorLocalPoint = getOppositeAnchorLocalPoint(resizeDirection, storeStation.calculation.startWidth, storeStation.calculation.startHeight)
    const finalAnchorLocalPoint = getOppositeAnchorLocalPoint(resizeDirection, finalWidth, finalHeight)

    const beginElementCenterX = storeStation.calculation.startWidth / 2
    const beginElementCenterY = storeStation.calculation.startHeight / 2

    const afterElementCenterX = finalWidth / 2
    const afterElementCenterY = finalHeight / 2

    // Caculate Anchor Vector Relative To The Center=)
    const startAnchorVectorX = startAnchorLocalPoint.x - beginElementCenterX
    const startAnchorVectorY = startAnchorLocalPoint.y - beginElementCenterY

    const finalAnchorVectorX = finalAnchorLocalPoint.x - afterElementCenterX
    const finalAnchorVectorY = finalAnchorLocalPoint.y - afterElementCenterY

    const newTranslateX = storeStation.calculation.resizeAnchorWorldX - afterElementCenterX - (finalAnchorVectorX * cosineRadian) + (finalAnchorVectorY * sineRadian)
    const newTranslateY = storeStation.calculation.resizeAnchorWorldY - afterElementCenterY - (finalAnchorVectorX * sineRadian) - (finalAnchorVectorY * cosineRadian)

    const canvasRectangle = domStation.theCanvasDesignSurface.getBoundingClientRect()
    const allShapeElements = [...domStation.theCanvasDesignSurface.children]

    const snapResult = snapEngine.findSnapPosition(
      theElement,
      allShapeElements,

      canvasRectangle,
      {
        left: newTranslateX,
        top: newTranslateY,

        width: finalWidth,
        height: finalHeight
      },

      resizeDirection
    )

    let snappedWidth = finalWidth
    let snappedHeight = finalHeight

    if (resizeDirection.includes('right')) snappedWidth = snapResult.right - snapResult.left
    if (resizeDirection.includes('left')) snappedWidth = newTranslateX + finalWidth - snapResult.left
    if (resizeDirection.includes('bottom')) snappedHeight = snapResult.bottom - snapResult.top
    if (resizeDirection.includes('top')) snappedHeight = newTranslateY + finalHeight - snapResult.top

    if (theElement.dataset.shapeType === 'text' || theElement.dataset.shapeType === 'image')
    {
      const innerElement = theElement.querySelector('.text-inner, .image-inner')
      const isLeftAndRightHandle = resizeDirection === 'left' || resizeDirection === 'right'

      let actualWidth = snappedWidth
      let actualHeight = snappedHeight

      if (isCornerHandle)
      {
        const widthScale = snappedWidth / storeStation.calculation.startWidth
        const heightScale = snappedHeight / storeStation.calculation.startHeight

        const scale = Math.max(widthScale, heightScale)
        const newFontSize = storeStation.calculation.startFontSize * scale

        innerElement.style.fontSize = `${ newFontSize }px`
        innerElement.style.whiteSpace = 'pre-wrap'

        innerElement.style.width = '100%'
        innerElement.style.height = '100%'

        actualWidth = storeStation.calculation.startWidth * scale
        actualHeight = storeStation.calculation.startHeight * scale
      }

      else if (isLeftAndRightHandle)
      {
        innerElement.style.width = '100%'
        innerElement.style.height = 'auto'

        innerElement.style.whiteSpace = 'pre-wrap'

        theElement.style.width = `${ snappedWidth }px`
        void innerElement.offsetWidth

        actualWidth = snappedWidth
        actualHeight = innerElement.offsetHeight
      }

      const actualAnchorLocalPoint = getOppositeAnchorLocalPoint(resizeDirection, actualWidth, actualHeight)

      const actualCenterX = actualWidth / 2
      const actualCenterY = actualHeight / 2

      const actualAnchorVectorX = actualAnchorLocalPoint.x - actualCenterX
      const actualAnchorVectorY = actualAnchorLocalPoint.y - actualCenterY

      const correctedTranslateX = storeStation.calculation.resizeAnchorWorldX - actualCenterX - (actualAnchorVectorX * cosineRadian) + (actualAnchorVectorY * sineRadian)
      const correctedTranslateY = storeStation.calculation.resizeAnchorWorldY - actualCenterY - (actualAnchorVectorX * sineRadian) - (actualAnchorVectorY * cosineRadian)

      theElement.style.width = `${ actualWidth }px`
      theElement.style.height = `${ actualHeight }px`

      theElement.dataset.translateX = correctedTranslateX
      theElement.dataset.translateY = correctedTranslateY

      applyTransform(theElement)
    }

    if (theElement.dataset.shapeType !== 'text' && theElement.dataset.shapeType !== 'image')
    {
      theElement.style.width = `${ snappedWidth }px`
      theElement.style.height = `${ snappedHeight }px`

      const snapDeltaX = snapResult.left - newTranslateX
      const snapDeltaY = snapResult.top - newTranslateY

      theElement.dataset.translateX = newTranslateX + snapDeltaX
      theElement.dataset.translateY = newTranslateY + snapDeltaY

      applyTransform(theElement)
    }
  }
})


document.addEventListener('mouseup', () =>
{
  const hasChanged = storeStation.element.isDraggingTheElement || storeStation.element.isRotatingTheElement || storeStation.element.isResizingTheElement
  if (hasChanged && !storeStation.memory.isRestoringState)
  {
    requestAnimationFrame(() =>
    {
      saveTheElementState()
      pushTheElementToMemory()
    })
  }

  storeStation.element.isDraggingTheElement = false
  storeStation.element.isRotatingTheElement = false
  storeStation.element.isResizingTheElement = false

  document.body.style.userSelect = ''
})


function getOppositeAnchorLocalPoint(resizeDirection, width, height)
{
  let anchorX = width / 2
  let anchorY = height / 2

  if (resizeDirection.includes('left')) anchorX = width
  else if (resizeDirection.includes('right')) anchorX = 0

  if (resizeDirection.includes('top')) anchorY = height
  else if (resizeDirection.includes('bottom')) anchorY = 0

  return { x: anchorX, y: anchorY }
}