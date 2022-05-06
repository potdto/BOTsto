import dotenv from "dotenv";
dotenv.config();
import { Client } from 'tmi.js';
import fetch from "node-fetch";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function executeAPL(code) {
    const res = await fetch("https://tryapl.org/Exec", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(['', 0, '', code]),
    });
    const data = await res.json();
    return data[3];
}


const client = new Client({
    options: { debug: true },
    identity: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    },
    channels: ['potsto_']
});

client.connect();

client.on('message', async (channel, tags, message, self) => {
    if (self) return;
    if (message.match(/^i'?m/)) {
        client.say(channel, "Hi " + message.split` `.slice(1).join` ` + ", I'm botsto!");
    }

    if (message == "!ping")
        client.say(channel, "pong");

    if (message == "!8ball")
        client.say(channel,
            ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes, definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."][Math.floor(Math.random() * 20)]
        );

    if (message.startsWith("!pyramid ")) {
        const argument = message.split(" ")[1];

        client.say(channel, argument);
        await delay(1000);
        client.say(channel, argument + " " + argument);
        await delay(1000);
        client.say(channel, argument + " " + argument + " " + argument);
        await delay(1000);
        client.say(channel, argument + " " + argument);
        await delay(1000);
        client.say(channel, argument);

    }
    if (message.startsWith("!calc ")) {
        const argument = message.split(" ")[1];
        client.say(channel,
                String(await executeAPL(argument))
            );
    }
});