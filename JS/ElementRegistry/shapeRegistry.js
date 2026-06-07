const baseShapeDefault = 
{
  defaultWidth: 200,
  defaultHeight: 200,

  defaultRotation: 0,
  defaultBackground: '#FFFFFF'
}


export const shapeRegistry =
{
  square: { className: 'shape-square', ...baseShapeDefault },
  circle: { className: 'shape-circle', ...baseShapeDefault },
  triangle: { className: 'shape-triangle', ...baseShapeDefault }
}