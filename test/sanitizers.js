import Sanitizers from '../src/sanitizers';

const {convert, remove, transform} = Sanitizers;

describe('Sanitizer', function() {
  describe('convert', () => {
    const subject = 'nothing happened...';
    const expected = 'something happened!';
    test('accepts two parameters', () => {
      expect(convert()).toBeUndefined();
      expect(convert(subject)).toMatch(subject);
      expect(convert(subject, v => expected)).toMatch(expected);
      expect(convert(subject, v => expected, 'unused')).toMatch(expected);
    });
    test('accepts only a function as second parameter', () => {
      expect(convert(subject, v => expected)).toMatch(expected);
      expect(convert(subject, 'string')).toMatch(subject);
      expect(convert(subject, Date)).toMatch(Date());
    });
  });
  describe('remove', () => {
    const re = /[.]/g;
    const subject = 'test...';
    const expected = 'test';
    test('accepts two parameters', () => {
      expect(remove()).toBeUndefined();
      expect(remove(subject)).toMatch(subject);
      expect(remove(subject, re)).toMatch(expected);
      expect(remove(subject, re, 'unused')).toMatch(expected);
    });
  });
  describe('transform', () => {
    const config = { from: /[.]/g, to: '!' };
    const subject = 'test...';
    const expected = 'test!!!';
    test('accepts two parameters', () => {
      expect(transform()).toBeUndefined();
      expect(transform(subject)).toMatch(subject);
      expect(transform(subject, config)).toMatch(expected);
      expect(transform(subject, config, 'unused')).toMatch(expected);
    });
  });
});
