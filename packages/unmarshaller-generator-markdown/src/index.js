import {flattenConfig} from 'unmarshaller-helpers';
import dedent from 'dedent';
import path from 'path';

function generateDocumentation(filename) {
  const unmarshallerPath = path.join(
    process.cwd(),
    filename
  );

  let unmarshaller;

  try {
    unmarshaller = require(unmarshallerPath).unmarshaller;
  } catch (e) {
    throw e;
  }

  if (unmarshaller) {

    let rowTemplate = ({tags = [], name, type, readmeDefaultValue, defaultValue, description}) => {
      if (tags.indexOf('internal') > -1) {
        return;
      }

      defaultValue = readmeDefaultValue ? readmeDefaultValue : defaultValue;

      if (type === 'object') {
        defaultValue = JSON.stringify(defaultValue);
      }

      return dedent`
        |\`${name}\`|\`${type}\`|${defaultValue ? '`' + defaultValue + '`' : '-'}|${description || '-'}|
        `;
    };

    const template = (rows) => dedent`
      # Parameters
      |name|type|default value|description|
      |---|---|---|---|
      ${rows.join('\n')}
    `;

    const rows = flattenConfig(unmarshaller).map(rowTemplate).filter(x => x);

    console.log(template(rows));
  }
}

generateDocumentation(process.argv[2]);
