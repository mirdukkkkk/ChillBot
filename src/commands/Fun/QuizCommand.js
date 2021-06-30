const { MessageEmbed } = require('discord.js');
const quiz = require('../../utils/ChillBotQuiz.json');
const ChillBotComamnd = require('../../structures/ChillBotCommand');

class QuizCommand extends ChillBotComamnd {
    constructor() {
        super('quiz', {
            description: 'Я задаю тебе вопрос, ты должен ответить на его правильно',
            aliases: ['qs'],
            category: 'fun',
            cooldown: 60
        });
    }

    async run(message, args) {
        let item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        }
        message.reply(item.question).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
                message.reply(`Правильный ответ!`);
            }).catch(collected => {
                message.reply('За 1 минуту никто так и дал правильного ответа.')
            })
        })
    }
}

module.exports = QuizCommand;