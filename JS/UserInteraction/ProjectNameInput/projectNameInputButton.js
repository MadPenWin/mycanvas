import { domStation } from '../../MyCanvasStation/domStation.js'
import { saveProjectName } from './projectNameInput.js'


domStation.projectNameInput.addEventListener('keydown', event =>
{
  if (event.key === 'Enter')
  {
    saveProjectName()
    domStation.projectNameInput.blur()
  }
})


domStation.projectNameInput.addEventListener('blur', () => { saveProjectName() })