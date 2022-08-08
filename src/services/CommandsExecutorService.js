const { Collection, PermissionFlagsBits } = require('discord.js');
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

    cooldown(command) {
        cooldown.set(this.message.author.id, command.name); 
        setTimeout(() => cooldown.delete(this.message.author.id), command.cooldown * 1000);
    }

    async runCommand() {
        if(this.message.author.bot) return;
        if(!this.message.guild) return;
        if(this.message.member.roles.cache.has('833065002880860210')) return;
        const data = await this.client.database.collection('main').findOne({ name: 'guild' });
        msgReact(this.message);
        if(!(this.message.channel.id === '738534600174862389')) this.client.messagecounter.addMessage(this.message.author.id);
        if(!this.message.content.startsWith(data.prefix)) return;
        const [cmd, ...args] = this.message.content.slice(1).trim().split(/ +/g);
        const command = await this.findCommand(cmd);
        if(cooldown.has(this.message.author.id) && cooldown.get(this.message.author.id) === command.name) return this.message.react('⏱️').catch();
        if(command) {
            if(!this.message.guild.members.me.permissionsIn(this.message.channel).has(PermissionFlagsBits.SendMessages)) return;
            if(!this.message.guild.members.me.permissionsIn(this.message.channel).has(PermissionFlagsBits.EmbedLinks)) return this.message.reply(`У меня нет права отпрвлять встроенные сообщения! Предоставте мне это право что-бы я смог работать корректно!`);
            if(command.userPerms.length > 0 && command.userPerms.some((permission) => !this.message.member.permissions.has(this.client.constants.permissions.FLAGS[permission]))) return this.client.embconstructor.fail(`${this.client.constants.emojis.warning} | Неддостаточно прав для использования данной команды!\n${this.client.constants.emojis.info} | Необходимые права: ${command.userPerms.map((r) => `\`${this.client.constants.permissions[r]}\``).join(', ')}`, this.message);

            try {
                command.run(this.message, args);
            } catch(error) {
                console.error(error);
            }
            
            this.client.constants.special_access.includes(this.message.author.id) ? null : this.cooldown(command);
        }
    }
}

module.exports = CommandsExecutorService;