import express from 'express';
import { createClient } from 'redis';
import flash from 'typed-flash/async';

const app = express();

declare module 'typed-flash/async' {
    interface FlashMap {
        messages: { title: string; body: string };
        errors: { code: number; message: string };
    }
}

const redisClient = createClient({
    url: 'redis://localhost:6379',
});
redisClient.connect().then(() => console.log('Connected to Redis'));

app.use(
    flash({
        async saveData(data, { context }) {
            const userId = context.body.userId || 'defaultUser';
            console.log(`Saving Flash...`);
            await redisClient.set(`flash:${userId}`, JSON.stringify(data));
        },

        async getData({ context }) {
            const userId = context.body.userId || 'defaultUser';
            const flashData = await redisClient.get(`flash:${userId}`);
            return flashData ? JSON.parse(flashData) : {};
        },
    }),
);

app.get('/', async (req, res) => {
    await req.flash('messages', {
        title: 'Welcome',
        body: 'Hello, this is a flash message!',
    });
    await req.flash('errors', { code: 404, message: 'Page not found' });
    res.send('Flash messages set! <a href="/show">Show Flash Messages</a>');
});

app.get('/show', async (req, res) => {
    const messages = await req.flash('messages');
    const errors = await req.flash('errors');
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
