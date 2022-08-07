const { emojis } = require('../utils/ChillBotConstants');
const Discord = require('discord.js');

class ChillBotTttGame {
    constructor(options = {}) {
        if ("autoDelete" in options && typeof (options.autoDelete) !== "number" || options.autoDelete < 500) throw new Error("Auto delete should be an number and at least 500.")

        this.autoDelete = options.autoDelete || 3000;
        this.startTitle = options.startTitle || "Информация";
        this.requestTitle = options.requestTitle || "Ты был приглашён поиграть в крестики нолики";
        this.forceEndTitle = options.forceEndTitle || 'Информация';
        this.forceEndDescription = options.forceEndDescription || "❌ | Игра принудительно звершена {user}";
        this.timeEndTitle = options.timeEndTitle || 'Информация';
        this.timeEndDescription = options.timeEndDescription ||  "{user}, ты слишком медленный";
        this.endTitle = options.endTitle || 'Информация';
        this.endDescription = options.endDescription || "🏆 | **{winner}** выиграл";
        this.drawEndTitle = options.drawEndTitle || 'Информация';
        this.drawEndDescription = options.drawEndDescription || `${emojis.info} | Игра закончилась ничьёй`;
    }

    async duo(message, player2) {
        if(!message || !message.author) throw new Error("Сообщение не указано");
        if(!player2 || !player2.username) throw new Error("Второй игрок не указан");

        if(message.author.id === player2.id) throw new Error("Второй игрок не может быть сам собой");
        if(player2.bot) throw new Error("Второй игрок не может быть ботом");
        if(message.client.games.has(message.author.id)) return message.reply({ content: `Вы уже играете с **${message.client.games.get(message.author.id).username}**!` });
        if(message.client.games.has(player2.id)) return message.reply({ content: `Этот участник уже играет с **${message.client.games.get(player2.id).username}**!` });

        if(await this.getApproval.bind(this)(player2, message) === false) return;

        if(message.client.games.has(message.author.id)) return message.channel.send({ content: `${player2.toString()}, вы уже играете с **${message.client.games.get(player2.id).username}**!` });
        if(message.client.games.has(player2.id)) return message.channel.send({ content: `Вы уже приняли другую игру с участником **${message.client.games.get(player2.id).username}**` });

        message.client.games.set(message.author.id, player2); message.client.games.set(player2.id, message.author);
        let options = [1, 2, 3, 4, 5, 6, 7, 8, 9], player1Choice = [], player2Choice = [];
        const row = await this.getComponents(options);
        let ended = false;

        const sent = await message.channel.send({ components: row, embeds: [{ color: 15105570, title: this.startTitle, description: this.getDescription(player1Choice, player2Choice) }] })

        for(let i = 1; options.length !== 0; i++) {
            let data = await this.getChoice.bind(this)(i % 2 !== 0 ? message.author : player2, message.channel, options, i % 2 !== 0 ? player1Choice : player2Choice);

            if(data.reason === "time") {
                let r = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setCustomId("no_need_of_id_here").setDisabled(true).setStyle(Discord.ButtonStyle.Secondary).setLabel("Игра завершена").setEmoji("🕊"));
                sent.reply({ components: [r], embeds: [{ color: '15548997', title: this.timeEndTitle.replace(/{user}/g, data.user.username), description: this.timeEndDescription.replace(/{user}/g, data.user.username) }] });
                sent.edit({ components: [], embeds: [sent.embeds[0]] });
                message.client.database.collection('users').updateOne({ id: data.user.id }, { $inc: { "xo.lose": 1, "xo.all": 1 } });
                message.client.database.collection('users').updateOne({ id: message.client.games.get(data.user.id).id }, { $inc: { "xo.win": 1, "xo.all": 1 } });
                ended = true;
                break;
            } else if (data.reason === "cancel") {
                let r = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setCustomId("no_need_of_id_here").setDisabled(true).setStyle(Discord.ButtonStyle.Secondary).setLabel("Игра завершена").setEmoji("🕊"));
                sent.reply({ components: [r], embeds: [{ color: '15548997', title: this.forceEndTitle.replace(/{user}/g, data.user.username), description: this.forceEndDescription.replace(/{user}/g, data.user.username) }] });
                sent.edit({ components: [], embeds: [sent.embeds[0]] });
                message.client.database.collection('users').updateOne({ id: data.user.id }, { $inc: { "xo.lose": 1, "xo.all": 1 } });
                message.client.database.collection('users').updateOne({ id: message.client.games.get(data.user.id).id }, { $inc: { "xo.win": 1, "xo.all": 1 } });
                ended = true;
                break;
            }

            options = data.options;
            i % 2 !== 0 ? player1Choice = data.player1 : player2Choice = data.player1;

            let rowss = await this.getComponents(options);
            sent.edit({ components: rowss, embeds: [{ color: 15105570, title: this.startTitle, description: this.getDescription(player1Choice, player2Choice) }] })

