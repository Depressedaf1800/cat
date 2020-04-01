//import libraries
const fs = require("fs");
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");

//import files
require('dotenv').config();

//module exports function for play
module.exports = {
    name: "play",
    category: "music",
    description: "play music",
    usage: "<song>",
    run: async (cat, message, args) => {

        //define const
        const youtube = new YouTube(process.env.API)
        const searchString = args.join(" ");

        //failsafe checks
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("which voice channel nya :3");
        const permissions = voiceChannel.permissionsFor(cat.user);
        if((!permissions.has('CONNECT')) || (!permissions.has('SPEAK'))) {
            return message.channel.send("I don't have the permissions :(");
        }

        //get link from arguments
        try {
            var video = await youtube.getVideo(searchString);
        } catch (error) {
            try {
                var videos = await youtube.searchVideos(searchString, 1);
                var video = await youtube.getVideoByID(videos[0].id);
            } catch (err) {
                return message.channel.send("I didn't get any results :(");
            }
        }

        //define song
        const song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
        };

        //join channel if not joined
        try {
            var connection = await voiceChannel.join();
        } catch (error) {
            return message.channel.send("I can't join :(");
        }

        //play song
        const dispatcher = connection.play(ytdl(`${song.url}`, {format: "mp3", filter: "audioonly"}))
            .on('end', () => {
                voiceChannel.leave();
            })
            .on('error', error => {
                console.error(error);
            });
        message.channel.send(`now playing ${song.title} nya :3`);
        dispatcher.setVolumeLogarithmic(5/5);
    }
}