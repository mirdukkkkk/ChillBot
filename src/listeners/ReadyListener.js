const { MessageEmbed } = require('discord.js');
const ChillBotListener = require('../structures/ChillBotListener');

class ReadyListener extends ChillBotListener {
    constructor() {
        super('ReadyListener', { event: 'ready' });
    }

    async run(client) {
        client.user.setActivity(`на сервер Just Chilling`, { type: 3 });
        setInterval(() => {
            client.channels.cache.get(client.settings.panel.channel).messages.cache.get(client.settings.panel.message).edit(
                new MessageEmbed()
                .setTitle('🔧 | Статистика бота')
                .setColor(client.settings.colors.main)
                .setDescription(`⏱️ | Пинг: \`${client.ws.ping}\`\n🎛️ | Использование памяти: \`${(process.memoryUsage().heapUsed / (1000 * 1000)).toFixed(2)} МБ\``)
                .setFooter('ChillBot', this.client.user.displayAvatarURL({ format: 'webp', size: 2048 }))
                .setTimestamp()
            );
        }, client.settings.panel.interval);
        console.log('[+] ChillBot был запущен!');
    }
}

module.exports = ReadyListener;