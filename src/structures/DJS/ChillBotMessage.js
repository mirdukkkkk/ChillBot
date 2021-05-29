const { Message, APIMessage, MessageEmbed } = require('discord.js');

class ChillBotMessage extends Message {
  reply(...args) {
    const apiMessage = APIMessage.create(this.channel, ...args).resolveData();
    apiMessage.data.message_reference = {
      message_id: this.id,
      guild_id: this.guild?.id
    };
    apiMessage.data.allowed_mentions = {
      ...(apiMessage.data.allowed_mentions || {}),
      replied_user: apiMessage.options.ping ?? false
    };

    return this.channel.send(apiMessage);
  }
  fail(...args) {
    return this.reply(
        new MessageEmbed()
        .setTitle(`${this.client.settings.emojis.failure} | Ошибка`)
        .setColor(this.client.settings.colors.error)
        .setDescription(args)
        .setFooter('ChillBot', this.client.user.displayAvatarURL({ format: 'webp', size: 2048 }))
        .setTimestamp()
    );
  }
}

module.exports = ChillBotMessage;