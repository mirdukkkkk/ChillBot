const ChillBotCommand = require('../../structures/ChillBotCommand');
const { MessageEmbed, Util } = require('discord.js');

class EmojiCommand extends ChillBotCommand {
    constructor() {
        super('emoji', {
            description: 'Команда, с помощью которой можно воровать эмоджи',
            category: 'utils',
            usage: '<эмоджи>',
            cooldown: 3
        });
    }

    async run(message, args) {
        if(!args[0]) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Укажите эмоджи, который вы хотите украсть!`, message);
        const emoji = Util.parseEmoji(args[0]);
        if(emoji.id !== null && emoji.name !== null) return message.reply({ embeds: [new MessageEmbed().setTitle('😃 | Эмоджи').setDescription(`🏷️ | Название: \`${emoji.name}\`\n🆔 | ID: \`${emoji.id}\`\n💻 | Анимированный: \`${emoji.animated ? 'Да' : 'Нет'}\`\n📎 | Ссылка: **[нажми](https://cdn.discordapp.com/emojis/${emoji.id}.png)**`).setImage(`https://cdn.discordapp.com/emojis/${emoji.id}.png?v=1`).setColor(message.client.constants.colors.main).setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))] });
        else return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Указанное вами эмоджи не было найдено!`, message);
    }
}

module.exports = EmojiCommand;