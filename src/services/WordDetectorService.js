const WordDetectorData = require('../utils/WordDetectorData');
const { PermissionsBitField } = require('discord.js')

class WordDetectorService {
    constructor() {
        throw new TypeError(`Класс ${this.constructor.name} не может быть инициализирован!`);
    }

    static async msgReact(message) {
        if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.AddReactions)) return;
        if(message.channel.id === "738534600174862389") return;
        const data = await message.client.database.collection('users').findOne({ id: message.author.id });
        if(!data.reactions) return;
        const args = message.content.trim().toLowerCase().split(/ +/g);
        WordDetectorData.msgReact.forEach((obj) => {
            obj.words.map(async(word) => {
                if(args.includes(word)) await message.react(obj.emoji);
            });
        });
    }
}

module.exports = WordDetectorService;