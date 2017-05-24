# unmarshaller-generator-markdown

> Generate a markdown documentation for a given unmarshaller

## Install

```sh
npm i --save-dev unmarshaller-generator-markdown
```

## Usage

unmarshaller.js:

```js
const {builder} = require('unmarshaller');

const unmarshaller = {
  // ...
};

module.exports = {unmarshaller};
```

You currently need to explicitly export the unmarshaller (not as default export).

Generate document:

```sh
unmarshaller-generator-markdown unmarshaller.js > README.md
```

## Configuration

```js
const unmarshaller = {
  foo: builder.string('foo', {
    tags: [],
    defaultValue: 'bar'
  });
};
```

Special properties:

| name | description |
|------|-------------|
|tags|`internal` will hide the configuration|

## Example

```js
const unmarshaller = {

  name: builder.string('name', {
    defaultValue: 'Sven',
    description: 'Name of the person',
  }),

  backgroundColor: builder.string('background_color', {
    defaultValue: '#69b0dc',
    description: 'Background color of the card',
  }),

  textColor: builder.string('font_color', {
    defaultValue: 'black',
    description: 'Font color',
  }),
};
```

|name|type|default value|description|
|---|---|---|---|
|`background_color`|`string`|`#69b0dc`|Background color of the card|
|`font_color`|`string`|`black`|Font color|
|`name`|`string`|`Sven`|Name of the person|
