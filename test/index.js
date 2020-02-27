import Schema from '../src';

describe('Schema', () => {
  test('with multiple properties and multiple sanitizers', () => {
    const ambitiousReg = /[!@#$%^&*()[\]<>:;/\\]/g;

    const schema = new Schema({
      title: {
        remove: ambitiousReg,
        transform: {
          from: /[._-]/g,
          to: ' '
        },
        convert: (input) =>
          input.split(' ').map(i =>
            i.charAt(0).toUpperCase() + i.substr(1).toLowerCase()
          ).join(' ')
      },
      slug: {
        remove: ambitiousReg,
        transform: {
          from: /[\s._]/g,
          to: '-'
        },
        convert: (input) => input.toLowerCase()
      }
    });

    const subject = {
      title: 'hell()O.woRld!',
      slug: 'example: /h@ello_world'
    };

    const expected = {
      title: 'Hello World',
      slug: 'example-hello-world'
    };

    const actual = schema.sanitize(subject);

    expect(actual.title).toBe(expected.title);
    expect(actual.slug).toBe(expected.slug);
  });
});
