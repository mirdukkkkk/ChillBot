module.exports = {
    user: {
        badges: [],
        reactions: true,
        punishments: []
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