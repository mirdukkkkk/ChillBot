const WordDetectorData = require('../utils/WordDetectorData');
const { PermissionFlagsBits } = require('discord.js')
const wait = require('util').promisify(setTimeout);

class WordDetectorService {
    constructor() {
        throw new TypeError(`Класс ${this.constructor.name} не может быть инициализирован!`);
    }

    static async msgReact(message) {
        if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionFlagsBits.AddReactions)) return;
        if(message.channel.id === "738534600174862389") return;
        const data = await message.client.database.collection('users').findOne({ id: message.author.id });
        if(!data.reactions) return;
        const args = message.content.trim().toLowerCase().split(/ +/g);
        WordDetectorData.msgReact.forEach((obj) => {
            obj.words.forEach(async(word) => {
                if(args.includes(word)) {
                    await message.react(obj.emoji);
                    await wait(1000);
                }
            });
        });
    }
}

module.exports = WordDetectorService;