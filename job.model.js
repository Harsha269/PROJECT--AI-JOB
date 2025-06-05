const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    company: String,
    location: String,
    salary: Number,
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
}, { timestamps: true });

module.exports = mongoose.model("job", jobSchema);
