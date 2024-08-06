import { it, expect, describe } from 'vitest'
import { getCoupons } from '../src/core';

describe('test suite', () => {
  it('test case', () => {
    const result = 'The requested file was not found.';
    // Loose(too general)
    expect(result).toBeDefined();
    // tight(too specific)
    expect(result).toBe('The requested file was not found.')
    // Better assertion
    expect(result).toMatch(/not found/i)
  })
})

describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    const coupons = getCoupons()
    expect(coupons.length).toBeGreaterThan(0)
  })

  it('should return an array with valid coupons codes', () => {
    const coupons = getCoupons()
    coupons.forEach(coupon => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy()
    })
  })
})
