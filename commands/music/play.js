const fs = require("fs");
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
require('dotenv').config();

module.exports = {
    name: "play",
    category: "music",
    description: "play music",
    usage: "<song>",
    run: async (cat, message) => {
        const youtube = new YouTube(process.env.API)
        const args = message.content.split(' ');
        const searchString = args.slice(1).join(" ");
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("what vc :3");
        const permissions = voiceChannel.permissionsFor(cat.user);
        if((!permissions.has('CONNECT')) || (!permissions.has('SPEAK'))) {
            return message.channel.send("no perms :3");
        }
        try {
            var video = await youtube.getVideo(url);
        } catch (error) {
            try {
                var videos = await youtube.searchVideos(searchString, 1);
                var video = await youtube.getVideoByID(videos[0].id);
            } catch (err) {
                return message.channel.send("could not find :3");
            }
        }
        const song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
        console.log(`song.url: ${song.url}`);
        try {
            var connection = await voiceChannel.join();
        } catch (error) {
            console.error("cant connect");
            return message.channel.send("I cant :3");
        }
        const dispatcher = connection.play(ytdl(`${song.url}`, {format: "mp3", filter: "audioonly"}))
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