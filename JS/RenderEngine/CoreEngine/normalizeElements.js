export function normalizeElements(element)
{
  if (element.classList.contains('text'))
  {
    return normalizeText(element)
  }

  if (element.classList.contains('image'))
  {
    return normalizeImage(element)
  }

  return normalizeShape(element)
}


function normalizeShape(element)
{
  const innerShape = element.querySelector('.shape-inner')
  return {
    type: element.classList.contains('shape-circle') ? 'circle' : element.classList.contains('shape-triangle') ? 'triangle' : 'square',

    x: Number(element.dataset.translateX) || 0,
    y: Number(element.dataset.translateY) || 0,

    width: element.offsetWidth,
    height: element.offsetHeight,

    rotation: Number(element.dataset.rotationAngle) || 0,
    fill: innerShape ? getComputedStyle(innerShape).backgroundColor : '#000000'
  }
}


function normalizeText(element)
{
  const innerText = element.querySelector('.text-inner')
  const textStyle = getComputedStyle(innerText)

  return {
    type: 'text',

    x: Number(element.dataset.translateX) || 0,
    y: Number(element.dataset.translateY) || 0,

    width: element.offsetWidth,
    height: element.offsetHeight,

    rotation: Number(element.dataset.rotationAngle) || 0,

    fontSize: parseFloat(textStyle.fontSize),
    fontFamily: textStyle.fontFamily,

    color: textStyle.color,
    text: innerText.textContent || ''
  }
}


function normalizeImage(element)
{
  const innerImage = element.querySelector('.image-inner')
  return {
    type: 'image',

    x: Number(element.dataset.translateX) || 0,
    y: Number(element.dataset.translateY) || 0,

    width: element.offsetWidth,
    height: element.offsetHeight,

    rotation: Number(element.dataset.rotationAngle) || 0,
    source: image?.src || ''
  }
}