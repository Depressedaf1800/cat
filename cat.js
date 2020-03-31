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
    if(message.content === "hi"){
        message.channel.send("meow :3");
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

//command handler
(async function commandHandler(dir = "commands") {
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) commandHandler(path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let cmd = file.substring(0, file.indexOf(".js"));
                let cmdModule = require(path.join(__dirname, dir, file));
                cat.commands.set(cmd, cmdModule);
            }
        }
    }
})()

//bot login
cat.login(process.env.TOKEN);

