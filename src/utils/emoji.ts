/* 通过文字二进制得到文字字节数 */
const getByteByBinary = (binaryCode: string) => {
  /**
   * 二进制 Binary system,es6表示时以0b开头
   * 八进制 Octal number system,es5表示时以0开头,es6表示时以0o开头
   * 十进制 Decimal system
   * 十六进制 Hexadecimal,es5、es6表示时以0x开头
   */
  const byteLengthDatas = [0, 1, 2, 3, 4]
  const len = byteLengthDatas[Math.ceil(binaryCode.length / 8)]
  return len
}

/* 通过文字十六进制得到文字字节数 */
const getByteByHex = (hexCode: string) => {
  return getByteByBinary(parseInt(hexCode, 16).toString(2))
}

/* 字符串转Unicode十六进制 */
export const strToUnicode = (str: string) => {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    const code = str.codePointAt(i)?.toString(16)
    result += `\\u{${code}}`
    if ((code?.length ?? 0) > 4) {
      i++ // 由于str.length也只能处理两个字节的文字，所以这里需要判断如果codePointAt得到多字符就得跳过一次循环
    }
  }
  return result
}

/* 截取指定字符数长度的文本 如果后一个字符截取后超出指定的长度，将不会截取该字符 */
export const substringByByte = (str: string, maxLength: number) => {
  const data = str
  const reg = new RegExp(/\\u\{[A-z0-9]+\}(\\u\{200d\}{1}\\u\{[A-z0-9]+\})*/, 'g') // 使用正则表达式分割每个完整字符
  const datas = reg[Symbol.match](data)
  let result = ''
  let length = 0
  for (const i in datas) {
    let value: number[] | string[] = datas[+i].split('\\u').slice(1)
    value = value.map((str) => {
      const strValue = str.replace(/\\u/g, '').replace(/{/g, '').replace(/}/g, '')
      length += getByteByHex(strValue)
      return parseInt(strValue, 16)
    })
    if (length <= maxLength) {
      result += String.fromCodePoint(...value)
    } else break
  }
  return result
}

/* code转emoji */
export const emojiByCode = (code: string) => {
  const decimalValue = parseInt(code, 16)
  return String.fromCodePoint(decimalValue)
}
