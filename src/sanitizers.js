const Sanitizers = {
  remove: (value, regex) => value.replace(regex, ''),
  transform: (value, { from, to }) => value.replace(from, to),
  convert: (value, func) => func(value)
};

export default Sanitizers;
