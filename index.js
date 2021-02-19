const { Client, Channel, DataResolver } = require("discord.js");
const { config }= require("dotenv");
const prefix = "-";

const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
});

client.on("ready", () => {
    console.log("I'm online");
});
client.on("message", async message => {
    if (message.author.bot) return;
    const ch = client.channels.cache.get("490179049495461909");
    var data = {
            "id": "",
            "text": "",
    };
    var txt = [];
    const args = message.content.slice(prefix.length).split(' ');
    const named = args[1].substring(args[1].lastIndexOf("!") + 1, args[1].lastIndexOf(">"));
    if (message.content.startsWith(prefix+'random')){
        if (args[1] === "@here" || args[1] === "@everyone"){ 
            ch.send("You haven't provided a valid user! (Te hülye geci)");
            return;
        }
        console.log(named);
        console.log(`${ch}`);
        ch.messages.fetch({ limit: 100 }).then(messages => {
            console.log(`Received ${messages.size} messages`);
            messages.forEach(function (message){
                data.id = message.author.id;
                data.text = message.content;
                if (data.id == named){
                    txt.push(data.text);
                }
            })
            var len = txt.length;
            var rnd = Math.floor(Math.random() * len);
            var number = rnd;
            console.log(txt[number]);
            const uzenet = {
                color: 0x0099ff,
                author: {
                    name: client.users.cache.get(`${named}`).username,
                },
                description: txt[number],
            }
            client.channels.cache.get("490179049495461909").send({embed: uzenet});
        })
    };
});
client.login(process.env.TOKEN);