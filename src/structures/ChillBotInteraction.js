class ChillBotInteraction {
    constructor(name, options = {}) {
        this.name = name;
        this.active = options.active || true;
    }
}
module.exports = ChillBotInteraction