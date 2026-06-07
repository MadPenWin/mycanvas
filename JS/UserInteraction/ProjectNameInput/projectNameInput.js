import { domStation } from '../../MyCanvasStation/domStation.js'
import { storeStation } from '../../MyCanvasStation/storeStation.js' 


export function saveProjectName()
{
  const value = domStation.projectNameInput.value.trim()
  if (value !== '')
  {
    storeStation.project.name = value
    localStorage.setItem('projectName', value)

    console.log('Project Name Saved:', value)
  }
}