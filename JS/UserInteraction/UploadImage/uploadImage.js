import { domStation } from '../../MyCanvasStation/domStation.js'
import { saveUploadedImages } from './saveUploadedImages.js'


const uploadImageInterface = document.querySelector('.upload-image-interface')
uploadImageInterface.addEventListener('click', () => { domStation.uploadImageButton.click() })


domStation.uploadImageButton.addEventListener('change', async (event) => 
{
  const file = event.target.files[0]
  if (!file) return

  const fileReader = new FileReader()
  fileReader.onload = () =>
  {
    const imageSource = fileReader.result
    const imageElement = document.createElement('img')

    imageElement.src = imageSource
    imageElement.classList.add('upload-image-preview')

    domStation.uploadImageContainer.appendChild(imageElement)
    saveUploadedImages(imageSource)
  }

  fileReader.readAsDataURL(file)
})