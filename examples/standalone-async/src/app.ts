import { createClient } from "redis";
import { StandaloneAsyncFlash } from "typed-flash/async";
import readline from "readline";

declare module 'typed-flash/async' {
    interface FlashMap {
        info: string;
    }
}

const redisClient = createClient({
    url: 'redis://localhost:6379',
});

const flashHandler = new StandaloneAsyncFlash({
    async saveData(data, { context }) {
        console.log(`Saving Flash...`);
        await redisClient.set(`flash:${context.id}`, JSON.stringify(data));
    },

    async getData({ context }) {
        const flashData = await redisClient.get(`flash:${context.id}`);
        return flashData ? JSON.parse(flashData) : {};
    },

    id: 'default'
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function prompt() {
    rl.question("Enter a flash message (or 'exit' to quit): ", async (input) => {
        if (input.trim().toLowerCase() === "exit") {
            const messages = await flashHandler.flash("info");
            console.log(`Flash messages: ${messages}`);
            rl.close();
            return;
        }
        await flashHandler.flash("info", input);
        prompt();
    });
}
