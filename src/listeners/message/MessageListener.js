const ChillBotListener = require('../../structures/ChillBotListener');
const CommandsExecutorMaster = require('../../masters/CommandsExecutorMaster');
const DatabaseMaster = require('../../masters/DatabaseMaster');
const { MessageEmbed, WebhookClient } = require('discord.js');
const { UserSchema } = require('../../utils/ChillBotSchemas');

class MessageListener extends ChillBotListener {
    constructor() {
        super('MessageListener', { event: 'message' });
    }

    async run(client, message) {
        if(!message.guild && !message.author.bot) return new WebhookClient('848247855281340426', 'A3t8Tm9xHzAXaSzh1FGoLfaj7WUJIzbLVvW8TvXdgNlmJ2XXacnmzKJut5SLDsbV6vvU').send(
            new MessageEmbed()
            .setTitle('Новое сообщение')
            .setDescription(message.content)
            .setThumbnail(message.author.displayAvatarURL({ format: 'webp', size: 2048, dynamic: true }))
            .setFooter(`${message.author.tag} | ${message.author.id}`)
            .setTimestamp()
        );

        const user = await client.database.collection('users').findOne({ userID: message.author.id });
        if(!user && !message.author.bot) {
            return DatabaseMaster.createUserEntry(client, {
                options: { upsert: true },
                user: message.member.id,
                schema: UserSchema
            });
        }

        const executor = new CommandsExecutorMaster(message, client);
        return executor.runCommand();
    }
}

module.exports = MessageListener;