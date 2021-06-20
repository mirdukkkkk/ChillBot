const ChillBotCommand = require('../../structures/ChillBotCommand');

class EvalCommand extends ChillBotCommand {
    constructor() {
        super('eval', {
            args: true,
            aliases: ['e'],
            category: 'special',
            usage: '<код>',
            public: false,
            cooldown: 0
        });
    }

    async run(message, args) {
        if(!message.client.constants.special_access.includes(message.author.id)) return message.react('❌');
        try {
            let executed = eval(args.join(' '));
            message.reply(require('util').inspect(executed, { depth: 0, maxArrayLength: null }), { code: 'js' });
        } catch(error) {
            message.reply(error, { code: 'js' });
        }
    }
}

module.exports = EvalCommand;