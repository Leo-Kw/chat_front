export const findMax = (numArr: number[]) => {
  let max = numArr[0]
  numArr.forEach((item) => {
    max = item > max ? item : max
  })
  return max
}

export const twoSum = (numArr: number[], target: number) => {
  for (let i = 0; i < numArr.length; i++) {
    for (let j = i + 1; j < numArr.length; j++) {
      if (numArr[i] + numArr[j] === target) {
        return true
      }
    }
  }
  return false
}
