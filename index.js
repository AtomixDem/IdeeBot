const Discord = require('discord.js');
global.client = new Discord.Client({
    intents: ["MESSAGE_CREATE", "TYPING_START", "MESSAGE_REACTION_ADD", "MESSAGE_DELETE", "MESSAGE_DELETE_BULK", "GUILD_MEMBER_UPDATE", "THREAD_MEMBERS_UPDATE"],
});
const antiSwearWords = require("anti-swear-words-packages-discord")

client.login("TOKEN_HERE");

const fs = require("fs");

const MongoClient = require("mongodb").MongoClient;




client.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const eventsFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventsFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args))
}

client.on("message", message => {
    const prefix = "?";

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

    var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

    if (comando.onlyStaff) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("Non hai il permesso! 😶")
            return
        }
    }

    if (comando.onlyMod) {
        if (!message.member.hasPermission("KICK_MEMBERS", "BAN_MEMBERS", "MUTE_MEMBERS", "MANAGE_MESSAGES")) {
            message.channel.send("Non hai il permesso! 😶")
            return
        }
    }

    comando.execute(message, args);
})




var urldb = "mongodb+srv://atomixdem:Simone28$@clusterideebot.wh1hi.mongodb.net/test"
MongoClient.connect(urldb, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    var database = db.db("IdeeBot");

    client.on("message", message => {
        if (message.content.startsWith("?idea")) {
            var embedIdeaWrongFormat = new Discord.MessageEmbed()
            .setColor("#f53333")
            .setTitle("🚫 Wrong format!")
            .setDescription("Wrong format for your idea!\nUse: `?idea <text>`\nFor more help write me **?help**")
            .setFooter("Powered by Idee Bot")
            .setTimestamp();

        var idea = message.content.slice(6);

        if(!idea) {
            message.channel.bulkDelete(1, true);
            message.channel.send(embedIdeaWrongFormat)
            .then(msg =>{
            msg.delete({timeout:30000})
            })
            return;
        }

        var embedIdea = new Discord.MessageEmbed()
            .setColor("#7a33f5")
            .setTitle("💡 New idea!")
            .setDescription(idea)
            .setFooter("Powered by IdeeBot#4456")
            .setTimestamp();


        message.channel.bulkDelete(1, true);

        var server = message.member.guild;
        var botCount = server.members.cache.filter(member => member.user.bot).size;
        var userCount = server.memberCount - botCount;
        var userTotal = server.memberCount

        var serverName = server.name
        var serverOwner = server.owner.user.username
        var serverId = server.id
        var serverRegion = server.region
        var serverCreated = server.createdAt.toDateString()
        var levelBoost = server.premiumTier
        var serverBoost = server.premiumSubscriptionCount

        database.collection("Idee").insertOne({ServerName:serverName, ServerID:serverId, ServerRegion:serverRegion, ServerCreated:serverCreated, OwnerServer:serverOwner, ServerBotCount:botCount, ServerUserCount:userCount, ServerTotalUser:userTotal, LevelBoost:levelBoost, ServerBoost:serverBoost, Idea:idea})

        message.channel.send(embedIdea)
        .then(function (message) {
            message.react("👍");
            message.react("👎");
        })
        }
    })

})
