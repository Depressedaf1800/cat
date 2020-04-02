//import libraries
const {MessageEmbed} = require("discord.js");
const {stripIndents} = require("common-tags");

// module export format for new commands
module.exports = {
    name: "info",
    aliases: ["user"],
    category: "info",
    description: "returns user profile",
    usage: "[mention | id]",
    run: async (cat, message, args) => {

        const embed = new MessageEmbed()
            .setColor("BLUE");

        if(args[0]){
            let member = message.guild.members.cache.get(args[0]);
            if(!member && message.mentions.members){
                member = message.mentions.members.first();
            }
            if(!member) return;
            message.channel.send(embed
                .setThumbnail(member.user.displayAvatarURL())
                .setDescription(stripIndents`**USER IDENTITY CARD**\nName: **\`${member.user.username}\`**`)
                .addField(`${member.user.id}`, "IIIIIIIII IIIII I III IIII II II")
                .setFooter(`bank-account#${member.user.discriminator}`, cat.user.displayAvatarURL()));
        } else {
            message.channel.send(embed
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(stripIndents`**USER IDENTITY CARD**\nName: **\`${message.author.username}\`**`)
                .addField(`${message.author.id}`, "IIIIIIIII IIIII I III IIII II II")
                .setFooter(`bank-account#${message.author.discriminator}`, cat.user.displayAvatarURL()));
        }
    }
}