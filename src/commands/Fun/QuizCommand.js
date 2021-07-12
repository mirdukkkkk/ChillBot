const { MessageEmbed } = require('discord.js');
const quiz = require('../../utils/ChillBotQuiz.json');
const ChillBotComamnd = require('../../structures/ChillBotCommand');

class QuizCommand extends ChillBotComamnd {
    constructor() {
        super('quiz', {
            description: 'Я задаю тебе вопрос, ты должен ответить на его правильно',
            aliases: ['qz'],
            category: 'fun',
            cooldown: 5
        });
    }

    async run(message, args) {
        if(message.client.cooldowns.quiz.has(message.author.id)) return message.react('⏱️').catch();
        message.client.cooldowns.quiz.set(message.author.id, message.author.id);
        let item = quiz[Math.floor(Math.random() * quiz.length)];
        const creator = message.guild.members.cache.get(item.created);
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        }
        message.reply(new MessageEmbed().setTitle('Вопрос').setColor(message.client.settings.colors.main).setDescription(item.question).setFooter(`Автор вопроса: ${creator.nickname || creator.user.username}`, creator.user.displayAvatarURL({ dynamic: true })).setTimestamp()).then((msg) => {
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
                collected.first().reply(`Правильный ответ!`);
                message.client.cooldowns.quiz.delete(message.author.id);
            }).catch(collected => {
                msg.reply('За 30 секунд никто так и дал правильного ответа.');
                message.client.cooldowns.quiz.delete(message.author.id);
            });
        });
    }
}

module.exports = QuizCommand;