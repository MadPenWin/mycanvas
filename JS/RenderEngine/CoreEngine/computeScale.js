export function computeScale(renderWidth, renderHeight, surfaceWidth, surfaceHeight)
{
  return { scaleX: renderWidth / surfaceWidth, scaleY: renderHeight / surfaceHeight }
}