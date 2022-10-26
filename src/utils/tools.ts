/**
 * @desc 节流 对高频事件的优化  如 scroll。
 * 与防抖区别：防抖在连续的操作过程中只触发一次，而节流可能触发多次，但是频率变低了。
 */
export const throttle = (fun: () => void, delay = 300) => {
  let timeout: any = null
  return function () {
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null
        fun()
      }, delay)
    }
  }
}
