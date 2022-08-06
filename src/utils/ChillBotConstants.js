const { WebhookClient, PermissionFlagsBits } = require('discord.js');

module.exports = {
    webhooks: {
        dm: new WebhookClient({ token: 'A3t8Tm9xHzAXaSzh1FGoLfaj7WUJIzbLVvW8TvXdgNlmJ2XXacnmzKJut5SLDsbV6vvU', id: '848247855281340426' }),
        logging: new WebhookClient({ token: 'V-k72cNyLHQdjCoFHD_FmjB6E2VvQBQtz3fwUHm53pZSgUGfMFFQw0pj3OKRuQisWMTW', id: '864136937351020586' })
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
        bot: '<:TeaPenguin:850054370443788298>',
        rating: {
            '1': '<:one_star:1000449335873511434>',
            '2': '<:two_stars:1000449399450783774>',
            '3': '<:three_stars:1000449444791197756>',
            '4': '<:four_stars:1000449495739412590>',
            '5': '<:five_stars:1000449537141383218>'
        }
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
        creative: '💡',
        thanks: '🎁'
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
        FLAGS: {
            ADMINISTRATOR: PermissionFlagsBits.Administrator,
            VIEW_AUDIT_LOG: PermissionFlagsBits.ViewAuditLog,
            CREATE_INSTANT_INVITE: PermissionFlagsBits.CreateInstantInvite,
            KICK_MEMBERS: PermissionFlagsBits.KickMembers,
            BAN_MEMBERS: PermissionFlagsBits.BanMembers,
            MANAGE_CHANNELS: PermissionFlagsBits.ManageChannels,
            MANAGE_GUILD: PermissionFlagsBits.ManageGuild,
            ADD_REACTIONS: PermissionFlagsBits.AddReactions,
            PRIORITY_SPEAKER: PermissionFlagsBits.PrioritySpeaker,
            STREAM: PermissionFlagsBits.Stream,
            VIEW_CHANNEL: PermissionFlagsBits.ViewChannel,
            SEND_MESSAGES: PermissionFlagsBits.SendMessages,
            SEND_TTS_MESSAGES: PermissionFlagsBits.SendTTSMessages,
            MANAGE_MESSAGES: PermissionFlagsBits.ManageThreads,
            EMBED_LINKS: PermissionFlagsBits.EmbedLinks,
            ATTACH_FILES: PermissionFlagsBits.AttachFiles,
            READ_MESSAGE_HISTORY: PermissionFlagsBits.ReadMessageHistory,
            MENTION_EVERYONE: PermissionFlagsBits.MentionEveryone,
            USE_EXTERNAL_EMOJIS: PermissionFlagsBits.UseExternalEmojis,
            VIEW_GUILD_INSIGHTS: PermissionFlagsBits.ViewGuildInsights,
            CONNECT: PermissionFlagsBits.Connect,
            SPEAK: PermissionFlagsBits.Speak,
            MUTE_MEMBERS: PermissionFlagsBits.MuteMembers,
            DEAFEN_MEMBERS: PermissionFlagsBits.DeafenMembers,
            MOVE_MEMBERS: PermissionFlagsBits.MoveMembers,
            CHANGE_NICKNAME: PermissionFlagsBits.ChangeNickname,
            MANAGE_NICKNAMES: PermissionFlagsBits.ManageNicknames,
            MANAGE_ROLES: PermissionFlagsBits.ManageRoles,
            MANAGE_WEBHOOKS: PermissionFlagsBits.ManageWebhooks,
            MANAGE_EMOJIS: PermissionFlagsBits.ManageRoles,
        }
    }
}
