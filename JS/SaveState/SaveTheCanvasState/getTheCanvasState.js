import { domStation } from '../../MyCanvasStation/domStation.js'
import { storeStation } from '../../MyCanvasStation/storeStation.js'


export function getTheCanvasState()
{
  return {
    id: 'theCanvasState',

    theCanvasEditorBarScrollLeft: storeStation.canvas.theCanvasEditorBarScrollLeft,
    theCanvasEditorBarScrollTop: storeStation.canvas.theCanvasEditorBarScrollTop,

    theCanvasScale: storeStation.canvas.theCanvasScale,
    theCanvasColor: getComputedStyle(domStation.theCanvasDesignSurface).backgroundColor
  }
}