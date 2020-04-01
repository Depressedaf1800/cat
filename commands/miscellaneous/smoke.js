//import libraries
const fs = require("fs");
const ytdl = require("ytdl-core");

//module export function for smoke
module.exports = {
    name: "smoke",
    category: "miscellaneous",
    description: "quick preselected music",
    usage: "<song>",
    run: async (cat, message, args) => {

        //define array and choice
        const songs= [
            "https://www.youtube.com/watch?v=clU8c2fpk2s",
            "https://www.youtube.com/watch?v=X3MYWwS-Zrg",
            "https://www.youtube.com/watch?v=qr5z8RsxlvY"
        ];
        const select = songs[Math.floor(Math.random()*songs.length)];

        //failsafe checks
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("which voice channel nya :3");
        const permissions = voiceChannel.permissionsFor(cat.user);
        if((!permissions.has('CONNECT')) || (!permissions.has('SPEAK'))) {
            return message.channel.send("I don't have the permissions :(");
        }
        try {
            var connection = await voiceChannel.join();
        } catch (error) {
            return message.channel.send("I can't join :(");
        }

        //play song and settings
        const dispatcher = connection.play(ytdl(`${select}`, {format: "mp3", filter: "audioonly"}))
            .on('end', () => {
                voiceChannel.leave();
            })
            .on('error', error => {
                console.error(error);
            });
        dispatcher.setVolumeLogarithmic(5/5);
    }
}