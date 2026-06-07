import { setupRenderSurface } from './FinalRender/setupRenderSurface.js'
import { collectShapes, collectTexts, collectImages } from './FinalRender/elementCollector.js'

import { renderAllShapes } from './FinalRender/shapeRenderer.js'
import { renderAllTexts } from './FinalRender/textRenderer.js'
import { renderAllImages } from './FinalRender/imageRenderer.js'

import { exportCanvasImage } from './FinalRender/exporter.js'


export function renderEngine()
{
  const { canvas, context, scaleX, scaleY, backgroundColor } = setupRenderSurface(1920, 1080)

  const allShapes = collectShapes(scaleX, scaleY)
  const allTexts = collectTexts(scaleX, scaleY)
  const allImages = collectImages(scaleX, scaleY)

  renderAllShapes(context, allShapes, backgroundColor)
  renderAllTexts(context, allTexts)
  renderAllImages(context, allImages)

  exportCanvasImage(canvas)
}