import Sanitizers from './sanitizers.js';

/**
 * A Schema defines the configurations of how objects should be sanitized.
 *
 * @example
 * const ambitiousReg = /[!@#$%^&*()[\]<>:;/\\]/g;
 *
 * const schema = new Schema({
 *   title: {
 *     remove: ambitiousReg,
 *     transform: {
 *       from: /[._-]/g,
 *       to: ' '
 *     },
 *     convert: (input) =>
 *       input.split(' ').map(i =>
 *         i.charAt(0).toUpperCase() + i.substr(1).toLowerCase()
 *       ).join(' ')
 *     },
 *   slug: {
 *     remove: ambitiousReg,
 *     transform: {
 *       from: /[\s._]/g,
 *       to: '-'
 *     },
 *     convert: (input) => input.toLowerCase()
 *   }
 * });
 *
 * const subject = {
 *   title: 'hell()O.woRld!',
 *   slug: 'example: /h@ello_world'
 * };
 *
 * const expected = {
 *   title: 'Hello World',
 *   slug: 'example-hello-world'
 * };
 *
 * const actual = schema.sanitize(subject);
 *
 * assertTrue(actual.title === expected.title);
 * assertTrue(actual.slug === expected.slug);
 *
 * @param {Object} [instructions] - instructions on how to sanitize
 */
export default class Schema {
  constructor(instructions = {}) {
    this.instructions = instructions;
    this.sanitizers = Object.assign({}, Sanitizers);
  }

  /**
   * @param {Object} [input] - object to sanitize
   * @returns {Object} a sanitized object
   */
  sanitize(input) {
    input != null && Object.keys(input).map(k =>
      k in this.instructions && Object.keys(this.instructions[k]).map(i => {
        if (i in this.sanitizers) input[k] = this.sanitizers[i](input[k], this.instructions[k][i]);
      })
    );
    return input;
  }
}
