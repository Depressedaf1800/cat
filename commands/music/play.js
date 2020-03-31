const fs = require("fs");
const ytdl = require("ytdl-core");

module.exports = {
    name: "play",
    category: "music",
    description: "play a song",
    usage: "<song>",
    run: async (cat, message, args) => {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("what vc :3");
        const permissions = voiceChannel.permissionsFor(cat.user);
        if((!permissions.has('CONNECT')) || (!permissions.has('SPEAK'))) {
            return message.channel.send("no perms :3");
        }
        try {
            var connection = await voiceChannel.join();
        } catch (error) {
            console.error("cant connect");
            return message.channel.send("I cant :3");
        }
        const dispatcher = connection.play(ytdl(`${args}`, {format: "mp3", filter: "audioonly"}))
            .on('end', () => {
                console.log("song ended");
                voiceChannel.leave();
            })
            .on('error', error => {
                console.error(error);
            });
        dispatcher.setVolume(0.15);
    }
}