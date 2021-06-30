const { MessageEmbed } = require('discord.js');

module.exports = {
    premiumRequired(message) {
        message.fail(`${message.client.settings.emojis.info} | Эта функция доступна только для пользователей с VIP статусом!`)
    }
}