const {MessageEmbed} = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "sad",
    aliases: ["sadmeme"],
    category: "miscellaneous",
    description: "returns a sad meme",  
    run: async (cat, message, args) => {
        const subReddits = [
            "sadmeme",
            "SadMemesForHipTeens",
            "depression_memes",
            "SadMemesForSadTeens",
            "SadWholesomeMemes",
            "depressionmeme",
            "depressionmemes"
        ];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setImage(img)
            .setFooter(`https://reddit.com/r/${random}`);

            message.channel.send(embed).then(embedMessage => {
                embedMessage.react("😭");
            });
    }
}