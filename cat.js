//import libraries
const discord = require("discord.js");
const fs = require("fs");
const path = require("path")
const ascii = require("ascii-table");

//import files
require('dotenv').config();

//define bot
const cat = new discord.Client();

//define collections
cat.commands = new discord.Collection();
cat.aliases = new discord.Collection();

//when bot on
cat.on('ready', async () => {
    //console log when bot is online
    console.log(`${cat.user.username} said meow :3`);

    //command handler
    const table = new ascii().setHeading("Commands", "Status");
    fs.readdirSync("./commands/").forEach(dir => {
        commands = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`./commands/${dir}/${file}`);
            if(pull.name) {
                cat.commands.set(pull.name, pull);
                table.addRow(file, "✔");
            } else {
                table.addRow(file, "❌");
                continue;
            }
            if (pull.aliases && Array.isArray(pull)) pull.aliases.forEach(alias => cat.aliases.set(alias, pull.name));
        }        
    })
    console.log(`${table}`);
});

//when message
cat.on('message', async message => {

    //console log messages
    if(message.channel.type !== "dm") console.log(`${message.author.username} said ${message.content} in ${message.channel.name}`);
    else console.log(`${message.author.username} said ${message.content} in ${message.channel.type}`); 

    //failsafe check for bot replying self
    if(message.author.bot) return;
    /*log messages
    if(message.guild) {
        console.log(`${message.author.username} said ${message.content} in ${message.channel.name}`);
        const logger = message.guild.channels.cache.find(channel => channel.id === 'ID_STRING');
        logger.send(`${message.author.username} said ${message.content} in ${message.channel.name}`);
    } else {
        console.log(`${message.author.username} said ${message.content} in dms`);
    }*/

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

    //process command
    if(cmd.length === 0) return;
    let command = cat.commands.get(cmd);
    if(!command) command = cat.commands.get(cat.aliases.get(cmd));
    if(command) command.run(cat, message, args);

});

//bot login
cat.login(process.env.TOKEN);

