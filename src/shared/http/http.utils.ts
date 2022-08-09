export const resetParams = <T>(params: T) => {
  const newParams: Record<string, T> = {}
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      newParams[key] = value !== '' ? value : undefined
    })
  }
  return newParams
}
