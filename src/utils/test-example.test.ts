import { findMax, twoSum } from './test-example'

test('findMax([2, 6, 3])', () => {
  expect(findMax([2, 6, 3])).toBe(6)
})

test('twoSum([2, 6, 3, 3], 6)', () => {
  expect(twoSum([2, 6, 3, 3], 6)).toBe(true)
})

test('变量a是否为null', () => {
  const a = null
  expect(a).toBeNull()
})

test('变量a是否为defined', () => {
  const a = null
  expect(a).toBeDefined()
})

test('变量a是否为undefined', () => {
  const a = undefined
  expect(a).toBeUndefined()
})

test('变量a是否为true', () => {
  const a = true
  expect(a).toBeTruthy()
})

test('变量a是否为false', () => {
  const a = false
  expect(a).toBeFalsy()
})

test('test not', () => {
  const temp = 15
  expect(temp).not.toBe(10)
})
