module.exports = {
    name: "stop",
    category: "music",
    description: "stop music",
    run: async (cat, message, args) => {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("you''re not in the vc :3");
        voiceChannel.leave();
        return undefined;
    }
}