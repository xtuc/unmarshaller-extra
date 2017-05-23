'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenConfig = flattenConfig;
/**
 * Flatten unmarshaller object
 *
 * @param {Object} unmarshaller
 * @returns {Object}
*/

function flattenConfig(unmarshaller) {
  const res = _flattenConfig(unmarshaller);
  res.sort((a, b) => {
    const nameA = a.name.toLocaleUpperCase();
    const nameB = b.name.toLocaleUpperCase();

    if (nameA === nameB) {
      return 0;
    }

    return nameA < nameB ? -1 : 1;
  });

  return res;
}

function _flattenConfig(unmarshaller) {
  const keys = Object.keys(unmarshaller);

  return keys.reduce((acc, k) => {
    const config = unmarshaller[k];

    if (config.type === 'holder') {
      return [...acc, ..._flattenConfig(config.children)];
    }

    acc.push(config);

    return acc;
  }, []);
}