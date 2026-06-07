import { renderSquare } from '../Renderers/renderSquare.js'
import { renderCircle } from '../Renderers/renderCircle.js'
import { renderTriangle } from '../Renderers/renderTriangle.js'


export function renderAllShapes(context, shapesArray, canvasBackgroundColor)
{
  shapesArray.forEach(shape =>
  {
    switch (shape.type)
    {
      case 'circle':
        renderCircle(context, shape, canvasBackgroundColor)
        break

      case 'triangle':
        renderTriangle(context, shape, canvasBackgroundColor)
        break

      default:
        renderSquare(context, shape, canvasBackgroundColor)
        break
    }
  })
}