const mongoose = require('mongoose');

// creating a new shema in mongodb of user that contains username and password.
const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true }
	},
	{ collection: 'users' }
)

const User = mongoose.model("UserSchema", UserSchema);

module.exports = User; // export the Schema as an object.