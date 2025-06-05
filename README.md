# Typed Flash

[![npm](https://img.shields.io/npm/v/typed-flash)](https://www.npmjs.com/package/typed-flash)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Type-safe flash messages for Express.js and beyond — with optional async and standalone support.

An alternative to the traditional `connect-flash` middleware for Express.js, providing type safety and better integration with TypeScript.

It also allows you to define custom flash message types, which can be complex objects, making it easier to manage and retrieve flash messages in a type-safe manner.

One more focus of the package is not being fully dependent on `express-session`, so it will by default assume you are using `express-session`, but you can customize it to handle sessions in your own way. You can also perform async operations directly using `typed-flash/async`.

You can also use our standalone flash message handler without Express.js, making it versatile for various applications.

## Contents

- [Why Typed Flash?](#why-typed-flash)
- [Installation](#installation)
- [Quickstart](#quickstart)
- [Compatibility](#compatibility)
- [Usage](#usage)
    - [Basic Usage](#basic-usage)
    - [Custom Storage Logic (`getData`/`saveData`)](#custom-storage-logic-getdatasavedata)
    - [Using the Async Middleware](#using-the-async-middleware)
    - [Standalone Usage](#standalone-usage)
    - [Standalone Usage (Async)](#standalone-usage-async)
- [Flash Method API](#flash-method-api)
- [Migration from `connect-flash`](#migration-from-connect-flash)

## Why Typed Flash?

- ✅ Full TypeScript support with key/value safety
- 🔄 Sync and async APIs — use sessions, databases, or anything else
- 🚫 No hard dependency on `express-session`
- 🧩 Works with or without Express.js

## Installation

```bash
npm install typed-flash
```

## Quickstart

```ts
import flash from 'typed-flash';

declare module 'typed-flash' {
    interface FlashMap {
        info: { title: string, msg: string };
    }
}

app.use(flash());

req.flash('info', { title: 'Welcome!' msg: 'Welcome back to your beloved website' });
const messages = req.flash('info'); // Type: { msg: string, title: string }[]
```

➡️ See [Basic Usage](#basic-usage) for full setup.

## Compatibility

This package is built with TypeScript in mind and is compatible with Node.js versions that support both ECMAScript modules and CommonJS. It is designed to work seamlessly with Express.js applications.

To use the async features, it's recommended that you use a Node.js version that supports `node16` module resolution. (`>=16.0.0`)

## Usage

### Basic Usage

First, import the necessary modules and set up your application:

```typescript
import express from 'express';
import session from 'express-session';
import flash from 'typed-flash';
```

Next, customize the types for your flash messages:

```typescript
declare module 'typed-flash' {
    interface FlashMap {
        info: string;
        error: { message: string; code: number };
    }
}
```

Then, set up your Express application with session and flash middleware:

```typescript
const app = express();
app.use(
    session({
        secret: 'This is a secret',
        resave: false,
        saveUninitialized: false,
    }),
);
app.use(flash());
```

Then boom! you have your flash method there with type safety:

```typescript
app.get('/', (req, res) => {
    req.flash('error', { message: 'This is an error message', code: 500 }); // Valid
    req.flash('error', 'This is an error message'); // TypeScript Error
    req.flash('Error', { message: 'This is an error message', code: 500 }); // TypeScript Error
});
```

Then you can retrieve the flash messages in your routes:

```typescript
app.get('/messages', (req, res) => {
    const infoMessage = req.flash('info'); // Type: string[]
    const errorMessage = req.flash('error'); // Type: { message: string; code: number }[]
    const allMessages = req.flash(); // Type: FlashData
    res.json({ info: infoMessage, error: errorMessage });
});
```

### Custom Storage Logic (`getData`/`saveData`)

You can customize how flash messages are stored and retrieved by providing your own implementations of `getData()` and `saveData()` methods. This allows you to integrate with different session management systems or storage solutions.

```typescript
import flash from 'typed-flash';

const customFlash = flash({
    // Context refers to the request object in Express.js
    getData: async ({ context }) => {
        // Custom logic to retrieve flash messages
        return context.session?.flash || {};
    },
    saveData: async (data, { context }) => {
        // Custom logic to save flash messages
        context.session.flash = data;
    },
});

app.use(customFlash());
```

Or even inline while calling the flash method:

```typescript
app.use(flash());

app.get('/', (req, res) => {
    // Note that you can access req directly without context variable
    req.flash('info', 'This is an info message', {
        getData: async ({ context }) => {
            // Custom logic to retrieve flash messages
            return context.session?.flash || {};
        },
        saveData: async (data, { context }) => {
            // Custom logic to save flash messages
            context.session.flash = data;
        },
    });
    res.send('Flash message set');
});
```

### Using the Async Middleware

You can use the async version of the flash middleware for operations that require asynchronous handling, such as database interactions or external API calls.

This is useful when you want to save flash messages directly to a cache or database without relying on session storage.

```typescript
import flash from 'typed-flash/async';

declare module 'typed-flash/async' {
    interface FlashMap {
        info: string;
        error: { message: string; code: number };
    }
}

const someDBClient;

const app = express();
app.use(
    flash({
        getData: async ({ context }) => {
            return (await someDBClient.getFlashMessages(context.body.id)) || {};
        },
        saveData: async (data, { context }) => {
            await someDBClient.saveFlashMessages(context.body.id, data);
        },
    }),
);
```

Then all your `req.flash()` calls will be async:

```typescript
app.get('/', async (req, res) => {
    await req.flash('info', 'This is an info message');
    res.send('Flash message set');
});
app.get('/messages', async (req, res) => {
    const infoMessage = await req.flash('info'); // Type: string[]
    const errorMessage = await req.flash('error'); // Type: { message: string; code: number }[]
    res.json({ info: infoMessage, error: errorMessage });
});
```

> ⚠️ **Heads up:** All `req.flash()` calls are now `async`. Don’t forget to `await` them or unexpected behavior may occur.

### Standalone Usage

Alternatively, use the flash message handler without Express.js, making it versatile for various applications. Ideal for situations where you want to manage flash messages in a non-Express environment.

```typescript
import { StandaloneFlash } from 'typed-flash';

declare module 'typed-flash' {
    interface FlashMap {
        info: string;
        error: { message: string; code: number };
    }
}

const flashHandler = new StandaloneFlash();

// Setting flash messages
flashHandler.flash('info', 'This is an info message');

// Retrieving flash messages
const infoMessages = flashHandler.flash('info'); // Type: string[]

// Retrieving all flash messages
const allMessages = flashHandler.flash(); // Type: FlashData
```

### Standalone Usage (Async)

You can also use the async version of the standalone flash handler for operations that require asynchronous handling.

```typescript
import { StandaloneAsyncFlash } from 'typed-flash/async';

declare module 'typed-flash/async' {
    interface FlashMap {
        info: string;
        error: { message: string; code: number };
    }
}

const asyncFlashHandler = new StandaloneAsyncFlash({
    getData: async () => {
        // Custom logic to retrieve flash messages
        return {};
    },
    saveData: async (data) => {
        // Custom logic to save flash messages
    },
});

// Setting flash messages
await asyncFlashHandler.flash('info', 'This is an info message');
// Retrieving flash messages
const infoMessages = await asyncFlashHandler.flash('info'); // Type: string[]
// Retrieving all flash messages
const allMessages = await asyncFlashHandler.flash(); // Type: FlashData
```

## Flash Method API

The `options` parameter can be passed to any of the function overloads as a third parameter, assigning other unused to undefined.

- **`flash()`**

    Retrieves all flash messages stored, and clears the flash storage. (Note that keys with no values don't appear)

    Returns an object of type `FlashData`, which looks like this:

    ```typescript
    {
        key: [
            "value1",
            "value2",
            ...
        ],
        anotherKey: [
            { msg: "This is a value" }
        ],
    }
    ```

    The returned types will match your defined types in `FlashMap` interface.

- **`flash(key)`**

    Retrieves flash messages of a specific key and deletes it from the flash storage.

    The key parameter must be of type `FlashKey`, which matches the keys defined in the `FlashMap` interface.

    Returns an array of the value type defined in the `FlashMap` interface.

- **`flash(key, value)`**

    Stores a given value associated to the given key.

    The key parameter must be of type `FlashKey`, and the value can be either a single value or an array of values where either way it has to follow the type associated with the key in the `FlashMap`.

## Migration from `connect-flash`

Step 1: Update your import statement

```diff
- import flash from 'connect-flash';
+ import flash from 'typed-flash';
```

Step 2: Add your custom flash message types (only if you are using TypeScript)

```typescript
declare module 'typed-flash' {
    interface FlashMap {
        info: string;
        error: { message: string; code: number };
    }
}
```

Step 3: You're ready to go! The rest of your code should work as expected, but now with type safety.

⚠️ **Note:** If you are using string formatting offered by `connect-flash`, you will need to implement your own formatting logic, as `typed-flash` does not include this feature by default. (because it shouldn't)

```diff
- req.flash('info', 'Hello %s', 'World');
+ req.flash('info', `Hello ${'World'}`);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome through pull requests and will be reviewed by the repository owner to make sure they meet the project goals. Thank you in advance for your precious time!
