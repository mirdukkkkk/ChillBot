const { EmbedBuilder } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class BallCommand extends ChillBotCommand {
    constructor() {
        super('ball', {
            description: 'Отвечает на заданный вопрос',
            category: 'fun',
            usage: '<вопрос>',
            cooldown: 3
        });
    }

    async run(message, args) {
        if(!args.join(' ')) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Введите ваш вопрос!`, message);
        if(args.join(' ').length > 1024) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Длинна вопроса не должна быть длинее 1024 символа!`, message);
        
        const answers = message.client.constants.answersBall;

        return message.reply(
            {
                embeds: [
                    new EmbedBuilder()
                    .setTitle('🎱 | 8ball')
                    .addFields(
                        { name: 'Вопрос', value: args.join(' '), inline: true },
                        { name: 'Ответ', value: answers[Math.floor(Math.random() * answers.length)], inline: true }
                    )
                    .setColor(message.client.constants.colors.main)
                    .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()
                ]
            }
        );
    }
}

module.exports = BallCommand;