import { domStation } from '../../MyCanvasStation/domStation.js'
import { addShape } from './addShape.js'


domStation.addShapeSquareButton.addEventListener('click', () => { addShape('square') })
domStation.addShapeCircleButton.addEventListener('click', () => { addShape('circle') })
domStation.addShapeTriangleButton.addEventListener('click', () => { addShape('triangle') })