const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "Comando Help",
    aliases: [],
    execute(message, args) {

            message.react("⏳");
        
        var help = new Discord.MessageEmbed()
            .setColor("#00ff55")
            .setTitle("HELP - HERE ARE MY COMMANDS")
            .setDescription("**•** My main prefix is `?`\n**•** For any problem contact *AtomixDem#0001*.")

            .addField("💭 Help", "`?help`", true)
            .addField("💁 Info", "`?info`", true)
            .addField("🔗 Invite me", "`?invite`", true)
            .addField("🚫 Problems", "`?problem`", true)
            .addField("💡 New Idea", "`?idea <text>`", true)

            .setFooter("Powered by IdeeBot#4456")
            .setTimestamp()
            message.react("✅");
            message.author.send(help);

        }
    }