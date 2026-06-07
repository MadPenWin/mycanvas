export function computeEdges(left, top, width, height, rotationAngleInDegree = 0)
{
  const elementCenterXPosition = left + (width / 2)
  const elementCenterYPosition = top + (height / 2)

  const halfOfTheElementWidth = width / 2
  const halfOfTheElementHeight = height / 2

  const rotationAngleInRadian = rotationAngleInDegree * Math.PI / 180

  // Calculate The Position Of 4 Points Of An Element On A 2D Plane
  const unrotatedCornerPoints =
  [
    { xPosition: -halfOfTheElementWidth, yPosition: -halfOfTheElementHeight },
    { xPosition: halfOfTheElementWidth, yPosition: -halfOfTheElementHeight },
    { xPosition: halfOfTheElementWidth, yPosition: halfOfTheElementHeight },
    { xPosition: -halfOfTheElementWidth, yPosition: halfOfTheElementHeight }
  ]

  const rotatedCornerPoints = unrotatedCornerPoints.map(function(cornerPoint)
  {
    const rotatedXPosition = elementCenterXPosition + cornerPoint.xPosition * Math.cos(rotationAngleInRadian) - cornerPoint.yPosition * Math.sin(rotationAngleInRadian)
    const rotatedYPosition = elementCenterYPosition + cornerPoint.xPosition * Math.sin(rotationAngleInRadian) + cornerPoint.yPosition * Math.cos(rotationAngleInRadian)

    return { xPosition: rotatedXPosition, yPosition: rotatedYPosition }
  })

  const allCornerXPositions = rotatedCornerPoints.map(function(cornerPoint) { return cornerPoint.xPosition })
  const allCornerYPositions = rotatedCornerPoints.map(function(cornerPoint) { return cornerPoint.yPosition })

  const smallestXPosition = Math.min(...allCornerXPositions)
  const smallestYPosition = Math.min(...allCornerYPositions)

  const largestXPosition = Math.max(...allCornerXPositions)
  const largestYPosition = Math.max(...allCornerYPositions)

  const boundingWidth = largestXPosition - smallestXPosition
  const boundingHeight = largestYPosition - smallestYPosition

  return { 
    left: smallestXPosition,
    top: smallestYPosition,

    right: largestXPosition,
    bottom: largestYPosition,

    width: boundingWidth,
    height: boundingHeight,

    originalWidth: width,
    originalHeight: height
  }
}