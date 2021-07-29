class ChillBotCommand {
    constructor(name, options = {}) {
        this.name = name;
        this.description = options.description || 'Описание для данной команды не установлено.';
        this.category = options.category;
        this.usage = options.usage || 'Пример использования команды не установлен.';
        this.args = options.args || false;
        this.public = options.public || true;
        this.aliases = options.aliases || [];
        this.userPermissions = options.userPermissions || [];
        this.cooldown = options.cooldown || 3;
        this.premium = options.premium || false;
    }
}
module.exports = ChillBotCommand;