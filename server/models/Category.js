const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    internship: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Internship",
        }
    ]
});

module.exports = mongoose.model("Category", categorySchema);