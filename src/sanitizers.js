const isString = v => typeof v === 'string';
const isFunction = v => typeof v === 'function';
const isObject = v => v != null && typeof v === 'object';
const hasProperties = (obj, props) => !!(props.filter(prop => prop in obj).length);

const Sanitizers = {
  remove: (value, regex) => isString(value) ? value.replace(regex, '') : value,
  transform: (value, config) => isString(value) && isObject(config) && hasProperties(config, ['from', 'to'])
    ? value.replace(config.from, config.to) : value,
  convert: (value, func) => isFunction(func) ? func(value) : value
};

export default Sanitizers;
