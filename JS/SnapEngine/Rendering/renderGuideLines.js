import { storeStation } from '../../MyCanvasStation/storeStation.js'


export function renderGuideLines(snapResult)
{
  const verticalGuideLine = storeStation.element.verticalGuideLine
  const horizontalGuideLine = storeStation.element.horizontalGuideLine

  if (verticalGuideLine)
  {
    if (snapResult.guideX != null)
    {
      verticalGuideLine.style.display = 'block'
      verticalGuideLine.style.left = snapResult.guideX + 'px'
    }

    else
    {
      verticalGuideLine.style.display = 'none'
    }
  }

  if (horizontalGuideLine)
  {
    if (snapResult.guideY != null)
    {
      horizontalGuideLine.style.display = 'block'
      horizontalGuideLine.style.top = snapResult.guideY + 'px'
    }

    else
    {
      horizontalGuideLine.style.display = 'none'
    }
  }
}