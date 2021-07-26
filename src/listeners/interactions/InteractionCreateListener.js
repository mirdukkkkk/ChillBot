const ChillBotListener = require('../../structures/ChillBotListener');
const ChillBotInteractionData = require('../../utils/ChillBotInteractionData');

class InteractionCreateListener extends ChillBotListener {
    constructor() {
        super('InteractionCreateListener', {
            ws: true,
            event: 'INTERACTION_CREATE'
        });
    }

    run(client, interaction) {
        switch(interaction.type) {
            case 3: {
                if (client.cache.buttons.has(interaction.message.id)) {
                    client.cache.buttons.get(interaction.message.id)(new ChillBotInteractionData(client, interaction));
                    return client.api.interactions(interaction.id, interaction.token).callback.post({ data: { type: 6 }});
                }
                break;
            }
        }
    }
}

module.exports = InteractionCreateListener;