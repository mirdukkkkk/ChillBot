const { Collection, Permissions } = require('discord.js');
const { msgReact } = require('../services/WordDetectorService')

const cooldown = new Collection();

class CommandsExecutorService {
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
        msgReact(this.message);
        if(!this.message.content.startsWith(data.prefix)) return;
        const [cmd, ...args] = this.message.content.slice(1).trim().split(/ +/g);
        const command = await this.findCommand(cmd);
        if(cooldown.has(this.message.author.id) && cooldown.get(this.message.author.id) === command.name) return this.message.react('⏱️').catch();
        if(command) {
            if(!this.message.guild.me.permissionsIn(this.message.channel).has(Permissions.FLAGS.SEND_MESSAGES)) return;
            if(!this.message.guild.me.permissionsIn(this.message.channel).has(Permissions.FLAGS.EMBED_LINKS)) return this.message.reply(`У меня нет права отпрвлять встроенные сообщения! Предоставте мне это право что-бы я смог работать корректно!`);
            if(command.userPerms.length > 0 && command.userPerms.some((permission) => !this.message.member.permissions.has(permission))) return;

            try {
                command.run(this.message, args);
            } catch(error) {
                console.error(error);
            }
            cooldown.set(this.message.author.id, command.name);
            setTimeout(() => cooldown.delete(this.message.author.id), command.cooldown * 1000)
        }
    }
}

module.exports = CommandsExecutorService;