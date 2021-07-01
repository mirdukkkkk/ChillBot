const ChillBotListener = require('../../structures/ChillBotListener');
const DatabaseMaster = require('../../masters/DatabaseMaster');

class GuildMemberAddListener extends ChillBotListener {
    constructor() {
        super('GuildMemberAddListener', { event: 'guildMemberAdd' })
    }

    async run(client, member) {
        if(!await client.database.collection('users').findOne({ userID: member.user.id })) {
            DatabaseMaster.createUserEntry(client, {
                options: { upsert: true },
                user: member.user.id,
                schema: require('../../utils/ChillBotSchemas').UserSchema
            });
        }
    }
}

module.exports = GuildMemberAddListener;