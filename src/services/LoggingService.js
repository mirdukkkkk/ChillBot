const { EmbedBuilder } = require('discord.js');

class LoggingService {
    constructor(client) {
        this.client = client;
        console.log('[+] Сервис логирования успешно подключен!');
    }

    async error(error, message) {
        const errorid = (await this.client.database.collection('errors').countDocuments()) + 1;

        this.client.constants.webhooks.logging.send(
            {
                embeds: [
                    new EmbedBuilder()
                    .setTitle(`Ошибка под ID #${errorid}`)
                    .setDescription(`\`\`\`js\n${String(error)}\`\`\``)
                    .setColor(this.client.constants.colors.main)
                    .setTimestamp()
                ]
            }
        );

        message?.reply(`Произошла непредвиденная ошибка под номером **${errorid}**, просьба обратиться в канал <#832687145280995368> со скриншотом где видно это сообщение и введённую вами команду`);

        this.client.database.collection('errors').insertOne({ id: errorid, procces: process.pid, date: Date.now() });

        return errorid;
    }
}

module.exports = LoggingService;