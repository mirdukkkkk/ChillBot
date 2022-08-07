const { EmbedBuilder } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class AcceptCommand extends ChillBotCommand {
    constructor() {
        super('accept', {
            description: 'С помощью этой команды вы можете принять предложение.',
            category: 'suggestions',
            usage: '<id> [комментарий]',
            userPerms: ['MANAGE_GUILD'],
            cooldown: 3
        });
    }

    async run(message, args) {
        const data = await message.client.database.collection('main').findOne({ name: 'guild' });
        if(!data.ideaChannel || !message.guild.channels.cache.has(data?.ideaChannel)) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | На данном сервере не установлен канал предложений!`, message);
        if(args.join(' ').length == 0) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Пожалуйста, введите ID предложения!`, message);
        if((await message.client.database.collection('ideas').countDocuments()) <= 0) return message.message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | На сервере ещё не подавались предложения`, message);

        const id = args[0];
        if(isNaN(id) || !parseInt(id) || id <= 0) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Укажите пожалуйста **верный** ID предложения.`);
        const channel = message.guild.channels.cache.get(data.ideaChannel);
        const suggestion = await message.client.database.collection('ideas').findOne({ id: parseInt(id) });
        if(!suggestion) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Предложения с указанным вами ID не существует.`, message);

        try {
            const msg = await channel.messages.fetch(suggestion.message);
            if(!msg) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Сообщение с указанным вами предложением не было найдено.`, message);
            if(msg?.embeds.length <= 0) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Найденное сообщение не содержит в себе вложений.`, message);

            msg.edit(
                {
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(`Предложение №${id} (Принято)`)
                        .setDescription(msg.embeds[0].description)
                        .setColor('A5FF2A')
                        .addFields([
                            msg.embeds[0].fields[0],
                            {
                                name: `${message.client.constants.emojis.done} Ответ от ${message.author.tag} [${new Date().toLocaleString('ru')}]:`,
                                value: args.slice(1).join(' ').length ? args.slice(1).join(' ').slice(0, 999) : 'Администратор не оставил дополнительного комментария.',
                                inline: true
                            },
                            msg.embeds[0].fields[2],
                        ])
                        .setFooter({ text: msg.embeds[0].footer.text, iconURL: msg.embeds[0].footer?.iconURL })
                        .setTimestamp()
                    ]
                }
            );
            message.react('848208108215468033');

            message.reply({ embeds: [new EmbedBuilder().setTitle(`${message.client.constants.emojis.done} | Успешно`).setDescription(`${message.client.constants.emojis.info} | Вы приняли предложение с ID: **${id}**\n🔨 | По причине: ${args.slice(1).join(' ').length ? args.slice(1).join(' ').slice(0, 999) : '-'}`).setColor(message.client.constants.colors.main).setFooter({ text: `Принял администратор ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setTimestamp()] });

            msg.thread?.setLocked(true, `Идея с ID ${id} была расмотрена`).catch(() => {});
            msg.thread?.setArchived(true, `Идея с ID ${id} была расмотрена`).catch(() => {});
            return;
        } catch(err) {
            return message.client.loggingservice.error(error, message);
        }
    }
}

module.exports = AcceptCommand;