const Discord = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class EvalCommand extends ChillBotCommand {
    constructor() {
        super('eval', {
            description: 'Выполняет заданный код',
            aliases: ['evaluation', 'e', '>'],
            category: 'special',
            usage: '<код>',
            public: false,
            cooldown: 1
        });
    }

    async run(message, args) {
        const util = require('util');
        let code = args.join(' ');
        let isAsync = false;

        try {
            if(!message.client.constants.special_access.includes(message.author.id)) return message.react('❌');
            if(!code) return message.reply({ content: 'Введите код, который необходимо выполнить!' });
            code = code.replace(/(```(.+)?)?/g, '');
            if(code.includes('await')) isAsync = true;
            if(isAsync) code = `(async () => {${code}})()`;
            //const before = process.hrtime.bigint();
            let executed = eval(code);
            if(util.types.isPromise(executed)) executed = await executed;
            //const after = process.hrtime.bigint();
            if(typeof executed !== 'string') executed = util.inspect(executed, { depth: 0, maxArrayLength: null });
            if(executed.length >= 1940) {
                message.reply({ content: 'Результат оказался слишком большим, поэтому я отправил его тебе в личку.' });
                return message.member.send({ content: `\`\`\`js\n${executed}\`\`\`` });
            }
            message.reply({ content: `\`\`\`js\n${executed}\`\`\`` });
        } catch(error) {
            message.reply({ content: `\`\`\`js\n${error}\`\`\`` });
        }
    }
}

module.exports = EvalCommand;