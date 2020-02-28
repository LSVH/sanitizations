import Property from '../src/property';

const property = new Property('foo', { remove: /\s?bar\s?/ });

describe('Property', function() {
  test('with sanitization of a single property', () => {
    const expected = 'chair';
    const subject = 'bar chair';

    const actual = property.sanitize(subject);

    expect(actual).toMatch(expected);
  });

  test('with sanitization of a single property in an object', () => {
    const expected = { foo: 'chair' };
    const subject = { foo: 'bar chair' };

    const actual = property.sanitizeObject(subject);

    expect(actual).toMatchObject(expected);
  });
});
