const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	type: {
		type: String,
		enum: ["Admin", "Organization", "Student"],
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	}, 
	additionalDetails: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Profile"
	},
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
	internships: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Intership"
		},
	],
});

module.exports = mongoose.model("User", userSchema);