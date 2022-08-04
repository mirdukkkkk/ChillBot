class MessageCounterService {
    constructor(client) {
        this.client = client;
        this.raw = {};
    }

    addMessage(userid) {
        this.raw[userid]++;
        if(isNaN(this.raw[userid])) this.raw[userid] = 1;
        return this.raw;
    }

    hanlde(checkInterval = 300000) {
        return setInterval(async() => {
            const users = await this.client.database.collection('users').find().toArray();
            Object.keys(this.raw).forEach(user => {
                this.client.database.collection('users').updateOne({ id: user }, { $set: { messages: this.raw[user] + (users.find(u => u.id === user).messages ? users.find(u => u.id === user).messages : 0 ) } });
            });
            this.raw = {};
        }, checkInterval)
    }
}

module.exports = MessageCounterService;