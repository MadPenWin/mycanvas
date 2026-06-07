export const storeStation =
{
  project: { name: 'untitled' },

  canvas:
  {
    myCanvas: null,
    isSelectingTheCanvas: false,

    theCanvasScale: 0.5,

    minimumTheCanvasScale: 0.1,
    maximumTheCanvasScale: 3,

    theCanvasEditorBarScrollLeft: 0,
    theCanvasEditorBarScrollTop: 0,
  },

  element:
  {
    theElement: null,

    isSelectingTheElement: false,
    isMultiSelectingElements: false,

    isDraggingTheElement: false,
    isRotatingTheElement: false,
    isResizingTheElement: false,

    isEditingText: false,

    isDraggingHue: false,
    isDraggingSaturationValue: false,

    verticalGuideLine: null,
    horizontalGuideLine: null,
  },

  calculation:
  {
    snapDistanceOfElements: 6,

    resizeDirection: 0,

    resizeAnchorWorldX: 0,
    resizeAnchorWorldY: 0,

    offsetX: 0,
    offsetY: 0,

    centerX: 0,
    centerY: 0,

    startLeft: 0,
    startTop: 0,

    startWidth: 0,
    startHeight: 0,

    startMouseX: 0,
    startMouseY: 0,

    startTranslateX: 0,
    startTranslateY: 0,

    currentRotationAngle: 0,

    mouseStartRotationAngle: 0,
    resizeStartRotationAngle: 0,

    theElementStartRotationAngle: 0,

    rotationCenterX: 0,
    rotationCenterY: 0,

    startFontSize: 0,
  },

  memory:
  {
    copiedTheElementData: null,
    isRestoringState: false,

    elementsSelectedArray: [],
    elementsMemoryArray: [],

    theElementMemoryIndex: -1,
  }
}