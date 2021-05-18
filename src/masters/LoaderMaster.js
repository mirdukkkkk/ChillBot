const path = require('path');
const fs = require('fs').promises;

const ChillBotListener = require('../structures/ChillBotListener');
const ChillBotCommand = require('../structures/ChillBotCommand');
const ChillBotInteraction = require('../structures/ChillBotInteraction');

class LoaderMaster {
    constructor() {
        throw new Error(`Класс ${thid.constructor.name} не инициализирован!`);
    }

    static async loadListeners(client, dir = '') {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for(const file of files) {
            const stat = await fs.lstat(path.join(filePath, file));
            if(stat.isDirectory()) {
                await this.loadListeners(client, path.join(dir, file));
            }
            if(file.endsWith('.js')) {
                const Listener = require(path.join(filePath, file));
                if(Listener.prototype instanceof ChillBotListener) {
                    const listener = new Listener();
                    client.listeners.set(listener.name, listener);
                    client.on(listener.event, listener.run.bind(listener, client));
                    if(listener.ws) {
                        client.ws.on(listener.event, listener.run.bind(listener, client));
                    }
                }
            }
        }
    }
    static async loadCommands(client, dir = '') {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for(const file of files) {
            const stat = await fs.lstat(path.join(filePath, file));
            if(stat.isDirectory()) {
                await this.loadCommands(client, path.join(dir, file));
            }
            if(file.endsWith('.js')) {
                const Command = require(path.join(filePath, file));
                if(Command.prototype instanceof ChillBotCommand) {
                    const cmd = new Command();
                    client.commands.set(cmd.name, cmd);
                }
            }
        }
    }
    static async loadInteractions(client, dir = '') {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for(const file of files) {
            const stat = await fs.lstat(path.join(filePath, file));
            if(stat.isDirectory()) {
                await this.loadInteractions(client, path.join(dir, file));
            }
            if(file.endsWith('.js')) {
                const Interaction = require(path.join(filePath, file));
                if(Interaction.prototype instanceof ChillBotInteraction) {
                    const interaction = new Interaction();
                    client.interactions.set(interaction.name, interaction);
                }
            }
        }
    }
}
module.exports = LoaderMaster;