# dce-stub

A simple way to stub default-only dependencies. This project currently only works for stubbing the default export of a module.

## Usage

### 1. Import `dce-stub`

```js
import runStubbed from 'dce-stub';
```

### 2. Import the dependencies you wish to stub using * syntax

```js
import * as myDependency from '...';
...
```

### 3. Run your tests within the `runStubbed` function

Call `runStubbed` with two arguments:

- **replacements** `object|object[]` – either one or many stub replacements, each of the form `{ dep, stub }` where `dep` is the dependency and `stub` is the stubbed version of the dependency
- **test** `function` – tests to run while the dependency is stubbed (dependencies are restored once the function finishes). Function may be asynchronous or synchronous

```js
describe('My Feature', () => {
    it('Does Something', async () => {
        ...

        // Define stub replacement
        const replacement = {
            dep: myDependency,
            stub: <stub of myDependency>,
        };

        // Run the
        await runStubbed(replacement, async () => {
            ...
        });
    });
});
```

If you have more than one dependency to stub, just use a list:

```js
...
// Define stub replacements
const replacements = [
    {
        dep: myDependency,
        stub: <stub of myDependency>,
    },
    {
        dep: secondDepencency,
        stub: <stub of secondDependency>,
    },
    ...
];

// Run the
await runStubbed(replacements, async () => {
    ...
});
```

## Example

We have two helpers:

- `getNameFromServer` – pulls the current user's first name from the server
- `genIntro` – a script that calls `getNameFromServer` and generates a welcome message

Our goal is to write a unit test for `genIntro`, isolating it from `getNameFromServer`. Thus, we want to import `genIntro` while replacing `getNameFromServer` with a fake stubbed version of that module.

### `getNameFromServer.js`

```js
export default async () => {
    return sendRequest({
        method: 'GET',
        url: 'https://host.com/user/profile/name',
    });
};
```

### `genIntro.js`

```js
import getNameFromServer from './getNameFromServer';

export default async () => {
    // Get the current user's name
    const name = await getNameFromServer();

    // Create the message
    return `Hi ${name}! It is a pleasure to meet you.`;
};
```

### `genIntro.spec.js`

```js
import runStubbed from 'dce-stub';

// Import module to test
import genIntro from './genIntro';

// Import dependencies we want to stub
import * as getNameFromServer from './getNameFromServer';

// Create the getNameFromServer stub
const getNameFromServerStub = () => {
    return 'Divardo';
};

// Tests
describe('genIntro', () => {
    it('Generates a valid introduction', async () => {
        // Create stub replacements
        const replacement = {
            dep: getNameFromServer,
            stub: getNameFromServerStub,
        };

        // Run tests with stub replacements
        runStubbed(replacement, async () => {
            // Generate an intro message
            const intro = await genIntro();

            // Test the intro
            assert.equal(
                intro,
                'Hi Divardo! It is a pleasure to meet you.',
                'Invalid intro produced'
            );
        });
    });
});
```
