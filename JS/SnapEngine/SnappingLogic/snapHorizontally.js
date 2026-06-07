export function snapHorizontally(snapState, currentPosition, newLeft, guidePosition)
{
  const distance = Math.abs(currentPosition - guidePosition)
  if (distance < snapState.smallestHorizontalDistance)
  {
    snapState.smallestHorizontalDistance = distance

    snapState.bestLeftSnap = newLeft
    snapState.guideX = guidePosition
  }
}