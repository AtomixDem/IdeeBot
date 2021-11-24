const Discord = require('discord.js');

module.exports = {
    name: "invite",
    description: "Comando per ivitare il bot",
    aliases: ["invites"],
    execute(message, args) {

        var invite = new Discord.MessageEmbed()
            .setColor("#00ddff")
            .setTitle("INVITE ME")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=883413132314304572&permissions=76864&scope=bot%20applications.commands")
            .setDescription("Invite me to your magical server! 🔗\nhttps://bit.ly/ideeBot")

            .setFooter("Powered by IdeeBot#4456")
            .setTimestamp()

        message.channel.send(invite);

    }
}