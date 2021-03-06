# Sanitizations

Setup sanitization for a specific object structure.

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Schema](#schema)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
    -   [sanitize](#sanitize)
        -   [Parameters](#parameters-1)
    -   [path](#path)
        -   [Parameters](#parameters-2)
-   [mapInstructionsToProperty](#mapinstructionstoproperty)
    -   [Parameters](#parameters-3)
-   [Property](#property)
    -   [Parameters](#parameters-4)
    -   [Examples](#examples-1)
    -   [sanitize](#sanitize-1)
        -   [Parameters](#parameters-5)
    -   [sanitizeObject](#sanitizeobject)
        -   [Parameters](#parameters-6)

## Schema

A Schema defines the configurations of how objects should be sanitized.

### Parameters

-   `instructions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** instructions on how to sanitize (optional, default `{}`)

### Examples

```javascript
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

expect(actual).toMatchObject(expected);
```

### sanitize

Sanitize an object according to the instructions applied to the schema.

#### Parameters

-   `input` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** object to sanitize

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** a sanitized object

### path

Get a property from the schema.

#### Parameters

-   `propName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the property to select

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** the property of the schema

## mapInstructionsToProperty

Convert all plain JS objects to objects of the Property class.

### Parameters

-   `instructions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object with properties

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object of properties with the supplied instructions

## Property

A property of the sanitization schema.

### Parameters

-   `name` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the property name in the schema
-   `definition` **(null | [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))?** the definitions of the sanitizers this property uses (optional, default `null`)

### Examples

```javascript
const schema = new Schema({ foo: { remove: /\s?bar\s?/ } });
const property = schema.path('foo');

const expected = 'chair';
const subject = 'bar chair';

const actual = property.sanitize(subject);

expect(actual).toMatch(expected);
```

```javascript
const expected = { foo: 'chair' };
const subject = { foo: 'bar chair' };

const actual = property.sanitizeObject(subject);

expect(actual).toMatchObject(expected);
```

### sanitize

Sanitize the input according to the schema property's definition.

#### Parameters

-   `input` **any** what to sanitize

Returns **any** the sanitized input

### sanitizeObject

Sanitize a property of the input object what matches the schema property's name.

#### Parameters

-   `input` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** what to sanitize

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** the input object with only the relevant property sanitized
