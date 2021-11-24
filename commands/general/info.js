const Discord = require('discord.js');

module.exports = {
    name: "info",
    description: "Comando info",
    aliases: ["information"],
    execute(message, args) {

        message.react("⏳");

        var info = new Discord.MessageEmbed()
            .setColor("#00ff55")
            .setTitle("INFO - MY BIOGRAPHY")
            .setDescription("Here is the main information about me. Write me `?help` privately to know my commands!\nIdeeBot#4456 is a simple bot to get server members to recommend ideas and put them to a vote.")

            .addField("📟 Version:", "`1.0`", true)
            .addField("📚 Autor:", "`AtomixDem#0001`", true)
            .addField("📩 Discord:", "https://discord.link/AtomixDem", true)
            .addField("📂 Repository:", "https://github.com/AtomixDem/IdeeBot", true)

            .setFooter("© 2021 - AtomixDem#0001")
            .setTimestamp()

        message.react("✅");

        message.author.send(info);

    }
}