const WordDetectorData = require('../utils/WordDetectorData');

class WordDetectorService {
    constructor() {
        throw new TypeError(`Класс ${this.constructor.name} не может быть инициализирован!`);
    }

    static async msgReact(message) {
        if(message.channel.id === "738534600174862389") return;
        if(!await message.client.database.collection('users').findOne({ id: message.author.id }).reactions) return;
        const args = message.content.trim().toLowerCase().split(/ +/g);
        WordDetectorData.msgReact.forEach((obj) => {
            obj.words.map(async(word) => {
                if(args.includes(word)) await message.react(obj.emoji);
            });
        });
    }
}

module.exports = WordDetectorService;