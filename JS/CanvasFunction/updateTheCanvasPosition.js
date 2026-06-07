import { domStation } from '../MyCanvasStation/domStation.js'
import { storeStation } from '../MyCanvasStation/storeStation.js'


export function updateTheCanvasPosition()
{
  const theCanvasScaleValue = storeStation.canvas.theCanvasScale
  const theCanvasScaleTransformString = `scale(${ theCanvasScaleValue })`

  const theCanvasEditorBarWidth = domStation.theCanvasEditorBar.clientWidth
  const theCanvasEditorBarHeight = domStation.theCanvasEditorBar.clientHeight

  const theCanvasDesignSurface = domStation.theCanvasDesignWrapper.querySelector('.the-canvas-design-surface')

  const theCanvasDesignSurfaceBaseWidth = theCanvasDesignSurface.offsetWidth
  const theCanvasDesignSurfaceBaseHeight = theCanvasDesignSurface.offsetHeight

  const theCanvasDesignSurfaceScaledWidth = theCanvasDesignSurfaceBaseWidth * theCanvasScaleValue
  const theCanvasDesignSurfaceScaledHeight = theCanvasDesignSurfaceBaseHeight * theCanvasScaleValue

  domStation.theCanvasScrollContainer.style.width = `${ theCanvasDesignSurfaceScaledWidth }px`
  domStation.theCanvasScrollContainer.style.height = `${ theCanvasDesignSurfaceScaledHeight }px`

  const isFitsHorizontal = theCanvasDesignSurfaceScaledWidth <= theCanvasEditorBarWidth
  const isFitsVertical = theCanvasDesignSurfaceScaledHeight <= theCanvasEditorBarHeight

  const isFitsInside = isFitsHorizontal && isFitsVertical
  if (isFitsInside)
  {
    domStation.theCanvasDesignWrapper.style.top = '50%'
    domStation.theCanvasDesignWrapper.style.left = '50%'

    domStation.theCanvasDesignWrapper.style.transform = `translate(-50%, -50%) ${ theCanvasScaleTransformString }`
    domStation.theCanvasDesignWrapper.style.transformOrigin = 'center center'
  }

  else
  {
    domStation.theCanvasDesignWrapper.style.top = '0px'
    domStation.theCanvasDesignWrapper.style.left = '0px'

    domStation.theCanvasDesignWrapper.style.transform = theCanvasScaleTransformString
    domStation.theCanvasDesignWrapper.style.transformOrigin = 'top left'

    storeStation.canvas.theCanvasEditorBarScrollLeft = domStation.theCanvasEditorBar.scrollLeft
    storeStation.canvas.theCanvasEditorBarScrollTop = domStation.theCanvasEditorBar.scrollTop
  }
}