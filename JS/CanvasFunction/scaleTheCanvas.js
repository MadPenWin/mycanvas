import { domStation } from '../MyCanvasStation/domStation.js'
import { storeStation } from '../MyCanvasStation/storeStation.js'

import { updateTheCanvasPosition } from './updateTheCanvasPosition.js'
import { saveTheCanvasState } from '../SaveState/SaveTheCanvasState/saveTheCanvasState.js'


domStation.theCanvasEditorBar.addEventListener('wheel', event => 
{
  event.preventDefault()

  if (!event.ctrlKey) return

  const scrollWheelZoomSpeed = 0.0003
  const theCanvasScaleDelta = -event.deltaY * scrollWheelZoomSpeed

  let newTheCanvasScale = storeStation.canvas.theCanvasScale + theCanvasScaleDelta
      newTheCanvasScale = Math.min(Math.max(storeStation.canvas.minimumTheCanvasScale, newTheCanvasScale), storeStation.canvas.maximumTheCanvasScale)

  storeStation.canvas.theCanvasScale = newTheCanvasScale

  updateTheCanvasPosition()
  saveTheCanvasState()
}, { passive: false })


domStation.theCanvasEditorBar.addEventListener('scroll', () => 
{
  storeStation.canvas.theCanvasEditorBarScrollLeft = domStation.theCanvasEditorBar.scrollLeft
  storeStation.canvas.theCanvasEditorBarScrollTop = domStation.theCanvasEditorBar.scrollTop

  if (!storeStation.isRestoringState) saveTheCanvasState()
})


addEventListener('keydown', event => 
{
  if (event.ctrlKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown'))
  {
    event.preventDefault()
    const theCanvasScaleDelta = event.key === 'ArrowUp' ? 0.03 : -0.03
    
    let newTheCanvasScale = storeStation.canvas.theCanvasScale + theCanvasScaleDelta
        newTheCanvasScale = Math.min(Math.max(storeStation.canvas.minimumTheCanvasScale, newTheCanvasScale), storeStation.canvas.maximumTheCanvasScale)

    storeStation.canvas.theCanvasScale = newTheCanvasScale
    updateTheCanvasPosition()

    storeStation.canvas.theCanvasEditorBarScrollLeft = domStation.theCanvasEditorBar.scrollLeft || 0
    storeStation.canvas.theCanvasEditorBarScrollTop = domStation.theCanvasEditorBar.scrollTop || 0

    saveTheCanvasState()
    return
  }

  if (event.ctrlKey && event.key === '0')
  {
    event.preventDefault()
    storeStation.canvas.theCanvasScale = 0.5

    updateTheCanvasPosition()
    saveTheCanvasState()
  }

  const mapArrowKeys = 
  {
    ArrowLeft: { left: -40 },
    ArrowRight: { left: 40 },
    ArrowTop: { top: -40 },
    ArrowBottom: { top: 40 }
  }

  if (mapArrowKeys[event.key])
  {
    domStation.theCanvasEditorBar.scrollBy(mapArrowKeys[event.key])

    storeStation.canvas.theCanvasEditorBarScrollLeft = domStation.theCanvasEditorBar.scrollLeft
    storeStation.canvas.theCanvasEditorBarScrollTop = domStation.theCanvasEditorBar.scrollTop

    saveTheCanvasState()
  }
})