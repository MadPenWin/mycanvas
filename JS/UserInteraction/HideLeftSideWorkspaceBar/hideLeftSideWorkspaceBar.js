import { domStation } from '../../MyCanvasStation/domStation.js'
import { storeStation } from '../../MyCanvasStation/storeStation.js'


domStation.workspaceBarLeftSideHideButton.addEventListener('click', () => 
{
  storeStation.isHidingColorBar = !storeStation.isHidingColorBar
  domStation.workspaceBarLeftSide.classList.toggle('is-hidden')

  localStorage.setItem('isHidden', storeStation.isHidingColorBar)
  domStation.workspaceBarLeftSideHideButton.innerHTML = storeStation.isHidingColorBar ? ('<div class="workspace-bar-leftside-unhide-icon"></div>') : ('<div class="workspace-bar-leftside-hide-icon"></div>')
})


window.addEventListener('load', () => 
{
  storeStation.isHidingColorBar = (localStorage.getItem('isHidden') === 'true')
  if (storeStation.isHidingColorBar)
  {
    domStation.workspaceBarLeftSide.classList.add('is-hidden')
    domStation.workspaceBarLeftSideHideButton.innerHTML = '<div class="workspace-bar-leftside-unhide-icon"></div>'
  }

  else
  {
    domStation.workspaceBarLeftSide.classList.remove('is-hidden')
    domStation.workspaceBarLeftSideHideButton.innerHTML = '<div class="workspace-bar-leftside-hide-icon"></div>'
  }
})
