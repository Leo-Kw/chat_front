export const scorllToBottom = (id = 'messageBottom', behavior: 'smooth' | 'auto' = 'smooth') => {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior })
}
