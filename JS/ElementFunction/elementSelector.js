import { shapeRegistry } from '../ElementRegistry/shapeRegistry.js'
import { textRegistry } from '../ElementRegistry/textRegistry.js'
import { imageRegistry } from '../ElementRegistry/imageRegistry.js'


export function shapeSelector() { return Object.values(shapeRegistry).map(item => `.${ item.className }`).join(', ') }
export function textSelector() { return Object.values(textRegistry).map(item => `.${ item.className }`).join(', ') }
export function imageSelector() { return Object.values(imageRegistry).map(item => `.${ item.className }`).join(', ') }