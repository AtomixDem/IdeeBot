const Discord = require('discord.js');

module.exports = {
    name: "problem",
    description: "Comando per i problemi comuni",
    aliases: [],
    execute(message, args) {

            message.react("⏳");
        
        var problem = new Discord.MessageEmbed()
            .setColor("#00ff55")
            .setTitle("PROBLEMS - COMMON PROBLEMS")
            .setDescription("If you have any problems with the bot (it does not send messages, it does not work, etc.) it is mainly because it does not have certain permissions. Here is the list of permissions it must have to work properly:\n✅ **View Channels**\n✅ **Send Messages**\n✅ **Manage Messages**\n✅ **Add Reactions**")

            .setFooter("Powered by IdeeBot#4456")
            .setTimestamp()
            message.react("✅");
            message.author.send(problem);

        }
    }