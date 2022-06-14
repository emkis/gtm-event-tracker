export function removeEmptyPropsFromObject(obj: object) {
  const keysAndUnsafeValues = Object.entries(obj)

  const removeUndefinedAndNull = ([_key, value]: Record<string, unknown>[]) =>
    value !== null && value !== undefined

  const keysWithValues = keysAndUnsafeValues.filter(removeUndefinedAndNull)
  return Object.fromEntries(keysWithValues)
}
