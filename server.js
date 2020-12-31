require("express")().listen(1343); 

const db = require("quick.db");
const discord = require("discord.js"); 
const client = new discord.Client({ disableEveryone: true }); 
client.login("NzE5NjMxNjM0NTA0MDg5NjQy.Xt6PLw.ocq8W3I2hk2JWtkoeGB0QD_BZ5s");
const fetch = require("node-fetch");
const fs = require("fs"); 

setInterval(() => {
  var links = db.get("linkler"); 
  if (!links) return;
  var linkA = links.map(c => c.url); 
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Başarıyla Pinglendi."); 
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    
    db.set("linkler", []);
  } 
});

client.on("ready", () => {
  client.user.setActivity(`wu!yardım | 7/24 Uptime`); 
  console.log(`Logined`); 
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "wu!ekle") {
    var link = spl[1]; 
    fetch(link)
      .then(() => {
        
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
          return message.channel.send("**⛔ Bu bot zaten uptime ediliyor.**"); 

        let yardım = new Discord.RichEmbed() 
          .setAuthor(client.user.username)
          .setColor(0x6a3db8)
          .setDescription("**✅ Başarılı! Projeniz artık 7/24 Aktif!**") 
          .setFooter(`© ${client.user.username}`)
          .setTimestamp();
        message.channel.send(yardım).then(msg => msg.delete(60000)); 
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        let yardım = new Discord.RichEmbed() 
          .setAuthor(client.user.username)
          .setColor(0x6a3db8)
          .setDescription(
            "⛔ **Hata! Sadece düzgün url'ler ekleyebilirsiniz.**"
          ) 
          .setFooter(`© ${client.user.username}`)
          .setTimestamp();
        return message.channel.send(yardım).then(msg => msg.delete(60000)); 
      }); 
  }
});

client.on("message", message => {
  
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "wu!botsay") {
    
    var link = spl[1];
    message.channel.send(`**${db.get("linkler").length} Proje 7/24 aktif ediliyor!**`); 
  }
});

const Discord = require("discord.js");

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "wu!yardım") {
    let embed = new Discord.RichEmbed() 
      .setColor("#1d1d1d")

      .setDescription(

        `**Uptime komudunu kullandıktan sonra sisteme eklenmesi için 5-10 dakika bekleyin.**
:point_down: %100 Verim Almak İçin Yazıların Üstüne Tıklayın
[Discord Sunucumuz](https://discord.gg/asywdX3htT)
[Wraith Uptime Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=719631634504089642&scope=bot&permissions=27648) \n   \n 
 :bust_in_silhouette: **wu!yardım** : Botun yardım menüsünü açar.

 🔋 **wu!ekle <link>** : Eklediğiniz proje linkini 7/24 açık yapar.

 ⚡ **wu!botsay** : Botumuzla uptime olan proje sayısını gösterir.

 👍 Uptime'dan %100 verim almak için Discord sunucumuza gelip botumuzu sunucunuza ekleyebilirsiniz!

`
      )
      .setAuthor(`Wraith Uptime | Yardım Menüsü`, client.user.avatarURL)
      .setFooter(`Wraith Uptime`) 
      .setImage(
        `https://cdn.glitch.com/998c754f-4c25-47dc-bd20-bbaad0b73275%2FWraithLogoMain.png?v=1609403086736`
      );
    return message.channel.send(embed); 
  }
});
const log = message => {
  
  console.log(`${message}`);
};

client.on("message", message => {
  
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "wu!botbilgi") {
    var link = spl[1];
    message.channel.send(`***yakında!***`); 
  }
});


//BOTDM//

client.on("message", msg => {
  var dm = client.channels.get("794116661014954015")
  if(msg.channel.type === "dm") {
  if(msg.author.id === client.user.id) return;
  const botdm = new Discord.RichEmbed()
  .setTitle(`${client.user.username} Dm`)
  .setTimestamp()
  .setColor("#1d1d1d")
  .setThumbnail(`${msg.author.avatarURL}`)
  .addField("Gönderen", msg.author.tag)
  .addField("Gönderen ID", msg.author.id)
  .addField("Gönderilen Mesaj", msg.content)
  
  dm.send(botdm)
  
  }
  if(msg.channel.bot) return;
  });

//BOTDM//