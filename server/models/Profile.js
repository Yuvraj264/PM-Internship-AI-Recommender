const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
	},
	about: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	contactNumber: {
		type: Number,
	}
});

module.exports = mongoose.model("Profile", profileSchema);