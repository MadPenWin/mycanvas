export function saveColorState(engine)
{
  const savedStateData = { hue: engine.hue, saturation: engine.saturation, value: engine.value }
  localStorage.setItem('colorPickerState', JSON.stringify(savedStateData))
}