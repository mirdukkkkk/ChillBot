const { WebhookClient } = require('discord.js');

module.exports = {
    webhooks: {
        dm: new WebhookClient({ url: 'https://discord.com/api/webhooks/848247855281340426/A3t8Tm9xHzAXaSzh1FGoLfaj7WUJIzbLVvW8TvXdgNlmJ2XXacnmzKJut5SLDsbV6vvU' })
    },
    special_access: [
        "663378999103324180",
        "806972308282540063",
        "494898279000047616",
        "801534997185167360",
        "877170711125438515"
    ],
    emojis: {
        failure: '<a:828727020493733918:848208109414645810>',
        done: '<a:837792112078618625:848208108215468033>',
        warning: '<a:828949226430922763:848230435300573234>',
        info: 'ℹ️',
        bot: '<:TeaPenguin:850054370443788298>'
    },
    colors: {
        main: 'e66c07',
        error: 'ff3333'
    },
    answersBall: [
        'Да.',
        'Нет.',
        'Точно нет!',
        'Точно да!',
        'Скорее нет, чем да.',
        'Скорее да, чем нет.',
        'Не знаю...',
        'Возможно.',
        'Невозможно!!!',
        'Частично.',
        'Точно сказать не могу, но вроде да.',
        'Точно сказать не могу, но вроде да.',
        'Степашка передал - нет.',
        'Картон передал - да.',
        'Морковка передал - возможно.'
    ],
    staff: {
        roles: [
            '772890834277892137',
            '752586005328035951',
            '748922948433477723',
            '738514458418348152',
            '810455428201971744',
            '748115892113506335'
        ],
        admins: [
            '810455428201971744',
            '748115892113506335'
        ]
    },
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
    }
}