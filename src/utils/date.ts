const isToday = (date: number) => {
  const d = new Date(date)
  const todaysDate = new Date()
  if (d.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
    return true
  } else {
    return false
  }
}

export const withinFiveMinutes = (time: number, referTime: number) => {
  return referTime + 3600 * 5 > time
}

export const formatDate = (time: number) => {
  const dateObj = new Date(time)

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date string')
  }

  const year = dateObj.getFullYear() // 获取年份
  const month = String(dateObj.getMonth() + 1).padStart(2, '0') // 获取月份，需要+1，并且可能需要在前面添加'0'
  const day = String(dateObj.getDate()).padStart(2, '0') // 获取日期，并且可能需要在前面添加'0'
  const hours = String(dateObj.getHours()).padStart(2, '0') // 获取小时，并且可能需要在前面添加'0'
  const minutes = String(dateObj.getMinutes()).padStart(2, '0') // 获取分钟，并且可能需要在前面添加'0'
  // const seconds = String(dateObj.getSeconds()).padStart(2, '0')

  return isToday(time) ? `${hours}:${minutes}` : `${year}年${month}月${day}日 ${hours}:${minutes}`
}
