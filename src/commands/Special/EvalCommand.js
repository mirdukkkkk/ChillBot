const Discord = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class EvalCommand extends ChillBotCommand {
    constructor() {
        super('eval', {
            args: true,
            aliases: ['e', '>'],
            category: 'special',
            usage: '<код>',
            public: false,
            cooldown: 0
        });
    }

    async run(message, args) {
        if(!message.client.constants.special_access.includes(message.author.id)) return message.react('❌');
        const util = require('util');
        let code = args.join(' ');
        let isAsync = false;

        try {
            if(!code) return message.reply('Введите код, который необходимо выполнить!');
            code = code.replace(/(```(.+)?)?/g, '');

            if(code.includes('await')) isAsync = true;
            if(isAsync) code = `(async () => {${code}})()`;
            const before = process.hrtime.bigint();
            let executed = eval(code);
            if(util.types.isPromise(executed)) executed = await executed;
            const after = process.hrtime.bigint();
            if(typeof executed !== 'string') executed = util.inspect(executed, { depth: 0, maxArrayLength: null });
            if(executed.length >= 1940) {
                message.channel.send('Результат оказался слишком большим, поэтому я отправил его тебе в личку.');
                return message.member.send(executed, { split: '\n', code: 'js' });
            }
            message.reply(executed, { code: 'js' });
        } catch(error) {
            message.reply(error, { code: 'js' });
        }
        function clean(text) {
            return text
              .replace(/`/g, `\`${String.fromCharCode(8203)}`)
              .replace(/@/g, `@${String.fromCharCode(8203)}`);
        }
    }
}

module.exports = EvalCommand;