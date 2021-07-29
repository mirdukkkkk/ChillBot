const WordDetectorData = require('../utils/WordDetectorData');

class WordDetectorService {
    constructor() {
        throw new TypeError(`Класс ${this.constructor.name} не может быть инициализирован!`);
    }

    static async msgReact(message) {
        
        if(message.channel.id == "738534600174862389") return;
        if(message.client.cooldowns.react.has(message.author.id)) return;
        //if(!await message.client.database.collection('users').findOne({ id: message.author.id }).reactions) return;
        WordDetectorData.msgReact.forEach((obj) => {
            obj.words.map(async(word) => {
                if(message.content.toLowerCase().includes(word)) try {
                    await message.react(obj.emoji);
                } catch {}
            });
        });
        setTimeout(() => message.client.cooldowns.react.delete(message.author.id), 10000);
        message.client.cooldowns.react.set(message.author.id, message.author.id);
    }
}

module.exports = WordDetectorService;