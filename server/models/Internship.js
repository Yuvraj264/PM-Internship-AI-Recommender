const mongoose = require('mongoose')

const internshipSchema = new mongoose.Schema({
    internshipName: {
        type: String,
    },
    internshipDescription: {
        type: String,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    internshipRole: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ]
});


module.exports = mongoose.model("Internship", internshipSchema);