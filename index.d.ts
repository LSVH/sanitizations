export default class Schema {
    constructor(instructions?: SchemaInstructions);

    sanitize(input: object): object;

    path(propName: string): Property;
}

interface SchemaInstructions {
    [key: string]: Property
}

export class Property {
    constructor(name: string, definition?: SanitizerDefinition);

    sanitize(input: any): any;

    sanitizeObject(input: object): object;
}

interface SanitizerDefinition {
    remove: RemoveSanitizer,
    format: FormatSanitizer,
    convert: ConvertSanitizer
}

type RemoveSanitizer = string | RegExp;

interface FormatSanitizer {
    from: string | RegExp,
    to: string | number | Function,
}

interface ConvertSanitizer {
    (input: any): any;
}
