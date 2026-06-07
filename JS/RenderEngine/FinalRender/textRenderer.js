import { renderText } from '../Renderers/renderText.js'


export function renderAllTexts(drawingContext, textsArray)
{
  textsArray.forEach(textObject =>
  {
    renderText(drawingContext, textObject)
  })
}