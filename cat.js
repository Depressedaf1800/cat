//import libraries
const discord = require("discord.js");
const mysql = require("mysql");
const fs = require("fs");
const path = require("path")
const {stripIndents} = require("common-tags");
const YouTube = require("simple-youtube-api");
const randomPuppy = require("random-puppy");
const ascii = require("ascii-table");

//import files
require('dotenv').config();

//define bot
const cat = new discord.Client();

//define classes and etc
cat.commands = new discord.Collection();
cat.aliases = new discord.Collection();
cat.categories = fs.readdirSync("./commands/");

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
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => cat.aliases.set(alias, pull.name));
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
    
    //switch case for chat
    let chat = message.content.toLowerCase().split(" ");
    switch(chat[0]){
        //reply for cat
        case "cat": case "kitty": case "catto":
            console.log(chat.slice(1, 4).join(" "));
            if((chat.slice(1, 4).join(" ") === "how are you") || (chat.slice(1, 4).join(" ") === "how are you?")) {
                message.channel.send("great nya :3");
            } else { 
                message.channel.send("mhm?"); 
            }
            break;
        //reply for hi
        case "hi": case "hello": case "hey": case "meow": case "aw": case "aww": case "awww":
            message.channel.send("meow :3");
            break;
        //reply for smile
        case ":)": case "🙂": case "😄":
            message.channel.send(":3");
            break;
        //reply for frown
        case ":(": case ":'(": case "😢":
            message.react("😭");
            break;
        //reply for cute
        case "cute": case "cutie": case "cutiepie": case "qtpie": case "qt": case "kawaii":
            message.channel.send("haha thank you :3");
            message.react("😊");
            break;
        /*reply for morning greetings
        case "goodmorning": case "morning": case "morn": case "gdmorning":
            message.channel.send("goodmorning :3");
            message.react("😪");
            break;
        case "good":
            if((chat.slice(1, 3).join(" ") === "morning everyone") || (chat.slice(1, 2).join(" ") === "morning") ||
                (chat.slice(1, 3).join(" ") === "morning cat") || (chat.slice(1, 3).join(" ") === "morning catto") ||
                (chat.slice(1, 3).join(" ") === "morning kitty")) {
                message.channel.send("goodmorning :3");
                message.react("😪"); 
            } else {
                return;
            }
            break;
            */
    }

    //prefix check
    const prefix = "!";
    if(!message.content.startsWith(prefix)) return;
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

