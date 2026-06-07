export function updateCursorsResizePosition(theElement, rotationAngle)
{
  // Theta = (Rotation Angle % 360 + 360) % 360
  const normalizeAngle = (rotationAngle % 360 + 360) % 360
  const resizeHandles = theElement.querySelectorAll('.resize-handle')

  resizeHandles.forEach(resizeHandle => 
  {
    // Alpha = Base Resize Handle
    const baseAngle = getResizeHandleBaseAngle(resizeHandle)
    if (baseAngle === null)
    {
      return
    }

    // Canonical Form: Rotated Angle = (Theta + Alpha) % 360
    const rotatedAngle = (normalizeAngle + baseAngle) % 360
    resizeHandle.style.cursor = getPreciseResizeCursor(rotatedAngle)
  })
}


// The Unit Circle Chart For The Cursors Resize Handle
// 8 Handles -> 360 Degrees / 8 = 45 Degrees
// Each Handle Is Assigned A Base Angle On The Unit Circle Chart
function getResizeHandleBaseAngle(resizeHandle)
{
  const resizeHandleIconMap = { right: 0, 'bottom-right': 45, bottom: 90, 'bottom-left': 135, left: 180, 'top-left': 225, top: 270, 'top-right': 315 }
  for (const icon in resizeHandleIconMap) { if (resizeHandle.classList.contains(icon)) return resizeHandleIconMap[icon] }

  return null
}


const resizeCursorCache = new Map()
function getPreciseResizeCursor(rotatedAngle)
{
  const normalizedAngle = Math.round((rotatedAngle % 360 + 360) % 360)
  const fallbackCursor = getNativeFallbackResizeCursor(normalizedAngle)
  const cacheKey = `${ normalizedAngle }`

  const cachedResizeCursor = resizeCursorCache.get(cacheKey)
  if (cachedResizeCursor) return `${ cachedResizeCursor }, ${ fallbackCursor }`

  const iconResizeCursor = 
  `
    <svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 0 32 32'>
      <g transform='rotate(${ normalizedAngle } 16 16)'>
        <line x1='7' y1='16' x2='25' y2='16' stroke='black' stroke-width='2' stroke-linecap='round'/>

        <polygon points='3,16 12,11 12,21' fill='black'/>
        <polygon points='29,16 20,11 20,21' fill='black'/>
      </g>
    </svg>
  `

  const encodedIconCursor = btoa(iconResizeCursor)
  const iconResizeCursorUrl = `url('data:image/svg+xml;base64,${encodedIconCursor}') 16 16`

  resizeCursorCache.set(cacheKey, iconResizeCursorUrl)
  return `${ iconResizeCursorUrl }, ${ fallbackCursor }`
}


function getNativeFallbackResizeCursor(rotatedAngle)
{
  const resizeCursorByAngle = ['e-resize', 'se-resize', 's-resize', 'sw-resize', 'w-resize', 'nw-resize', 'n-resize', 'ne-resize']
  const resizeCursorIndex = Math.round(rotatedAngle / 45) % 8
  
  return resizeCursorByAngle[resizeCursorIndex]
}