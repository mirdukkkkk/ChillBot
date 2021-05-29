class ChillBotCommand {
    constructor(name, options = {}) {
        this.name = name;
        this.description = options.description || 'Описание для данной комнды не установлено.';
        this.category = options;
        this.usage = options.usage || 'Пример использования команды не установлен.';
        this.args = options.args || false;
        this.public = options.public || true;
        this.aliases = options.aliases || [];
        this.cooldown = options.cooldown || 0;
        this.premium = options.premium || false;
    }
}
module.exports = ChillBotCommand;