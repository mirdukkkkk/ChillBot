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
        "801370288825565185"
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
    }
}