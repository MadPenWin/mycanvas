export function snapVertically(snapState, currentPosition, newTop, guidePosition)
{
  const distance = Math.abs(currentPosition - guidePosition)
  if (distance < snapState.smallestVerticalDistance)
  {
    snapState.smallestVerticalDistance = distance

    snapState.bestTopSnap = newTop
    snapState.guideY = guidePosition
  }
}