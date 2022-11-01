export const typography = Object.freeze({
  h1: '48px',
  h2: '36px',
  h3: '30px',
  h4: '24px',
  h5: '18px',
  textBig: '20px',
  text: '16px',
  textSmall: '14px',
  textThin: '12px',
})

export const color = Object.freeze({
  primary: '#fd5052',
  secondary: '#f3153a',
  white: '#fff',
  background: '#F4F4F4',
  button: {
    main: '#409eff',
    hoverMain: '#007dff',
  },
  text: {
    lighter: '#f4f4f4',
    main: '#f3f6f7',
    dark: '#b0b3b5',
    darker: '#999999',
    darkest: '#000',
    danger: '#ff3737',
    gray: '#9b9b9b',
  },
  dark: {
    main: '#212328',
    light: '#252d3a',
    lighter: '#646c7a',
    dark: '#3e4149',
    darker: '#121317',
  },
  gray: {
    main: '#cccccc',
    light: '#e5e5e5',
    heavy: '#999',
    border: '#5e5e5e',
    background: '#5c5c5c6b',
  },
  messageBackground: {
    other: '#eee',
    myself: '#a9e87a',
  },
  disableGray: '#c1c7d6',
  // 功能色
  info: '#348ef5',
  success: '#67c23a',
  warning: '#f56c6c',
  error: '#ff4d4f',
})

export const spacing = Object.freeze({
  small: '10px',
  base: '20px',
  large: '30px',
})

export const radius = Object.freeze({
  /** 2px */
  ssm: '2px',
  /** 5px */
  sm: '5px',
  /** 8px */
  md: '8px',
  /** 10px */
  lg: '10px',
})

export const theme = {
  typography,
  color,
  spacing,
  radius,
}
