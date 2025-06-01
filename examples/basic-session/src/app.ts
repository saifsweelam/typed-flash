import express from 'express';
import session from 'express-session';
import flash from 'typed-flash';

declare global {
    namespace TypedFlash {
        export interface FlashMap {
            messages: { title: string; body: string };
            errors: { code: number; message: string };
        }
    }
}

const app = express();

app.use(
    session({
        secret: 'ThisIsASecretKey',
        resave: false,
        saveUninitialized: false,
    }),
);
app.use(flash());

app.get('/', (req, res) => {
    req.flash('messages', {
        title: 'Welcome',
        body: 'Hello, this is a flash message!',
    });
    req.flash('errors', { code: 404, message: 'Page not found' });
    res.send('Flash messages set! <a href="/show">Show Flash Messages</a>');
});

app.get('/show', (req, res) => {
    const messages = req.flash('messages');
    const errors = req.flash('errors');
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
    `);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
