//module export function for ping
module.exports = {
    name:"ping",
    aliases:["latency"],
    category:"info",
    description:"returns ping",
    run: async (bot, message, args) => {

        //send message and edit
        const msg = await message.channel.send("...pinging 🏓 :3");
        msg.edit(`${Math.round(bot.ws.ping)}ms pong :3`);
    }
}