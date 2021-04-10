global.Discord = require("discord.js");
global.Mongo = require("mongoose");
const fs = require("fs");
const ms = require("ms");
const settings = require("./database/settings.json");
const bot = new Discord.Client({
  intents: Intents.ALL,
  allowedMentions: {
    parse: []
  }
});
bot.commands = new Discord.Collection();

Mongo.connect(settings.DataBaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
Mongo.connection.on("connected", () => {
  console.log("[?] База данных подключена");
});

fs.readdirSync("./commands").forEach( (module) => {
  const CommandFiles = require(`./commands/${module}`).filter(file => file.endsWith(".js"));
  for(const file of CommandFiles) {
    const command = require(`./commands/${module}/${file}`);
    command.category = module;
    bot.commands.set(command.name, command);
  }
});

const EventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for(const file of EventFiles) {
  const event = require(`./events/${file}`);
  if(event.once == true) {
    bot.once(event.name, (...args) => event.execute(...args, bot));
  } else if(event.once == false) {
    bot.on(event.name, (...args) => event.extends(...args, bot));
  } else {
    console.log(`[!] Событие ${file} не загружено`);
  }
}