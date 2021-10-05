const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const axios = require('axios');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const { TOKEN, PREFIX } = require("./config.json");

const client = new Discord.Client();
require('discord-buttons')(client)
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
// CONSOLE
const tempsEnMs = new Date().toUTCString()
client.on("ready", () => { const preet = new Discord.MessageEmbed()
.setTitle("***BOT Started***  :white_check_mark:")
.setDescription(tempsEnMs)
.setImage("https://raw.githubusercontent.com/YassSSH/YassSSH/master/standard%20(1).gif")
.setColor("#57F287")
.setFooter("Yass#2255")
const channel = client.channels.cache.find(channel => channel.name === "logs")
channel.send(preet)
})


client.on("error", () => console.error);
client.on("warn", () => console.warn);
client.on("debug", console.log);
client.login(TOKEN);



client.on("message", async msg => {
    // SETUP CMD
    if (msg.author.bot) return;
    if (msg.content.indexOf(PREFIX) !== 0) return;
    const args = msg.content.slice(PREFIX.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();

    // AVATAR
    if (cmd === 'pp') {
        msg.reply(msg.author.displayAvatarURL({ size: 256 }));
    }
    // EMBEDS

    if (cmd === 'info') {
        const embed = new Discord.MessageEmbed()
            .setTitle(msg.guild.owner.user.tag)
            .setThumbnail(msg.author.displayAvatarURL({ size: 256 }))
            .addField("Membres : ", msg.guild.memberCount, true)
            .addField("Patron : ", msg.guild.owner.user.tag, true)
            .setTimestamp()
            .setImage("https://media.discordapp.net/attachments/701094601338912768/849983470083637338/1500x500.png?width=1440&height=480")
            .setFooter("Yass#2255")
            .setFooter(msg.guild.owner.user.tag, msg.guild.owner.user.avatarURL())
            .setColor(7419530)

        msg.channel.send(embed)
    };
    // UwU
    if (cmd === 'uwu') { msg.channel.send("https://cdn.discordapp.com/attachments/809507750827917324/850304600031494164/UwUU.mp4") };

    // API
    if (cmd === 'rdm') {
        const fetch = require('node-fetch');

        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        const embed = new Discord.MessageEmbed()
            .setImage(file)
            .setFooter("Yass#2255")
            .setFooter(msg.guild.owner.user.tag, msg.guild.owner.user.avatarURL())
            .setTitle("API CAT")
            .setTimestamp()
            .setThumbnail(msg.author.displayAvatarURL({ size: 256 }))

        msg.channel.send(embed)
    };
    // IP LOOKUP

    if (cmd === 'ip') {
        snekfetch.get(`http://ip-api.com/json/${args}`).then(r => {
            let ip = new Discord.MessageEmbed()
                .setTimestamp()
                .setThumbnail(msg.guild.owner.user.displayAvatarURL({ size: 256 }))
                .setTitle(`**Ip LookUp by Yass#2255**`)
                .setDescription(`**__IP Information__**
      **Looked Up IP**: ${r.body.query}
      **ASN**: ${r.body.as}
      **Pays**: ${r.body.country}
      **Region** : ${r.body.regionName}
      **Ville**: ${r.body.city}
      **ORG**: ${r.body.org} 
      **ISP**: ${r.body.isp} 
      **Timezone**: ${r.body.timezone}
      **Latitude** : ${r.body.lat}
      **Longitude** : ${r.body.lon}
      `)
                .setImage("https://raw.githubusercontent.com/YassSSH/YassSSH/master/standard%20(1).gif")
                .setFooter(`Yass#2255`)
                .setColor('RANDOM')
                .setFooter(msg.guild.owner.user.tag, msg.guild.owner.user.avatarURL());
            const button = new MessageButton()
                .setStyle("url")
                .setLabel("Invitez le Bot")
                .setURL("https://discord.com/api/oauth2/authorize?client_id=850289995226284035&permissions=0&scope=bot")

            const button1 = new MessageButton()
                .setStyle("url")
                .setLabel("GitHub")
                .setURL("https://github.com/YassSSH")

            const button2 = new MessageButton()
                .setStyle("url")
                .setLabel("Twitch")
                .setURL("https://www.twitch.tv/yassssh")

            let row = new MessageActionRow()
                .addComponent(button)
                .addComponent(button1)
                .addComponent(button2)
            msg.channel.send({ component: row, embed: ip })
        })
    };
    // API COIN

    if (cmd === 'c') {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${args}&vs_currencies=eur`)
        let coin = new Discord.MessageEmbed()
            .setTimestamp()
            .setThumbnail(msg.guild.owner.user.displayAvatarURL({ size: 256 }))
            .setTitle(`**Coin Show by Yass#2255**`)
            .setColor("#F1C40F")
            .setDescription(`**Coin Information**
                **Coin**: ${args}
                **Prix**: ${data[args]['eur']}`,"€")
            .setImage("https://raw.githubusercontent.com/YassSSH/YassSSH/master/standard%20(1).gif")
            .setFooter(`Yass#2255`)
            .setColor('RANDOM')
            .setFooter(msg.guild.owner.user.tag, msg.guild.owner.user.avatarURL());
        const button = new MessageButton()
            .setStyle("url")
            .setLabel("Invitez le Bot")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=850289995226284035&permissions=0&scope=bot")

        const button1 = new MessageButton()
            .setStyle("url")
            .setLabel("GitHub")
            .setURL("https://github.com/YassSSH")

        let row = new MessageActionRow()
            .addComponent(button)
            .addComponent(button1)

        msg.channel.send({ component: row, embed: coin })

    };
    if (cmd === "clear") {
    msg.channel.bulkDelete(10)
  .then(messages => msg.channel.send(`${messages.size} messages were deleted`))
  .catch(console.error);
    }

// PUPPETEER 
const { SIGTERM } = require("constants");
const puppeteer = require("puppeteer");
fs = require('fs');

const url = "https://weather.com/fr-FR/temps/aujour/l/48.57,7.75?par=google";
if (cmd === "meteo"){
(async() => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await msg.channel.send("**[#.......................]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[##......................]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[###.....................]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[####....................]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[#####...................]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[######..................]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[#######.................]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[########................]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[#########...............]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[##########..............]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[###########.............]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[############............]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[#############...........]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[##############..........]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[###############.........]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[################........]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[#################.......]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[##################......]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[###################.....]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[####################....]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[#####################...]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[######################..]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[#######################.]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("**[########################]**").then(msg=>msg.delete({timeout:"500"}))
    await msg.channel.send("Done :white_check_mark: ").then(msg=>msg.delete({timeout:"1000"}))

    await page.setViewport({
        width: 1280,
        height: 1400,
    });
    page.click("button.truste-button2")
    await page.screenshot({
        path: "C:/Users/Flaquito/Documents/Bot-Discord-IP-LookUp-main/image/image.png",
    })

    msg.channel.send("**La méteo d'aujourd'hui est :**", { files: ["./image/image.png"] });
        
          await browser.close()
            console.log("End")
            
        })();
}});




    // HTML code grabber
    // let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    // fs.writeFile('htmlcode.txt', bodyHTML, function(err) { err = null });

// CODE BY YassSSH, Yass#2255 on discord
