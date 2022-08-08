module.exports = {
    user: {
        badges: [],
        reactions: true,
        punishments: [],
        messages: 0,
        xo: {
            win: 0,
            lose: 0,
            all: 0
        },
        married: null
    },
    staffMember: {
        punishments: [],
        reprimands: [],
        scores: 0,
        assinged: new Date(),
        dismissed: {
            status: false,
            reason: null
        }
    },
    promocode: {
        activated: {
            status: false,
            by: null
        }
    }
}