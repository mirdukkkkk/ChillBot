const { GuildMember } = require('discord.js');

class ChillBotGuildMember extends GuildMember {
    vip() {
        return this.roles.cache.has('773241143537303582');
    }
}

module.exports = ChillBotGuildMember;