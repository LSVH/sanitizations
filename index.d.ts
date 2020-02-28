export default class Schema {
    constructor(instructions?: SchemaInstructions);

    sanitize(input: object): object;
}

interface SchemaInstructions {
    [key: string]: Rule
}

type Rule = SanitizerDefinition;

interface SanitizerDefinition {
    remove: RemoveSanitizer,
    format: FormatSanitizer,
    convert: ConvertSanitizer
}

type RemoveSanitizer = RegExp;

interface FormatSanitizer {
    from: RegExp,
    to: string | number,
}

interface ConvertSanitizer {
    (input: any): any;
}
