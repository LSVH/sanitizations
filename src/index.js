import Sanitizers from './sanitizers.js';
import Property from "./property";

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
 * expect(actual).toMatchObject(expected);
 *
 * @param {Object} [instructions] - instructions on how to sanitize
 */
export default class Schema {
  constructor(instructions = {}) {
    this.instructions = mapInstructionsToProperty(instructions);
    this.sanitizers = Object.assign({}, Sanitizers);
  }

  /**
   * Sanitize an object according to the instructions applied to the schema.
   *
   * @param {Object} [input] - object to sanitize
   * @returns {Object} a sanitized object
   */
  sanitize(input) {
    input != null && typeof input === 'object' && Object.keys(this.instructions).map(k => {
      if (k in input) input[k] = this.instructions[k].sanitize(input[k]);
    });
    return input;
  }

  /**
   * Get a property from the schema.
   *
   * @param {string} propName - the property to select
   * @returns {Object} the property of the schema
   */
  path(propName) {
    return propName in this.instructions ? this.instructions[propName] : new Property(propName);
  }
}

/**
 * Convert all plain JS objects to objects of the Property class.
 *
 * @param {Object} instructions - object with properties
 * @returns {Object} object of properties with the supplied instructions
 */
function mapInstructionsToProperty(instructions) {
  const output = {};
  instructions != null && Object.keys(instructions).map(k => {
    if (k in instructions && typeof instructions[k] === 'object') {
      output[k] = new Property(k, instructions[k]);
    }
  });
  return output;
}
