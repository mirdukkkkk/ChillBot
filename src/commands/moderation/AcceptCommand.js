const { MessageEmbed } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class AcceptCommand extends ChillBotCommand {
    constructor() {
        super('accept', {
            description: 'С помощью этой команды вы можете принять предложение.',
            category: 'moderation',
            usage: '<id> [комментарий]',
            args: true,
            userPermissions: ['MANAGE_GUILD'],
            cooldown: 3
        });
    }

    async run(message, args) {
        const data = await message.client.database.collection('main').findOne({ name: 'guild' });
        if(!data.ideaChannel || !message.guild.channels.cache.has(data?.ideaChannel)) return message.fail(`${message.client.settings.emojis.warning} | На данном сервере не установлен канал предложений!`);
        if(data.ideas.length <= 0) return message.fail(`${message.client.settings.emojis.warning} | На сервере ещё не подавались предложения`);

        const id = args[0];
        if(isNaN(id) || !parseInt(id) || id <= 0) return message.fail(`${message.client.settings.emojis.warning} | Укажите пожалуйста **верный** ID предложения.`);
        const channel = message.guild.channels.cache.get(data.ideaChannel);
        const suggestion = data.ideas.find((i) => i.id === parseInt(id));
        if(!suggestion) return message.fail(`${message.client.settings.emojis.warning} | Предложения с указанным вами ID не существует.`);

        try {
            const msg = await channel.messages.fetch(suggestion.message);
            if(!msg) return message.fail(`${message.client.settings.emojis.warning} | Сообщение с указанным вами предложением не было найдено.`);
            if(msg?.embeds.length <= 0) return message.fail(`${message.client.settings.emojis.warning} | Найденное сообщение не содержит в себе вложений.`);

            msg.edit(
                new MessageEmbed()
                .setTitle(`Предложение №${id} (Принято)`)
                .setDescription(msg.embeds[0].description)
                .setColor('A5FF2A')
                .addFields(
                    msg.embeds[0].fields[0],
                    {
                        name: `${message.client.settings.emojis.done} Ответ от ${message.author.tag} [${new Date().toLocaleString('ru')}]:`,
                        value: args.slice(1).join(' ').length ? args.slice(1).join(' ').slice(0, 999) : 'Администратор не оставил дополнительного комментария.',
                        inline: true
                    }
                )
                .setFooter(msg.embeds[0].footer.text, msg.embeds[0].footer?.iconURL)
                .setTimestamp()
            );
            message.react('848208108215468033');
            return message.channel.send(new MessageEmbed().setTitle(`${message.client.settings.emojis.done} | Успешно`).setDescription(`${message.client.settings.emojis.info} | Вы приняли предложение с ID: **${id}**\n🔨 | По причине: ${args.slice(1).join(' ').length ? args.slice(1).join(' ').slice(0, 999) : 'Без причины'}`).setColor(message.client.settings.colors.main).setFooter(`Принял администратор ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })).setTimestamp());
        } catch(err) {
            message.reply(err.toString());
        }
    }
}

module.exports = AcceptCommand;