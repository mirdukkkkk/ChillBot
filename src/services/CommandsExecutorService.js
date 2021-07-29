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
        if(command) {
            return command;

        } else return this.client?.commands.find((c) => c?.aliases.includes(commandName));
    }

    async runCommand() {
        if(this.message.author.bot) return;

        const data = await this.client.database.collection('main').findOne({ name: 'guild' });
        if(!this.message.content.startsWith(data.prefix)) return;

        const [cmd, ...args] = this.message.content.slice(1).trim().split(/ +/g);
        const command = await this.findCommand(cmd);

        if(cooldown.has(this.message.author.id) && cooldown.get(this.message.author.id) === command?.name) return this.message.react('⏱️').catch();
        if(command) {
            if(!this.message.guild.me.permissionsIn(this.message.channel).has('SEND_MESSAGES')) return;
            if(!this.message.guild.me.permissionsIn(this.message.channel).has('EMBED_LINKS')) return this.message.reply(`У меня нет права отпрвлять встроенные сообщения! Предоставте мне это право что-бы я смог работать корректно!`);
            if(command.userPermissions.length > 0 && command.userPermissions.some((permission) => !this.message.member.permissions.has(permission))) return this.message.fail(`${this.client.settings.emojis.warning} | У вас недостаточно прав!\n${this.client.settings.emojis.info} | Необходимые права: ${command.userPermissions.map((r) => `\`${permissions[r]}\``).join(', ')}`);
            if(command.args && !args.length) return this.message.fail(`${this.client.settings.emojis.warning} | Недостаточно аргументов!\n${this.client.settings.emojis.info} | Правильное использование команды: \`${data.prefix}${cmd} ${command.usage}\``);

            try {
                command.run(this.message, args);
                this.client.constants.webhooks.logging.send(this.client.constants.embeds.commandY(cmd, this.message.author));
            } catch(error) {
                console.error(error);
                this.client.constants.webhooks.logging.send(this.client.constants.embeds.commandN(cmd, this.message.author, error));
            }

            cooldown.set(this.message.author.id, command.name);
            setTimeout(() => cooldown.delete(this.message.author.id), command.cooldown * 1000);
        }
    }
}

module.exports = CommandsExecutorMaster;