const { Collection, Client } = require('discord.js');
const { MongoClient } = require('mongodb');
const LoaderMaster = require('../services/LoaderService');
const LoggingService = require('../services/LoggingService');
const ChillBotEmbedConstructor = require('../utils/ChillBotEmbedConstructor');
const MessageCounterService = require('../services/MessageCounterService');

class ChillBotClient extends Client {
    constructor(options) {
        super(options);
        this.settings = require('../../settings.json');
        this.constants = require('../utils/ChillBotConstants');
        this.functions = require('../utils/ChillBotFunctions');
        this.embconstructor = new ChillBotEmbedConstructor(this);
        this.loggingservice = new LoggingService(this);
        this.messagecounter = new MessageCounterService(this); 
        this.mongo = new MongoClient(this.settings.db, { useNewUrlParser: true, useUnifiedTopology: true });
        this.games = new Collection();
        this.listeners = new Collection();
        this.commands = new Collection();
    }

    get database() {
        return this.mongo.db('stable');
    }

    async _start() {
        await this.mongo.connect();
        await LoaderMaster.loadListeners(this, '../listeners');
        await LoaderMaster.loadCommands(this, '../commands');
        return this.login(this.settings.token);
    }
}

module.exports = ChillBotClient;