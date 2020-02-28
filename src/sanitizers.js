const isString = v => typeof v === 'string';

const Sanitizers = {
  remove: (value, regex) => isString(value) ? value.replace(regex, '') : value,
  transform: (value, { from, to }) => isString(value) ? value.replace(from, to) : value,
  convert: (value, func) => func(value)
};

export default Sanitizers;
