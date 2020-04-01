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
        //create enbed
        const embed = new MessageEmbed();

        //if argument provided
        if(args[0]) {
            //find command
            const cmd = cat.commands.get(args.join(" ").toLowerCase()) || cat.commands.get(cat.aliases.get(args.join(" ").toLowerCase()));
            //check for command objects and add information accordingly
            if(!cmd) message.channel.send("no result for command nya :3");
            if (cmd.name) embed.addField(stripIndents`**Name**`, stripIndents`**${cmd.name}**`, true);
            if (cmd.aliases) embed.setDescription(stripIndents`**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`);
            if (cmd.usage) {
                embed.addField(stripIndents`**Usage**`, stripIndents`\`${cmd.usage}\``, true)
                    .setFooter(`syntax: <> = required, [] = optional :3`);
            }
            if (cmd.description) embed.addField(stripIndents`**Description**`,
                stripIndents`${cmd.description[0].toUpperCase() + cmd.description.slice(1)}`, false);

            //reply with embed
            message.channel.send(embed
                .setThumbnail(cat.user.displayAvatarURL())
                .setTitle("Information for:")
                .setColor("GREEN"));

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
            message.channel.send(embed
                .setThumbnail(cat.user.displayAvatarURL())
                .setTitle("Available Commands Nya")
                .setColor("GREEN")
                .setDescription(desc)
                .setFooter("use help with command name for specific command :3"));
        }
    }
}