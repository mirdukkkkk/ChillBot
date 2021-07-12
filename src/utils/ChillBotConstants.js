const Discord = require('discord.js');
const { emojis } = require('../settings.json')

module.exports = {
  permissions: {
    ADMINISTRATOR: 'Администратор',
    VIEW_AUDIT_LOG: 'Просматривать журнал аудита',
    CREATE_INSTANT_INVITE: 'Создавать приглашения',
    KICK_MEMBERS: 'Выгонять участников',
    BAN_MEMBERS: 'Банить участников',
    MANAGE_CHANNELS: 'Управлять каналами',
    MANAGE_GUILD: 'Управлять сервером',
    ADD_REACTIONS: 'Добавлять реакции',
    PRIORITY_SPEAKER: 'Приоритетный режим',
    STREAM: 'Вести трансляции',
    VIEW_CHANNEL: 'Просматривать канал',
    SEND_MESSAGES: 'Отправлять сообщения',
    SEND_TTS_MESSAGES: 'Отправлять TTS-сообщения',
    MANAGE_MESSAGES: 'Управлять сообщениями',
    EMBED_LINKS: 'Встраивать ссылки',
    ATTACH_FILES: 'Прикреплять файлы',
    READ_MESSAGE_HISTORY: 'Просматривать историю сообщений',
    MENTION_EVERYONE: 'Упоминать всех',
    USE_EXTERNAL_EMOJIS: 'Использовать сторонние эмодзи',
    VIEW_GUILD_INSIGHTS: 'Просматривать аналитику сервера',
    CONNECT: 'Подключатся',
    SPEAK: 'Говорить',
    MUTE_MEMBERS: 'Заглушать участников',
    DEAFEN_MEMBERS: 'Отключать участникам звук',
    MOVE_MEMBERS: 'Перемещать участников',
    CHANGE_NICKNAME: 'Изменять никнейм',
    MANAGE_NICKNAMES: 'Управлять никнеймами',
    MANAGE_ROLES: 'Управлять ролями',
    MANAGE_WEBHOOKS: 'Управлять вебхуками',
    MANAGE_EMOJIS: 'Управлять эмодзи',
  },
  special_access: [
    "663378999103324180",
    "806972308282540063",
    "494898279000047616",
    "801534997185167360",
    "801370288825565185",
    "840125377447067651"
  ],
  badges: {
    developer: '💻',
    trusted: '🤝',
    purchased: '🏷️',
    moderation: '🛡️',
    bumper: '🚀',
    creator: '🎨',
    creative: '💡'
  },
  badgesArray: [
    "developer",
    "trusted",
    "purchased",
    "moderation",
    "bumper",
    "creator",
    "creative"
  ],
  badgesInfo: [
    {
      id: 'developer',
      info: 'Значок создателя ChillBot.',
      todo: 'Нет способа.'
    },
    {
      id: 'trusted',
      info: 'Значок доверенного человека.',
      todo: 'Нужно активно помогать серверу и развивать его (Придумывать разные идеи и т.д), находиться на сервере более 1 недели.'
    },
    {
      id: 'purchased',
      info: 'Данный значок можно купить в магазине.',
      todo: 'Купить в магазине(<#792040367624421376> => $shop).'
    },
    {
      id: 'moderation',
      info: 'Проверенный модератор сервера.',
      todo: 'Необходимо соответствовать некоторым требованиям: 1. Иметь роль не ниже Мл.Модератор, 2. Выдать 25 верных предупреждений, Находиться на должности модератора более 2-ух недель.'
    },
    {
      id: 'bumper',
      info: 'Значок бампера сервера.',
      todo: 'Необходимо активно бампить сервер.'
    },
    {
      id: 'creator',
      info: 'Значок для создателей какого либо творчества.',
      todo: 'Нужно активно показывать свои навыки в <#738532999125139568>, и после того, как администратор увидит, что у вас есть талант, даст вам данный значок.'
    },
    {
      id: 'creative',
      info: 'Значок креативных людей.',
      todo: 'Значок выдаётся от 5 принятых идей в <#759839539798868013>.'
    }
  ],
  webhooks: {
    logging: new Discord.WebhookClient('864136937351020586', 'V-k72cNyLHQdjCoFHD_FmjB6E2VvQBQtz3fwUHm53pZSgUGfMFFQw0pj3OKRuQisWMTW'),
    dm: new Discord.WebhookClient('848247855281340426', 'A3t8Tm9xHzAXaSzh1FGoLfaj7WUJIzbLVvW8TvXdgNlmJ2XXacnmzKJut5SLDsbV6vvU')
  },
  embeds: {
    commandY: function(cmd, author) {
      return new Discord.MessageEmbed().setTitle(`${emojis.done} | Команда выполнена`).setColor('A5FF2A').setDescription(`🔧 | Команда: \`${cmd}\`\n👤 | Автор: \`${author.tag} (${author.id})\``).setFooter('Логгирование ChillBot').setTimestamp()
    },
    commandN: function(cmd, author, error) {
      return new Discord.MessageEmbed().setTitle(`${emojis.failure} | Команда не выполнена`).setColor('FF3333').setDescription(`🔧 | Команда: \`${cmd}\`\n👤 | Автор: \`${author.tag} (${author.id})\`\n🚫 | Ошибка: \`${error.length < 1680 ? 'ошибка слишком большая' : error}\``).setFooter('Логгирование ChillBot').setTimestamp()
    }
  }
}