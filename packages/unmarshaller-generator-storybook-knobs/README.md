# unmarshaller-generator-storybook-knobs

> Generate knobs from an unmarshaller object

## Supported types

| name | description |
|------|-------------|
|string|string input|
|icon|alias for string|
|boolean|checkbox|
|color|color picker|
|number|number input|
|object|textarena input|

The default type is `string`.

## Example

```js
import React from 'react';
import * as knobs from '@kadira/storybook-addon-knobs';
import {storiesOf} from '@kadira/storybook';

import {withKnobs} from '@kadira/storybook-addon-knobs';
import {generateKnobs} from 'unmarshaller-generator-storybook-knobs';

import {unmarshaller} from '../unmarshaller'; // configuration object

storiesOf('component', module)
  .addDecorator(withKnobs)
  .add('test', () => (
    <Component config={generateKnobs(unmarshaller, knobs)} />
  ));
```

Note that the call of `generateKnobs` must be made inside the story function.
