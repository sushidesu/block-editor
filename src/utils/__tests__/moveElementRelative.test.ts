import { moveElementRelative } from "../moveElementRelative"

describe(`moveElementRelative()`, () => {
  let array: number[]
  beforeEach(() => {
    array = [0, 1, 2, 3]
  })
  it(`[0, 1, 2, 3] の 2 を二つ左に動かす`, () => {
    expect(moveElementRelative(array, 2, -2)).toStrictEqual([2, 0, 1, 3])
  })
  it(`[0, 1, 2, 3] の 0 を三つ右に動かす`, () => {
    expect(moveElementRelative(array, 0, 3)).toStrictEqual([1, 2, 3, 0])
  })
  it(`[0, 1, 2, 3] の 1 を動かさない`, () => {
    expect(moveElementRelative(array, 1, 0)).toStrictEqual([0, 1, 2, 3])
  })
  it(`[0, 1, 2, 3] の 0 を三つ左に動かす`, () => {
    expect(moveElementRelative(array, 0, -3)).toStrictEqual([0, 1, 2, 3])
  })
  it(`[0, 1, 2, 3] の 2を100右に動かす`, () => {
    expect(moveElementRelative(array, 2, 100)).toStrictEqual([0, 1, 3, 2])
  })
})
