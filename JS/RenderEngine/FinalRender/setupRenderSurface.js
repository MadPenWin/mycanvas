import { domStation } from '../../MyCanvasStation/domStation.js'


export function setupRenderSurface(renderWidth, renderHeight)
{
  const theCanvasDesignSurface = domStation.theCanvasDesignSurface

  const canvas = document.createElement('canvas')
  canvas.width = renderWidth
  canvas.height = renderHeight

  const context = canvas.getContext('2d')
  const backgroundColor = getComputedStyle(theCanvasDesignSurface).backgroundColor

  context.fillStyle = backgroundColor
  context.fillRect(0, 0, renderWidth, renderHeight)

  const scaleX = renderWidth / theCanvasDesignSurface.offsetWidth
  const scaleY = renderHeight / theCanvasDesignSurface.offsetHeight

  return { canvas, context, scaleX, scaleY, backgroundColor: backgroundColor }
}