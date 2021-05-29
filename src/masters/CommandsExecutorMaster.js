const { Collection } = require('discord.js');
const { permissions } = require('../utils/ChillBotConstants');
const { premiumRequired } = require('../utils/ChillBotErrors');

const cooldown = new Collection();

class CommandsExecutorMaster {
    constructor(message, client) {
        this.message = message;
        this.client = client;
    }

    findCommand(commandName) {
        const command = this.client?.commands.get(commandName);
        if (command) {
            return command;
        } else return this.client?.commands.find((c) => c?.aliases.includes(commandName));
    }

    async runCommand() {
        if(this.message.author.bot) return;

        const data = this.client.settings.guild;
        if(!this.message.content.startsWith(data.prefix)) return;

        const [cmd, ...args] = this.message.content.slice(data.prefix.length).trim().split(/ +/g);
        const command = await this.findCommand(cmd);

        if(cooldown.has(this.message.author.id) && cooldown.get(this.message.author.id) === command?.name) return this.message.react('⏱️').catch();
        if(command) {
            if(!this.message.guild.me.permissionsIn(this.message.channel).has('EMBED_LINKS')) return this.message.reply(`У меня нет права отпрвлять встроенные сообщения! Предоставте мне это право что-бы я смог работать корректно!`);
            if(command.premium && this.message.member.roles.cache.has(this.client.settings.guild.premium)) return premiumRequired(this.message);
            if(command.userPermissions.length > 0 && command.userPermissions.some((permission) => !this.message.member.permissions.has(permission))) return this.message.fail('')
        }

        try {
            command.run(this.message, args);
        } catch(error) {
            console.error(error)
        }

        cooldown.set(this.message.author.id, command.name);
        setTimeout(() => cooldown.delete(this.message.author.id), command.cooldown * 1000);
    }
}

module.exports = CommandsExecutorMaster;