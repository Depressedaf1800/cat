//module export function for roll
module.exports = {
    name: "roll",
    aliases: ["dice"],
    category: "miscellaneous",
    description: "rolls a die",
    run: async (cat, message, args) => { 
        
        //define roll limits and reply
        const rollDice  = () => Math.floor(Math.random() * 6) + 1;
        message.channel.send(`${message.author.username} rolled a ${rollDice()} 🎲`); 
    }
}