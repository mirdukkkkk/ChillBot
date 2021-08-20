const ChillBotListener = require('../../structures/ChillBotListener');
const CommandsExecutorService = require('../../services/CommandsExecutorService');
const DatabaseHelper = require('../../helpers/DatabaseHelper');
const { MessageEmbed } = require('discord.js');
const { user } = require('../../utils/ChillBotSchemas');
const { msgReact } = require('../../services/WordDetectorService');
const { dm } = require('../../utils/ChillBotFunctions');

class MessageCreateListener extends ChillBotListener {
    constructor() {
        super('MessageCreateListener', { event: 'messageCreate' });
    }

    async run(client, message) {
        msgReact(message);
        dm(message, client);
        const dbuser = await client.database.collection('users').findOne({ id: message.author.id });
        if(!dbuser && !message.author.bot) {
            return DatabaseHelper.createUserEntry(client, {
                user: message.member.id,
                schema: user,
                options: { upsert: true }
            });
        }

        const executor = new CommandsExecutorService(message, client);
        return executor.runCommand();
    }
}

module.exports = MessageCreateListener;