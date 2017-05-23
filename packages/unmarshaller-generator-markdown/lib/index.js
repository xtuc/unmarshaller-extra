'use strict';

var _unmarshallerHelpers = require('unmarshaller-helpers');

function generateDocumentation(buildConfigPath) {
  const dir = path.dirname(buildConfigPath);
  const unmarshallerPath = path.join(dir, 'config.js');

  let unmarshaller;

  try {
    unmarshaller = require(unmarshallerPath).unmarshaller;
  } catch (e) {
    // Nothing
  }

  if (unmarshaller) {

    let rowTemplate = ({ tags = [], name, type, readmeDefaultValue, defaultValue, description }) => {
      if (tags.indexOf('internal') > -1) {
        return;
      }

      defaultValue = readmeDefaultValue ? readmeDefaultValue : defaultValue;

      if (type === 'object') {
        defaultValue = JSON.stringify(defaultValue);
      }

      return dedent`
        |\`${name}\`|\`${type}\`|${defaultValue ? '`' + defaultValue + '`' : ''}|${description || ''}|
        `;
    };

    const template = rows => dedent`
      # Parameters
      |name|type|default value|description|
      |---|---|---|---|
      ${rows.join('\n')}
    `;

    const rows = (0, _unmarshallerHelpers.flattenConfig)(unmarshaller).map(rowTemplate).filter(x => x);

    fs.writeFileSync(path.join(dir, 'README.md'), template(rows));
  }
}

generateDocumentation(process.argv[2]);