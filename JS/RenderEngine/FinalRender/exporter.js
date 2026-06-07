import { storeStation } from '../../MyCanvasStation/storeStation.js'
import { setupRenderSurface } from './setupRenderSurface.js'

import { collectShapes } from './elementCollector.js'
import { collectTexts } from './elementCollector.js'
import { collectImages } from './elementCollector.js'

import { renderAllShapes } from './shapeRenderer.js'
import { renderAllTexts } from './textRenderer.js'
import { renderAllImages } from './imageRenderer.js'


export function exportCanvasImage()
{
  const renderWidth = 1920
  const renderHeight = 1080

  const { canvas, context, scaleX, scaleY, backgroundColor } = setupRenderSurface(renderWidth, renderHeight)

  const shapesArray = collectShapes(scaleX, scaleY)
  const textsArray = collectTexts(scaleX, scaleY)
  const imagesArray = collectImages(scaleX, scaleY)

  renderAllShapes(context, shapesArray, backgroundColor)
  renderAllTexts(context, textsArray)
  renderAllImages(context, imagesArray)

  const downloadLink = document.createElement('a')
  downloadLink.download = `${ storeStation.project.name }.png`

  downloadLink.href = canvas.toDataURL('image/png')
  downloadLink.click()
}