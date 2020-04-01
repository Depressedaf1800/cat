const fs = require("fs");
const ytdl = require("ytdl-core");

module.exports = {
    name: "smoke",
    category: "miscellaneous",
    description: "quick preselected music",
    usage: "<song>",
    run: async (cat, message, args) => {
        const songs= [
            "https://www.youtube.com/watch?v=clU8c2fpk2s",
            "https://www.youtube.com/watch?v=X3MYWwS-Zrg"
        ];
        const select = songs[Math.floor(Math.random()*songs.length)];
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
        const dispatcher = connection.play(ytdl(`${select}`, {format: "mp3", filter: "audioonly"}))
            .on('end', () => {
                console.log("song ended");
                voiceChannel.leave();
            })
            .on('error', error => {
                console.error(error);
            });
        dispatcher.setVolumeLogarithmic(5/5);
    }
}