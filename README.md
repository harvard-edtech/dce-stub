# dce-stub

A simplified way to stub dependencies using rewiremock.

This project is designed for es6-based projects.

## Usage

Import `dce-stub`:

```js
import stub from 'dce-stub';
```

Call `stub` with two arguments:

- `filename` – the name of the module to import
- `replacements` – an object where keys are filenames for the imports to replace and values are the stubbed version of the imports to replace

## Example

We have two helpers:

- `/helpers/getNameFromServer` – pulls the current user's first name from the server
- `/helpers/genIntro` – a script that calls `getNameFromServer` and generates a welcome message

Our goal is to write a unit test for `genIntro`, isolating it from `getNameFromServer`. Thus, we want to import `genIntro` while replacing `getNameFromServer` with a fake stubbed version of that module.

### `/helpers/genIntro.js`

```js
import getNameFromServer from './getNameFromServer';

export default () => {
    // Get the current user's name
    const name = getNameFromServer();
    
    // Create the message
    return `Hi ${name}! It is a pleasure to meet you.`;
};
```

### `genIntro.spec.js`

```js
import stub from 'dce-stub';

// Create the getNameFromServer stub
const getNameFromServerStub = () => {
    return 'Divardo';
};

// Import the item we want to test
const genIntro = stub(
    './helpers/genIntro',
    {
        './getNameFromServer': getNameFromServerStub,
    }
);

...
```