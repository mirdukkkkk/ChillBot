const settings = require("./settings.json");
const schema = Mongo.Schema({
  userID: String,
  badges: { type: Array, default: [] },
  embcolor: { type: String, default: settings.embcolor },
  messages: { type: Number, default: 0 }
});
module.exports = Mongo.model("User", schema);