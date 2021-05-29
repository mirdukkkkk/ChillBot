const { MessageEmbed } = require('discord.js');

module.require = {
    premiumRequired(message) {
        message.fail(`${message.client.settings.emojis.info} | Эта функция доступна только для пользователей с VIP статусом!`)
    }
}