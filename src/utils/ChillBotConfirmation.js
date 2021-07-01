/* eslint-disable */
const { MessageEmbed } = require('discord.js');

class ChillBotConfirmation {
    constructor(client, user) {
        this._client = client;
        this.user = user ?? null;
    }

    get buttons() {
        return [
            {
                type: 2,
                style: 3,
                custom_id: 'yes',
                label: 'Подтвердить'
            },
            {
                type: 2,
                style: 4,
                custom_id: 'no',
                label: 'Отмена'
            }
        ]
    }

    async init(content, channel, seconds = 30) {
        this.message = await this._client.api.channels(channel.id).messages.post({
            data: {
              [content instanceof MessageEmbed ? 'embed' : 'content']: content,
              components: [
                {
                  type: 1,
                  components: this.buttons
                }
              ]
            }
        });
        return await new Promise((resolve) => {
            this._client.cache.buttons.set(this.message.id, (res) => {
                if(res.member.user.id === this.user?.id) {
                    if(res.data.custom_id === 'yes') {
                        resolve(true);
                    }
                    this._client.api.channels(channel.id).messages(this.message.id).delete();
                    resolve(false);
      
                    setTimeout(() => {
                        this._client.cache.buttons.delete(this.message.id);
                    }, seconds * 1000);
                } else return;
            });
        });
    }
}

module.exports = ChillBotConfirmation;