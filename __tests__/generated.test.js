const unknown = require('./Unknown');

describe('Edge cases testing', () => {
  test('Test with an empty string', () => {
    const result = unknown('');
    expect(result).toBe('Invalid input');
  });

  test('Test with special characters', () => {
    const result = unknown('!@#$%^&*()');
    expect(result).toBe('Invalid input');
  });

  test('Test with excessively long input', () => {
    const longInput = 'a'.repeat(10000); // create a string with length of 10000
    const result = unknown(longInput);
    expect(result).toBe('Invalid input');
  });
});