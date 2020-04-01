//module export function for leave
module.exports = {
    name: "leave",
    category: "music",
    description: "stop music",
    run: async (cat, message, args) => {

        //failsafe checks
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("but you're not in the channel :3");

        //leave voice channel
        message.react("🐾");
        voiceChannel.leave();
        return undefined;
    }
}