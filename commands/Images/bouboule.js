const { MessageEmbed, MessageAttachment, SystemChannelFlags } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { duration } = require("../../handlers/functions")
const fs = require("fs");

const boubouleImg = new MessageAttachment('./assets/img/bouboule_' + fs.readdirSync("./assets/img").length + '.jpg');

module.exports = {
    name: "bouboule",
    category: "Images",
    aliases: [""],
    cooldown: 0,
    usage: "bouboule",
    description: "Sends a random bouboule image",
    run: async (client, message, args, user, text, prefix) => {
        try {
            message.channel.send(new MessageEmbed()
                .attachFiles(boubouleImg)
                .setDescription(`**${message.author.username}** a commandé une bouboule`)
            );
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            );
        }
    }
}
