const { Client, Collection } = require('discord.js');
const { MongoClient } = require('mongodb');
const LoaderMaster = require('../services/LoaderService');

class ChillBotClient extends Client {
    constructor(options) {
        super(options);
        this.settings = require('../settings.json');
        this.constants = require('../utils/ChillBotConstants');
        this.functions = require('../utils/ChillBotFunctions');
        this.cache = {
            buttons: new Map()
        }
        this.cooldowns = {
            quiz: new Map(),
            react: new Map()
        }

        this.mongo = new MongoClient(this.settings.database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        this.listeners = new Collection();
        this.commands = new Collection();
    }

    get database() {
        return this.mongo.db('Main');
    }

    async _start() {
        await this.mongo.connect();
        await LoaderMaster.loadListeners(this, '../listeners');
        await LoaderMaster.loadCommands(this, '../commands');
        return this.login(this.settings.token).catch(console.error);
    }
}

module.exports = ChillBotClient;