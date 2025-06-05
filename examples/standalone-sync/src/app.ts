import { StandaloneFlash } from 'typed-flash';
import readline from 'readline';

const flashHandler = new StandaloneFlash({
    id: 'default',
});

declare module 'typed-flash' {
    interface FlashMap {
        info: string;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function prompt() {
    rl.question("Enter a flash message (or 'exit' to quit): ", (input) => {
        if (input.trim().toLowerCase() === 'exit') {
            const messages = flashHandler.flash('info');
            console.log(`Flash messages: ${messages}`);
            rl.close();
            return;
        }
        flashHandler.flash('info', input);
        prompt();
    });
}

prompt();
