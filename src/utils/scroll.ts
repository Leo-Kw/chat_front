export const scorllToBottom = (id = 'messageBottom', behavior: 'smooth' | 'auto' = 'smooth') => {
  const el = document.getElementById(id)
  console.log(el)
  el?.scrollIntoView({ behavior })
}
