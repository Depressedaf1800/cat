module.exports = {
    name: "roll",
    aliases: ["dice"],
    category: "miscellaneous",
    description: "rolls a die",
    usage: "[args]",
    run: async (cat, message, args) => {  
        const rollDice  = () => Math.floor(Math.random() * 6) + 1;
        message.channel.send(`${message.author.username} rolled a ${rollDice()} 🎲`); 
    }
}