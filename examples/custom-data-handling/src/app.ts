import express from 'express';
import session from 'express-session';
import flash, { FlashData } from 'typed-flash';

declare module 'typed-flash' {
    interface FlashMap {
        messages: { title: string; body: string };
        errors: { code: number; message: string };
        warns: string;
    }
}

const app = express();

app.use(
    session({
        secret: 'ThisIsASecretKey',
        resave: false,
        saveUninitialized: true,
    }),
);
app.use(
    flash({
        saveData(data, { context }) {
            // Context refers to the request object
            context.session.flash = data;
            console.log(`Saved Flash: ${JSON.stringify(data, null, 2)}`);
        },
        getData({ context }) {
            // Context refers to the request object
            console.log('Getting Flash Data...');
            return (
                (context.session.flash as FlashData) ??
                (context.session.flash = {})
            );
        },
    }),
);

app.get('/', (req, res) => {
    req.flash('messages', {
        title: 'Welcome',
        body: 'Hello, this is a flash message!',
    });
    req.flash('errors', { code: 404, message: 'Page not found' });
    // Inline callback modification
    req.flash('warns', 'This is a warning', {
        saveData(data) {
            (req.session as any).flash = data; // Or add SessionData override
            console.log('Saving a warning');
        }
    })
    res.send('Flash messages set! <a href="/show">Show Flash Messages</a>');
});

app.get('/show', (req, res) => {
    const messages = req.flash('messages');
    const errors = req.flash('errors');
    const warns = req.flash('warns');
    res.send(`
        <h1>Flash Messages</h1>
        <h2>Messages:</h2>
        <ul>
            ${messages?.map((msg) => `<li>${msg.title}: ${msg.body}</li>`).join('')}
        </ul>
        <h2>Errors:</h2>
        <ul>
            ${errors?.map((err) => `<li>Error ${err.code}: ${err.message}</li>`).join('')}
        </ul>
        <h2>Warnings:</h2>
        <ul>
            ${warns?.map((warn) => `<li>${warn}</li>`).join('')}
        </ul>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
