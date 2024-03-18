/* eslint-disable @typescript-eslint/no-explicit-any */
export class EventEmitter {
  private events: { [key in string]: Array<(...args: any[]) => void> } = {}
  constructor() {
    // key: 事件名
    // value: callback [] 回调数组
    this.events = {}
  }
  on(name: string, callback: (...args: any[]) => void) {
    if (this.events[name]) {
      this.events[name].push(callback)
    } else {
      this.events[name] = [callback]
    }
  }
  // 订阅一次
  once(name: string, callback: (...args: any[]) => void) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    function onlyOnce() {
      _this.off(name, onlyOnce)
      // eslint-disable-next-line prefer-rest-params
      callback(...arguments)
    }
    this.on(name, onlyOnce)
  }
  off(name: string, callback: (...args: any[]) => void) {
    if (!this.events[name]) return
    if (!callback) {
      // 如果没有callback,就删掉整个事件
      this.events[name] = []
    }
    this.events[name] = this.events[name]?.filter((item) => {
      return item !== callback
    })
  }
  emit(name: string, ...args: Array<(...args: any[]) => void>) {
    if (!this.events[name]) return
    this.events[name].forEach((cb) => cb(...args))
  }
}
