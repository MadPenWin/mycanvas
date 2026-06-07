import { domStation } from '../../MyCanvasStation/domStation.js'

import { shapeSelector } from '../../ElementFunction/elementSelector.js'
import { textSelector } from '../../ElementFunction/elementSelector.js'
import { imageSelector } from '../../ElementFunction/elementSelector.js'

import { normalizeToRGBColor } from '../Utilities/colorUtilities.js'


export function collectShapes(scaleX, scaleY)
{
  const theCanvasDesignSurface = domStation.theCanvasDesignSurface
  const shapesArray = []

  const shapeElements = theCanvasDesignSurface.querySelectorAll(shapeSelector())
  shapeElements.forEach(element =>
  {
    const translateX = Number(element.dataset.translateX) || 0
    const translateY = Number(element.dataset.translateY) || 0

    const width = element.offsetWidth
    const height = element.offsetHeight

    const innerShape = element.querySelector('.shape-inner')
    const backgroundColor = innerShape ? getComputedStyle(innerShape).backgroundColor : '#000000'

    const rotation = Number(element.dataset.rotationAngle) || 0

    shapesArray.push({
      type: element.classList.contains('shape-circle') ? 'circle' : element.classList.contains('shape-triangle') ? 'triangle' : 'square',

      x: translateX * scaleX,
      y: translateY * scaleY,

      width: width * scaleX,
      height: height * scaleY,

      rotation,
      fill: normalizeToRGBColor(backgroundColor)
    })
  })

  return shapesArray
}


export function collectTexts(scaleX, scaleY)
{
  const theCanvasDesignSurface = domStation.theCanvasDesignSurface
  const textsArray = []

  const textElements = theCanvasDesignSurface.querySelectorAll(textSelector())
  textElements.forEach(element =>
  {
    const innerText = element.querySelector('.text-inner')
    if (!innerText)
    {
      return
    }

    const translateX = Number(element.dataset.translateX) || 0
    const translateY = Number(element.dataset.translateY) || 0

    const width = element.offsetWidth
    const height = element.offsetHeight

    const rotation = Number(element.dataset.rotationAngle) || 0
    const style = getComputedStyle(innerText)

    textsArray.push({
      x: translateX * scaleX,
      y: translateY * scaleY,

      width: width * scaleX,
      height: height * scaleY,

      rotation,

      color: normalizeToRGBColor(style.color),
      fontSize: parseFloat(style.fontSize) * scaleX,

      fontFamily: style.fontFamily,
      text: innerText.textContent || ''
    })
  })

  return textsArray
}


export function collectImages(scaleX, scaleY)
{
  const theCanvasDesignSurface = domStation.theCanvasDesignSurface
  const imagesArray = []

  const imageElements = theCanvasDesignSurface.querySelectorAll(imageSelector())
  imageElements.forEach(element =>
  {
    const imageInner = element.querySelector('.image-inner')

    if (!imageInner)
    {
      return
    }

    const translateX = Number(element.dataset.translateX) || 0
    const translateY = Number(element.dataset.translateY) || 0

    const width = element.offsetWidth
    const height = element.offsetHeight

    const rotation = Number(element.dataset.rotationAngle) || 0

    imagesArray.push({
      x: translateX * scaleX,
      y: translateY * scaleY,

      width: width * scaleX,
      height: height * scaleY,

      rotation,

      source: imageInner.src
    })
  })

  return imagesArray
}