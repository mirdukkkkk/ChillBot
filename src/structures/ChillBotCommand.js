class ChillBotCommand {
    constructor(name, options = {}) {
        this.name = name;
        this.description = options.description || 'У данной команды нет описания';
        this.category = options.category;
        this.usage = options.usage || 'Примера использвания данной команды нет';
        this.public = options.public || true;
        this.aliases = options.aliases || [];
        this.userPerms = options.userPerms || [];
        this.cooldown = options.cooldown || 3;
        this.premium = options.premium || false;
    }
}

module.exports = ChillBotCommand;