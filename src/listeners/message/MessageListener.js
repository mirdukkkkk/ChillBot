const ChillBotListener = require('../../structures/ChillBotListener');
const CommandsExecutorService = require('../../services/CommandsExecutorService');
const DatabaseService = require('../../services/DatabaseService');
const { MessageEmbed } = require('discord.js');
const { UserSchema } = require('../../utils/ChillBotSchemas');
const WordDetectorService = require('../../services/WordDetectorService');

class MessageListener extends ChillBotListener {
    constructor() {
        super('MessageListener', { event: 'message' });
    }

    async run(client, message) {
        WordDetectorService.msgReact(message);
        if(!message.guild && !message.author.bot) {
            if(!!message.attachments.first()) {
                const arr = [];
                await message.attachments.map(att => arr.push(att.url));
                return client.constants.webhooks.dm.send(new MessageEmbed().setTitle('Новое сообщение').setDescription(message.content.length === 0 ? 'Пустое сообщение' : message.content).addField(`Вложения`, arr.join('\n'), false).setThumbnail(message.author.displayAvatarURL({ format: 'webp', dynamic: true })).setFooter(`${message.author.tag} | ${message.author.id}`).setTimestamp());
            } else {
                return client.constants.webhooks.dm.send(
                    new MessageEmbed()
                    .setTitle('Новое сообщение')
                    .setDescription(message.content.length === 0 ? 'Пустое сообщение' : message.content)
                    .setThumbnail(message.author.displayAvatarURL({ format: 'webp', dynamic: true }))
                    .setFooter(`${message.author.tag} | ${message.author.id}`)
                    .setTimestamp()
                );
            }
        }

        const user = await client.database.collection('users').findOne({ userID: message.author.id });
        if(!user && !message.author.bot) {
            return DatabaseService.createUserEntry(client, {
                options: { upsert: true },
                user: message.member.id,
                schema: UserSchema
            });
        }

        const executor = new CommandsExecutorService(message, client);
        return executor.runCommand();
    }
}

module.exports = MessageListener;