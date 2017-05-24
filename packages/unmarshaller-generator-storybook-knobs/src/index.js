/**
 * Generate knobs from unmarshaller
 *
 * @param {Object} unmarshaller
 * @returns {Object}
 */
export function generateKnobs(unmarshaller: Object, knobs: object) {
  const keys = Object.keys(unmarshaller);

  return keys.reduce((acc, key) => {
    let {name, type, defaultValue, exampleValue, children, of} = unmarshaller[key];
    let res;

    if (type === 'holder') {
      acc[key] = generateKnobs(children);
      return acc;
    }

    defaultValue = defaultValue !== null && defaultValue !== undefined ? defaultValue : exampleValue;

    switch(type) {
    case 'string':
    case 'icon':
      if (of) {
        res = knobs.select(name, of, defaultValue);
      } else {
        res = knobs.text(name, defaultValue || '');
      }
      break;

    case 'boolean':
      res = knobs.boolean(name, defaultValue || false);
      break;

    case 'color':
      res = knobs.color(name, defaultValue || 'white');
      break;

    case 'number':
      res = knobs.number(name, defaultValue);
      break;

    case 'object':
      res = knobs.object(name, defaultValue || {});
      break;

    default:
      res = knobs.text(name, '');
    }

    acc[key] = res;

    return acc;
  }, {});
}
