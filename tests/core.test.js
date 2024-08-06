import { it, expect, describe } from 'vitest'
import { calculateDiscount, getCoupons } from '../src/core';

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

describe('calculateDiscount', () => {
  it('should return discounted price if given valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  })

  it('should handle non-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i)
  })

  it('should handle negatice price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i)
  })

  it('should handle non-string discount code', () => {
    expect(calculateDiscount(-10, 10)).toMatch(/invalid/i)
  })
})
