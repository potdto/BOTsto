require("dotenv").config();
const tmi = require('tmi.js');

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    },
    channels: ['potsto_']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    if (self) return;

    if (message.match(/^i'?m/i)) {
        client.say(channel, "Hi " + message.split` `.slice(1).join` `+", I'm botsto!");
    }
});