//import libraries
const {MessageEmbed} = require("discord.js");
const {stripIndents} = require("common-tags");

// module export fucntion for help
module.exports = {
    name: "help",
    category: "help",
    description: "return information about all commands",
    usage: "[command name]",
    run: async (cat, message, args) => {
        //if argument provided
        if(args[0]) {
            message.channel.send("sorry, still coding");
        } else {

            //get categories of commands
            const commands = (category) => {
                return cat.commands
                        .filter(cmd => cmd.category === category)
                        .map(cmd => `- \`${cmd.name}\``)
                        .join("\n");
            }

            //get command files after categories
            const desc = cat.categories
                .map(cate => stripIndents`**${cate[0].toUpperCase() + cate.slice(1)}** \n${commands(cate)}`)
                .reduce((string, category) => string + "\n" + category);
            
            //reply with embed
            const embed = new MessageEmbed()
                .setTitle("All Categories and Commands")
                .setDescription(desc)
                .setFooter("use help with command name for specific command :3");
            message.channel.send(desc);
        }
    }
}