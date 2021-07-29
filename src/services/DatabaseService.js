class DatabaseMaster {
    constructor() {
        throw new Error(`Класс ${this.constructor.name} не может быть инициализирован!`);
    }

    static createUserEntry(client, { user, schema, options = {} }) {
        if (!client || !client?.database) throw new TypeError('A valid client instance must be specified.');
        client.database.collection('users').updateOne({ userID: user }, {
            $set: schema
        }, options);
    }
}

module.exports = DatabaseMaster;