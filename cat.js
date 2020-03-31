//import libraries
const discord = require("discord.js");
const fs = require("fs").promises;
const path = require("path");

//import files
require('dotenv').config();

//define bot
const cat = new discord.Client();

//when bot on
cat.on('ready', () => {
    //console log when bot is online
    console.log(`${cat.user.username} said meow :3`);
});

//when message
cat.on('message', (message) => {

    //console log messages
    if(message.channel.type !== "dm") console.log(`${message.author.username} said ${message.content} in ${message.channel.name}`);
    else console.log(`${message.author.username} said ${message.content} in ${message.channel.type}`); 

    //failsafe check for bot replying self
    if(message.author.bot) return;

    //reply for hi
    if((message.content === "hi") || (message.content === "hey") || (message.content === "hello")){
        message.channel.send("meow :3");
    }

    //reply for smile
    if(message.content === ":)"){
        message.channel.send(":3");
    }

    //reply for cute
    if((message.content === "cute") || (message.content === "cutie")){
        message.channel.send("haha thank you :3");
    }

    //prefix check
    const prefix = "!";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd === "roll") {
        const rollDice  = () => Math.floor(Math.random() * 6) + 1;
        message.channel.send(`${message.author.username} rolled a ${rollDice()} 🎲`); 
    }

});

//bot login
cat.login(process.env.TOKEN);

