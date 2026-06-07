export function applyTransforms(context, centerX, centerY, rotationInRadian)
{
  context.save()
  context.translate(centerX, centerY)
  
  context.rotate(rotationInRadian)
  context.translate(-centerX, -centerY)
}