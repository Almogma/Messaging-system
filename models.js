const mongoose = require("mongoose");

// Create the message template that inside the database.
const MessageSchema = new mongoose.Schema({
  Sender: {
    type: String,
    required: true,
  },
  Receiver: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  Creation_date: {
    type: Date,
    default: new Date().toISOString().slice(0, 10),
  },
  UnReadMSG:{
      type: Boolean,
      default: false
  }
});

const Msg = mongoose.model("MSG", MessageSchema);

module.exports = Msg; // export the Schema as an object.