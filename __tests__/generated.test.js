const unknown = require('./Unknown');

describe('Error handling in the unknown name file', () => {
  it('should throw an error when an unknown name is provided', () => {
    expect(() => {
      unknown.unknownFunction();
    }).toThrow('Unknown name error');
  });

  it('should not throw an error when a known name is provided', () => {
    expect(() => {
      unknown.knownFunction();
    }).not.toThrow();
  });
});