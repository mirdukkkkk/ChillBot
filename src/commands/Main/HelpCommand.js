const { MessageEmbed } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class HelpCommand extends ChillBotCommand {
    constructor() {
        super('help', {
            description: 'Помощь по командам',
            category: 'main',
            usage: '[команда]',
            cooldown: 3
        });
    }

    async run(message, args) {
        const categories = [
            {
                name: 'Основное',
                key: 'main',
                description: 'Основной модуль бота'
            },
            {
                name: 'Развлечения',
                key: 'fun',
                description: 'Модуль для развлечения'
            }
        ];

        const data = message.client.settings.guild;

        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle(`${message.client.settings.emojis.info} | Помощь по командам`)
            .setColor(message.client.settings.colors.main)
            .setDescription()
        }
    }
}