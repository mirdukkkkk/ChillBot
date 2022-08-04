const ChillBotListener = require('../../structures/ChillBotListener');
const { EmbedBuilder } = require('discord.js')
function average(nums) {
    return (nums.reduce((a, b) => (a + b)) / nums.length).toFixed(2);
}
const rating = {
    onestar: 1,
    twostar: 2,
    threestar: 3,
    fourstar: 4,
    fivestar: 5
}

class InteractionCreateListener extends ChillBotListener {
    constructor() {
        super('InteractionCreateListener', { event: 'interactionCreate' })
    }

    async run(client, interaction) {
        if(!interaction.isSelectMenu()) return;
        const idea = await client.database.collection('ideas').findOne({ message: interaction.message.id });
        if(!idea) return;
        if(idea.rating.find(rate => rate.user === interaction.user.id)) return interaction.reply({ content: `Вы уже поставили оценку **${idea.rating.find(rate => rate.user === interaction.user.id).stars}** данной идее`, ephemeral: true });
        if(idea.author === interaction.user.id) return interaction.reply({ content: 'Вы не можете оценить свою же идею', ephemeral: true });

        interaction.reply({ content: `Вы установили оценку **${rating[interaction.values[0]]}** данной идее`, ephemeral: true });

        const message = interaction.message;
        const averageStar = Number(average([...idea.rating.map(rate => rate.stars), rating[interaction.values[0]] ]));

        message.edit({ 
            embeds: [
                new EmbedBuilder()
                .setTitle(message.embeds[0].title)
                .setDescription(message.embeds[0].description)
                .setFields([
                    message.embeds[0].fields[0],
                    message.embeds[0].fields[1],
                    { name: message.embeds[0].fields[2].name, value: `${client.constants.emojis.rating[String(Math.round(averageStar))]} ${averageStar} (оценок: ${idea.rating.length + 1})` }
                ])
                .setImage(message.embeds[0].image?.url ?? null)
                .setFooter({ text: message.embeds[0].footer.text, iconURL: message.embeds[0].footer?.iconURL })
                .setColor(message.embeds[0].color)
                .setTimestamp()
            ]
        });

        client.database.collection('ideas').updateOne({ message: interaction.message.id }, {
            $push: {
                rating: {
                    user: interaction.user.id,
                    stars: rating[interaction.values[0]],
                    date: Date.now()
                }
            }
        });
    }
}

module.exports = InteractionCreateListener;