import { domStation } from '../MyCanvasStation/domStation.js'
import { renderEngine } from './renderEngine.js'

domStation.renderCanvasButton.addEventListener('click', () => { renderEngine() })