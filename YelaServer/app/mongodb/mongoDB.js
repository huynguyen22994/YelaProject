var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/YelaDB', { useMongoClient: true, promiseLibrary: global.Promise });

var Chat = new Schema({
    userName: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    chats: [
        {
            content: String,
            date: Date
        }
    ]
  });
  
  module.exports.Chat = mongoose.model('Chat', Chat);
