const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on('ready', () => {
  console.log('I am ready!');
});
bot.login('ODIxMDYxNjczNTAyMzc1OTU4.YE-PRQ.Qvn-Qie9-bmhNMQBFJvcn5kuB10');

bot.on('message', (message) => {
	if (message.content == '?time') {
		var data = new Date();
		var ora = data.getHours();
		var minuto = data.getMinutes();

		message.channel.send('ORA ATTUALE :alarm_clock: :' + ora + ':' + minuto);
	}
});



bot.on("message", (message) => {
    if (message.content.startsWith("?ban")) {
        var utenteBan = message.mentions.members.first();

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send(' > You dont have permission to run this command!');
            return;
        }

        if (!utenteBan) {
            message.channel.send('> Please mention the user you wont to ban!');
            return;
        }

        if (!utenteBan.kickable) {
            message.channel.send(' > I dont have the permission!');
            return;
        }

        utenteBan.ban()
            .then(() => message.channel.send("<@" + utenteBan + ">" + "has been banned!"))

    }
})


bot.on("message", (message) => {
    if (message.content.startsWith("?kick")) {
        var utenteKick = message.mentions.members.first();

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send(' > You dont have permission to run this command!');
            return;
        }

        if (!utenteKick) {
            message.channel.send('> Please mention the user you wont to kick!');
            return;
        }

        if (!utenteKick.kickable) {
            message.channel.send(' > I dont have the permission!');
            return;
        }

        utenteKick.kick()
            .then(() => message.channel.send("<@" + utenteKick+ ">" + "has been kicked"))
    }
})

bot.on("message", message => {
    if (message.content.startsWith("?purge")) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('> You dont have the permission for to execute this command');
            return;
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(' > I dont have the permission for to execute this command');
            return;
        }

        var count = message.content.slice(7);
        count = parseInt(count);

        if (!count) {
            message.channel.send(" > Please enter a valid number")
            return
        }

        message.channel.bulkDelete(count, true)
        message.channel.send("The message has been cut").then(msg => {
            msg.delete({ timeout: 5000 })
        })

    }
})



bot.on("message", message => {
    if (message.content == "?serverinfo") {
        var server = message.member.guild;

        var botCount = server.members.cache.filter(member => member.user.bot).size;
        var utentiCount = server.memberCount - botCount;

        var categoryCount = server.channels.cache.filter(c => c.type == "category").size
        var textCount = server.channels.cache.filter(c => c.type == "text").size
        var voiceCount = server.channels.cache.filter(c => c.type == "voice").size

        var embed = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription("**SERVER INFO**")
            .setThumbnail(server.iconURL())
            .addField("Owner", "```" + server.owner.user.username + "```", true)
            .addField("Server id", "```" + server.id + "```", true)
            .addField("Server region", "```" + server.region + "```", true)
            .addField("Members", "```Total: " + server.memberCount + " - Users: " + utentiCount + " - Bots: " + botCount + "```", false)
            .addField("Channels", "```Category: " + categoryCount + " - Text: " + textCount + " - Voice: " + voiceCount + "```", false)
            .addField("Server created", "```" + server.createdAt.toDateString() + "```", true)
            .addField("Boost level", "```Level " + server.premiumTier + " (Boost: " + server.premiumSubscriptionCount + ")```", true)

        message.channel.send(embed)

    }
});

bot.on("message", message => {
    if (message.content.startsWith("?userinfo")) {
        if (message.content == "?userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("User not found")
            return
        }

        var elencoPermessi = "";
        if (utente.hasPermission("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";

        }else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

            for (var i = 0; i < permessi.length; i++) {
                if (utente.hasPermission(permessi[i])) {
                    elencoPermessi += "- " + permessi[i] + "\r";
                }
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription(" **USER INFO**")
            .setThumbnail(utente.user.avatarURL())
            .addField("User id", "```" + utente.user.id + "```", true)
            .addField("Status", "```" + utente.user.presence.status + "```", true)
            .addField("Is a bot?", utente.user.bot ? "```Yes```" : "```No```", true)
            .addField("Account created", "```" + utente.user.createdAt.toDateString() + "```", true)
            .addField("Joined this server", "```" + utente.joinedAt.toDateString() + "```", true)
            .addField("Permissions", "```" + elencoPermessi + "```", false)
            .addField("Roles", "```" + utente.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false)

        message.channel.send(embed)

    }
})

bot.on("message", message => {
    if (message.content.startsWith("?avatar")) {
        if (message.content.trim() == "?avatar") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("User not found")
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("**USER AVATAR**")
            .setImage(utente.user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 512
            }))

        message.channel.send(embed)
    }
})

bot.on("message", message => {
    if (!message.guild) return;
    if (message.content.startsWith("?warn")) {
    var argomenti = message.content.slice(5).trim().split(' ');
    var utente = message.mentions.members.first();

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send('You dont have the permission');
        return;
    }

    if (!utente) {
        message.channel.send("Please mention the user you want to warn")
        return
    }

    if (argomenti.length == 1) {
        message.channel.send("Please enter a reason.")
        return
    }

    var reason = "";
    for (var i = 1; i < argomenti.length; i++) {
        reason += argomenti[i] + " ";
    }

     utente.send(utente.toString() + "You has been warned by: " +  message.author.toString() + " \nFor " + reason + "").then(message.channel.send(utente.toString() + " É stato avvisato da " + message.author.toString() + "    \n\n𝗥𝗲𝗮𝘀𝗼𝗻: " + reason + ""))

 }
 })

 bot.on("guildMemberAdd", (member) => {
    bot.channels.cache.get("822930147221045258").send("Ciao " + member.toString() + " benvunuto in **" + member.guild.name + "**\rSei il **" + member.guild.memberCount + "° membro**");
})

bot.on('message', (message) => {
    if (!message.guild) return;
    if (message.content.startsWith("?report")) {

        var embed = new Discord.MessageEmbed() 
        .setDescription("Report sent to the staff !!!")

        message.channel.send(embed)  

        var  canale = bot.channels.cache.get("822930188404654120"); 

        const args = message.content.split(" ").slice(1); 

         var content = args.join(" "); 

         canale.send(message.author.tag + " ha segnalato qualcosa! Cosa ha segnalato?" + " " +  content);  
        }
 });
 
 