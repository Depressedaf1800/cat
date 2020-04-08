// module export format for new commands
module.exports = {
    name: "notify",
    aliases: ["alert"],
    category: "notify",
    description: "add or remove notify role to self",
    usage: "<role name>",
    run: async (cat, message, args) => {

        //check role permissions function
        const checkPerms = (role) => role.permissions.has("ADMINISTRATOR") || role.permissions.has("KICK_MEMBERS") ||
        role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") ||
        role.permissions.has("SEND_MESSAGES") || role.permissions.has("CONNECT") || role.permissions.has("MANAGE_MESSAGES");

        //if there are arguments passed
        if(args[0]){

            //let role be found
            let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === args.join(" "));

            //if role is found
            if(role){

                //check for permissions
                if(checkPerms(role)) {
                    message.channel.send("thats not a notify role nya :3");
                } else {

                    //act accordingly
                    if(message.member.roles.cache.has(role.id)){
                        message.member.roles.remove(role)
                            .then(message.channel.send(`notify role for ${role.name} has been removed from ${message.member.displayName} :3`))
                            .catch(err => {
                                throw err;
                            });
                    } else {
                        message.member.roles.add(role)
                        .then(message.channel.send(`notify role for ${role.name} has been added to ${message.member.displayName} :3`))
                        .catch(err => {
                            throw err;
                        });
                    }
                }
            } else {
                message.channel.send("I can't find that role :(");
            }
        } else {
            message.channel.send("what role nya :3");
        }
    }
}