module.exports = {
    getDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        return Math.floor(diff / 86400000);
    }
}