            let win = this.getWinner(player1Choice, player2Choice);
            var winner = win === 1 ? message.author : player2;
            var looser = win === 2 ? message.author : player2;

            if (win === 0) {
                let r = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setCustomId("no_need_of_id_here").setDisabled(true).setStyle(Discord.ButtonStyle.Secondary).setLabel('Игра завершена').setEmoji("🕊"));
                sent.reply({ components: [r], embeds: [{ color: 15105570, title: this.drawEndTitle.replace(/{player1}/g, message.author.username).replace(/{player2}/g, player2.username), description: this.drawEndDescription.replace(/{player1}/g, message.author.username).replace(/{player2}/g, player2.username) }] });
                message.client.database.collection('users').updateOne({ id: message.author.id }, { $inc: { "xo.all": 1 } });
                message.client.database.collection('users').updateOne({ id: player2.id }, { $inc: { "xo.all": 1 } });
                ended = true;
                break;
            } else if (win >= 0 && win <= 2) {
                let r = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setCustomId("no_need_of_id_here").setDisabled(true).setStyle(Discord.ButtonStyle.Secondary).setLabel('Игра завершена').setEmoji("🕊"));
                sent.reply({ components: [r], embeds: [{ color: 15105570, title: this.endTitle.replace(/{winner}/g, winner.username).replace(/{looser}/g, looser.username), description: this.endDescription.replace(/{winner}/g, winner).replace(/{looser}/g, looser) }] });
                ended = true;
                message.client.database.collection('users').updateOne({ id: winner.id }, { $inc: { "xo.win": 1, "xo.all": 1 } });
                message.client.database.collection('users').updateOne({ id: looser.id }, { $inc: { "xo.lose": 1, "xo.all": 1 } });
                break;
            }
        }

        message.client.games.delete(message.author.id); message.client.games.delete(player2.id);
        if(ended) return;
    }

    async getComponents(options) {
        const row1 = new Discord.ActionRowBuilder(), row2 = new Discord.ActionRowBuilder(), row3 = new Discord.ActionRowBuilder(), row4 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Danger).setEmoji("❌").setLabel("Завершить игру").setCustomId("0_tic_tac_toe"));

        for (let i = 1; i < 4; i++)row1.addComponents(new Discord.ButtonBuilder().setCustomId(`${i}_tic_tac_toe`).setStyle(Discord.ButtonStyle.Primary).setEmoji(this.getEmoji(i)).setDisabled(!options.includes(i)))
        for (let i = 4; i < 7; i++)row2.addComponents(new Discord.ButtonBuilder().setCustomId(`${i}_tic_tac_toe`).setStyle(Discord.ButtonStyle.Primary).setEmoji(this.getEmoji(i)).setDisabled(!options.includes(i)))
        for (let i = 7; i < 10; i++)row3.addComponents(new Discord.ButtonBuilder().setCustomId(`${i}_tic_tac_toe`).setStyle(Discord.ButtonStyle.Primary).setEmoji(this.getEmoji(i)).setDisabled(!options.includes(i)))

        return [row1, row2, row3, row4];
    }

    async getApproval(player, message) {
        return new Promise(async (res, rej) => {
            try {
                let msg = await message.channel.send({ components: [new Discord.ActionRowBuilder().addComponents([new Discord.ButtonBuilder().setCustomId("1_tic_tac_toe_choose").setStyle(Discord.ButtonStyle.Success).setEmoji("✔").setLabel("Принять"), new Discord.ButtonBuilder().setCustomId("2_tic_tac_toe_choose").setStyle(Discord.ButtonStyle.Danger).setEmoji("❌").setLabel("Отклонить")])], embeds: [{ color: 15105570, title: this.requestTitle, description: 'На принятие 30 секунд', fields: [{ name: 'Отправитель', value: message.author.username, inline: true }] }] });
    
                let collector = message.channel.createMessageComponentCollector({ filter: (i) => i.user.id === player.id && i.message.id === msg.id && i.customId.endsWith("_tic_tac_toe_choose"), time: 30000 });

                collector.on('collect', (i) => { collector.stop(i.customId[0]) });
    
                collector.on('end', (f, r) => {
                    let move = true;
                    if (r === "time" || r === "2") move = false;
    
                    if (r === "time") {
                        message.channel.send({ embeds: [{ color: 15548997, title: `${player.username} слишком ленив чтобы ответить, игра закончена не начавшись` }] });
                        msg.delete();
                    } else if (r === "2") {
                        f.first().reply({ embeds: [{ color: 15548997, title: `${player.username} отказался от игры` }] });
                        msg.delete()
                    } else if (r === "1") {
                        msg.delete()
                    }
    
                    res(move);
                });
            } catch (e) {
                console.log(e);
                rej(false);
            }
        });
    }

    getChoice(user, channel, options, player1, bot) {
        return new Promise(async (res, rej) => {
            try {
                let _msg_ = await channel.send({ content: `${user.toString()}, выбирайте куда вы хотите ходить` });
                setTimeout(() => _msg_.delete().catch(e => { }), this.autoDelete);
    
                const collector = channel.createMessageComponentCollector({ filter: (i) => i.user.id === user.id && (i.customId.endsWith("_tic_tac_toe")), time: 30000 });
    
                collector.on('collect', async (interaction) => {
                    const userChoice = parseInt(interaction.customId[0]);
    
                    if (userChoice === 0) return collector.stop("cancel");
    
                    options = options.filter(v => v !== userChoice);
                    player1.push(userChoice);
                    if (bot && options.length > 0) {
                        let c = options[Math.floor(Math.random() * options.length)];
                        bot.push(c);
                        options = options.filter(v => v !== c);
                    }
    
                    let _msg;
    
                    if (bot) _msg = await interaction.reply({ ephemeral: true, content: "Твой выбор" + this.getEmoji(userChoice) + "\nА мой выбор: " + this.getEmoji(bot[bot.length - 1]), fetchReply: true });
                    else _msg = await interaction.reply({ ephemeral: false, content: `${user.username} выбирает ${this.getEmoji(userChoice)}`, fetchReply: true });
    
                    setTimeout(() => {
                        _msg.delete().catch(e => { });
                    }, this.autoDelete)
    
                    collector.stop(userChoice);
                });
    
                collector.once('end', async (f, r) => {
                    if (r === "time") res({ reason: "time", user });
                    else if (r === "cancel") res({ reason: "cancel", user });
                    else res({ choice: this.getEmoji(r), options: options, player1: player1, bot: bot });
                });
            } catch (e) {
                console.log(e)
                rej(e);
            }
        })
    }

    getDescription(player1, player2) {
        let string = "1️⃣2️⃣3️⃣\n4️⃣5️⃣6️⃣\n7️⃣8️⃣9️⃣";
        player1.forEach((v, i) => player1[i] = this.getEmoji(v) || this.getEmoji(player1[i]) === this.getEmoji(v));
        player2.forEach((v, i) => player2[i] = this.getEmoji(v) || this.getEmoji(player2[i]) === this.getEmoji(v));
    
        player1.forEach(v => string = string.replace(v, "❌"));
        player2.forEach(v => string = string.replace(v, "⭕"));
    
        return string;
    }

    getWinner(player1, player2) {
        player1.forEach((v, i) => player1[i] = this.getNumber(v))
        player2.forEach((v, i) => player2[i] = this.getNumber(v))
    
        if ((player1.includes(7) && player1.includes(5) && player1.includes(3)) || (player1.includes(1) && player1.includes(5) && player1.includes(9)) || (player1.includes(1) && player1.includes(2) && player1.includes(3)) || (player1.includes(4) && player1.includes(5) && player1.includes(6)) || (player1.includes(7) && player1.includes(8) && player1.includes(9)) || (player1.includes(1) && player1.includes(4) && player1.includes(7)) || (player1.includes(5) && player1.includes(2) && player1.includes(8)) || (player1.includes(9) && player1.includes(3) && player1.includes(6)) || (player1.includes(7) && player1.includes(5) && player1.includes(3))) return 1;
        else if ((player2.includes(1) && player2.includes(5) && player2.includes(9)) || (player2.includes(7) && player2.includes(5) && player2.includes(3)) || (player2.includes(1) && player2.includes(2) && player2.includes(3)) || (player2.includes(4) && player2.includes(5) && player2.includes(6)) || (player2.includes(7) && player2.includes(8) && player2.includes(9)) || (player2.includes(1) && player2.includes(4) && player2.includes(7)) || (player2.includes(5) && player2.includes(2) && player2.includes(8)) || (player2.includes(9) && player2.includes(3) && player2.includes(6)) || (player2.includes(7) && player2.includes(5) && player2.includes(3))) return 2;
        else if (player1.length + player2.length === 9) return 0;
        else return -1;
    }

    getNumber(emoji) {
        if (emoji === "1️⃣") return 1;
        else if (emoji === "2️⃣") return 2;
        else if (emoji === "3️⃣") return 3;
        else if (emoji === "4️⃣") return 4;
        else if (emoji === "5️⃣") return 5;
        else if (emoji === "6️⃣") return 6;
        else if (emoji === "7️⃣") return 7;
        else if (emoji === "8️⃣") return 8;
        else if (emoji === "9️⃣") return 9;
        else return emoji;
    }

    getEmoji(number) {
        if (number === 1) return "1️⃣";
        else if (number === 2) return "2️⃣";
        else if (number === 3) return "3️⃣";
        else if (number === 4) return "4️⃣";
        else if (number === 5) return "5️⃣";
        else if (number === 6) return "6️⃣";
        else if (number === 7) return "7️⃣";
        else if (number === 8) return "8️⃣";
        else if (number === 9) return "9️⃣";
        else return number;
    }
}

module.exports = ChillBotTttGame;