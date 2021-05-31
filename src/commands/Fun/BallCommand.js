const ChillBotComamnd = require('../../structures/ChillBotCommand');
const { MessageEmbed } = require('discord.js');

class BallCommand extends ChillBotComamnd {
    constructor() {
        super('8ball', {
            description: 'Отвечает на заданный вопрос',
            category: 'fun',
            args: true,
            usage: '<вопрос>',
            cooldown: 3
        });
    }

    async run(message, args) {
        const anwsers = [
            'Да.',
            'Нет.',
            'Точно нет!',
            'Точно да!',
            'Скорее нет, чем да.',
            'Скорее да, чем нет.',
            'Не знаю...',
            'Возможно.',
            'Невозможно!!!',
            'Частично.',
            'Точно сказать не могу, но вроде да.',
            'Точно сказать не могу, но вроде да.',
            'Степашка передал - нет.',
            'Картон передал - да.',
            'Морковка передал - возможно.'
        ];

        if(args.join(' ').length < 1024) return message.fail(`${message.client.settings.emojis.info} | Длинна вопроса не должна быть длинее 1204 символа!`);

        return message.reply(
            new MessageEmbed()
            .setTitle('🎱 | 8ball')
            .setColor(message.client.settings.colors.main)
            .addFields(
                { name: 'Вопрос', value: args.join(' '), inline: true },
                { name: 'Ответ', value: anwsers[Math.floor(Math.random() * answers.length)], inline: true }
            )
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
        );
    }
}