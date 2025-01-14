import { describe, it, expect } from "vitest";
import { calculateAverage, fizzBuzz, max } from "../src/intro";

describe('max', () => {
  it('should return the first argument if it is greater', () => {
    expect(max(2, 1)).toBe(2);
  });

  it('should return the second argument if it is greater', () => {
    expect(max(1, 2)).toBe(2);
  });

  it('should return the first argument if arguments are equal', () => {
    expect(max(1, 1)).toBe(1);
  })
})

describe('fizzbuzz', () => {
  it('should return fizzBuzz if arguments is divisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });

  it('should return fizz if argument is only divisible by 3', () => {
    expect(fizzBuzz(9)).toBe('Fizz');
  });

  it('should return Buzz if  argument is only divisible by 5', () => {
    expect(fizzBuzz(10)).toBe('Buzz');
  });

  it('should return argument as a string if it is not divisible by 3 or 5', () => {
    expect(fizzBuzz(7)).toBe('7');
  });
})

