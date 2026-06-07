import { domStation } from '../../MyCanvasStation/domStation.js'
import { addImage } from './addImage.js'


domStation.uploadImageContainer.addEventListener('click', event =>
{
  const imageElement = event.target.closest('.upload-image-preview')
  if (!imageElement) return

  addImage(imageElement.src)
})