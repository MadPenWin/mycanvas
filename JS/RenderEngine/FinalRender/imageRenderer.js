import { renderImage } from '../Renderers/renderImage.js'


export function renderAllImages(context, imagesArray)
{
  imagesArray.forEach(imageObject => { renderImage(context, imageObject) })
}