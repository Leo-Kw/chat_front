export const formatDate = (str: string) => {
  const dateObj = new Date(str)

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date string')
  }

  const year = dateObj.getFullYear() // 获取年份
  const month = String(dateObj.getMonth() + 1).padStart(2, '0') // 获取月份，需要+1，并且可能需要在前面添加'0'
  const day = String(dateObj.getDate()).padStart(2, '0') // 获取日期，并且可能需要在前面添加'0'
  const hours = String(dateObj.getHours()).padStart(2, '0') // 获取小时，并且可能需要在前面添加'0'
  const minutes = String(dateObj.getMinutes()).padStart(2, '0') // 获取分钟，并且可能需要在前面添加'0'
  const seconds = String(dateObj.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
