import { domStation } from '../../MyCanvasStation/domStation.js'


if (!localStorage.getItem('themeMode')) localStorage.setItem('themeMode', 'darkmode')

const themeSwitchButton = domStation.themeSwitchButton

const darkmodeThemeSwitchIcon = `<div class="darkmode-theme-switch-icon"></div>`
const lightmodeThemeSwitchIcon = `<div class="lightmode-theme-switch-icon"></div>`

let themeMode = localStorage.getItem('themeMode') === 'darkmode'


function updateThemeUI() { themeSwitchButton.innerHTML = themeMode ? darkmodeThemeSwitchIcon : lightmodeThemeSwitchIcon }


themeSwitchButton.addEventListener('click', () => 
{
  themeMode = !themeMode
  localStorage.setItem('themeMode', themeMode ? 'darkmode' : 'lightmode')

  updateThemeUI()
  applyThemeColors()

  console.log('Theme Mode Changed To:', themeMode ? 'Dark Mode.' : 'Light Mode.')
})


function applyThemeColors()
{
  const colorVariables = 
  [
    'backgroundcolor-1', 'backgroundcolor-2', 'backgroundcolor-3', 'backgroundcolor-4',
    'fontcolor-1', 'fontcolor-2', 'fontcolor-3', 'fontcolor-4'
  ]

  const getSavedThemeMode = localStorage.getItem('themeMode')
  colorVariables.forEach(colorVariable => { document.body.style.setProperty(`--${ colorVariable }`, `var(--${ getSavedThemeMode }-${ colorVariable })`) })
}


window.addEventListener('load', () => 
{
  updateThemeUI()
  applyThemeColors()
})