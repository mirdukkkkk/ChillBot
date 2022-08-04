class DatabaseHelper {
    constructor() {
        throw new TypeError(`Класс ${this.constructor.name} не может быть инициализирован!`);
    }

    static async createUserEntry(client, { user, schema, options = {} }) {
        if(!client || !client?.database) throw new TypeError('Необходимо указать действительный экземпляр клиента.');
        return await client.database.collection('users').updateOne({ id: user }, {
            $set: schema
        }, options);
    }
}

module.exports = DatabaseHelper;