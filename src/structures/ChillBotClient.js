const { Client, Collection } = require('discord.js');
const { MongoClient } = require('mongodb');
const LoaderMaster = require('../masters/LoaderMaster');

class ChillBotClient extends Client {
    constructor(options) {
        super(options);
        this.settings = require('../settings.json');

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