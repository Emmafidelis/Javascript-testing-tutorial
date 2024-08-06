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
  it('should return false when the price is outside the range', () => {
    expect(isPriceInRange(-10, 0, 100)).toBe(false);
    expect(isPriceInRange(200, 0, 100)).toBe(false);
  })

  it('should return true when the price is equal to the min or to the max', () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  })

  it('should return true when the price is within the range', () => {
    expect(isPriceInRange(50, 0, 100)).toBe(true);
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

  it('should return false for underage in the US.', () => {
    expect(canDrive(15, 'US')).toBe(false)
  })

  it('should return true for min age in the US.', () => {
    expect(canDrive(16, 'US')).toBe(true)
  })

  it('should return true for eligible in the US.', () => {
    expect(canDrive(17, 'US')).toBe(true)
  })

  it('should return false for underage in the UK.', () => {
    expect(canDrive(16, 'UK')).toBe(false)
  })

  it('should return true for min age in the UK.', () => {
    expect(canDrive(17, 'UK')).toBe(true)
  })

  it('should return true for eligible in the UK.', () => {
    expect(canDrive(18, 'UK')).toBe(true)
  })
})
