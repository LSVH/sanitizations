import Sanitizers from './sanitizers';

/**
 * A property of the sanitization schema.
 *
 * @example
 * const schema = new Schema({ foo: { remove: /\s?bar\s?/ } });
 * const property = schema.path('foo');
 *
 * const expected = 'chair';
 * const subject = 'bar chair';
 *
 * const actual = property.sanitize(subject);
 *
 * expect(actual).toMatch(expected);
 *
 * @example
 * const expected = { foo: 'chair' };
 * const subject = { foo: 'bar chair' };
 *
 * const actual = property.sanitizeObject(subject);
 *
 * expect(actual).toMatchObject(expected);
 *
 * @param {String} name - the property name in the schema
 * @param {null|Object} [definition] - the definitions of the sanitizers this property uses
 */
export default class Property {
  constructor(name, definition = null) {
    this.name = name;
    this.definition = definition;
    this.sanitizers = Object.assign({}, Sanitizers);
  }

  /**
   * Sanitize the input according to the schema property's definition.
   *
   * @param {any} input - what to sanitize
   * @returns {any} the sanitized input
   */
  sanitize(input) {
    this.definition != null && Object.keys(this.definition).map(k => {
      if (k in this.sanitizers) input = this.sanitizers[k](input, this.definition[k]);
    });
    return input;
  }

  /**
   * Sanitize a property of the input object what matches the schema property's name.
   *
   * @param {Object} input - what to sanitize
   * @returns {Object} the input object with only the relevant property sanitized
   */
  sanitizeObject(input) {
    typeof input === 'object' && this.name in input && this.definition != null && Object.keys(this.definition).map(k => {
      if (k in this.sanitizers) input[this.name] = this.sanitizers[k](input[this.name], this.definition[k]);
    });
    return input;
  }
}
