import { it, expect, describe } from 'vitest'
import { calculateDiscount, canDrive, getCoupons, isPriceInRange, isValidUsername, validateUserInput } from '../src/core';

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


describe('validateUserInput', () => {
  it('should return success if given valid input', () => {
    expect(validateUserInput('fide', 23)).toMatch(/success/i)
  })

  it('should return an error if username is not a string', () => {
    expect(validateUserInput(10, 23)).toMatch(/invalid/i)
  })

  it('should return an error if username is less than 3 characters', () => {
    expect(validateUserInput('fi', 23)).toMatch(/invalid/i)
  })

  it('should return an error if age is not a number', () => {
    expect(validateUserInput('fide', 'fi')).toMatch(/invalid/i)
  })

  it('should return an error if age is less than 18 characters', () => {
    expect(validateUserInput('fide', 17)).toMatch(/invalid/i)
  })
})

describe('isPriceInRange', () => {
  it.each([
    { scenario: 'price < min', price: -10, result: false },
    { scenario: 'price = min', price: 0, result: true },
    { scenario: 'price between min and max', price: 50, result: true },
    { scenario: 'price > max', price: 200, result: false },
    { scenario: 'price = max', price: 100, result: true },
  ])('should return $result when $scenario', ({ price, result}) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result)
  })
})

describe('isValidUsername', () => {
  const minLength = 5;
  const maxLength = 15;

  it('should return false if username is too short', () => {
    expect(isValidUsername('f'.repeat(minLength - 1))).toBe(false)
  })

  it('should return false if username is too long', () => {
    expect(isValidUsername('f'.repeat(maxLength + 1))).toBe(false)
  })

  it('should return true if username is at the min or max length', () => {
    expect(isValidUsername('f'.repeat(minLength))).toBe(true)
    expect(isValidUsername('f'.repeat(maxLength))).toBe(true)
  })

  it('should return true if username is within the length constraint', () => {
    expect(isValidUsername('f'.repeat(minLength + 1))).toBe(true)
    expect(isValidUsername('f'.repeat(maxLength - 1))).toBe(true)
  })
})

describe('canDrive', () => {
  it('should return error for invalid country code', () => {
    expect(canDrive(3, 'FR')).toMatch(/invalid/i)
  })

  it.each([
    { age: 15, country: 'US', result: false},
    { age: 16, country: 'US', result: true},
    { age: 17, country: 'US', result: true},
    { age: 16, country: 'UK', result: false},
    { age: 17, country: 'UK', result: true},
    { age: 18, country: 'UK', result: true},
  ])('should return $result for ($age, $country)', ({age, country, result}) => {
    expect(canDrive(age, country)).toBe(result)
  })
})
