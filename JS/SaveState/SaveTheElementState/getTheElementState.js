import { domStation } from '../../MyCanvasStation/domStation.js'


export function getTheElementState()
{
  const allElements = [...domStation.theCanvasDesignSurface.children]

  const shapeElements = allElements.filter(element =>
  {
    return (element.dataset.shapeType !== 'text' && element.dataset.shapeType !== 'image')
  })

  const textElements = allElements.filter(element =>
  {
    return element.dataset.shapeType === 'text'
  })

  const imageElements = allElements.filter(element =>
  {
    return element.dataset.shapeType === 'image'
  })

  return {
    id: 'theElementState',

    shapes: shapeElements.map(element => 
    {
      const shapeInner = element.querySelector('.shape-inner')
      return {
        id: element.dataset.id,
        shapeType: element.dataset.shapeType,

        translateX: Number(element.dataset.translateX) || 0,
        translateY: Number(element.dataset.translateY) || 0,

        width: element.offsetWidth,
        height: element.offsetHeight,

        rotationAngle: Number(element.dataset.rotationAngle) || 0,
        backgroundColor: shapeInner ? window.getComputedStyle(shapeInner).backgroundColor : null
      }
    }),

    texts: textElements.map(element =>
    {
      const textInner = element.querySelector('.text-inner')
      return {
        id: element.dataset.id,
        textType: element.dataset.textType,

        translateX: Number(element.dataset.translateX) || 0,
        translateY: Number(element.dataset.translateY) || 0,

        width: element.offsetWidth,
        height: element.offsetHeight,

        rotationAngle: Number(element.dataset.rotationAngle) || 0,

        fontSize: textInner ? textInner.style.fontSize : null,
        fontFamily: textInner ? textInner.style.fontFamily : null,

        fontColor: textInner ? textInner.style.color : null,
        textContent: textInner ? textInner.textContent : null,
      }
    }),

    images: imageElements.map(element =>
    {
      const imageInner = element.querySelector('.image-inner')
      return {
        id: element.dataset.id,
        shapeType: 'image',

        source: imageInner instanceof HTMLImageElement ? imageInner.src : null,

        translateX: Number(element.dataset.translateX) || 0,
        translateY: Number(element.dataset.translateY) || 0,

        width: element.offsetWidth,
        height: element.offsetHeight,

        rotationAngle: Number(element.dataset.rotationAngle) || 0
      }
    }),
  }
}