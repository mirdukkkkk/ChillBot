const ChillBotListener = require('../../structures/ChillBotListener');
const DatabaseHelper = require('../../helpers/DatabaseHelper');

class GuildMemberAddListener extends ChillBotListener {
    constructor() {
        super('GuildMemberAddListener', { event: 'guildMemberAdd' })
    }

    async run(client, member) {
        if(!await client.database.collection('users').findOne({ userID: member.user.id })) {
            DatabaseHelper.createUserEntry(client, {
                options: { upsert: true },
                user: member.user.id,
                schema: require('../../utils/ChillBotSchemas').user
            });
        }
    }
}

module.exports = GuildMemberAddListener;