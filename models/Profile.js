const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    stories: [{
        title: {
            type: String,
            required: true
        },
        story: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    // education: [{
    //     school: {
    //         type: String,
    //         required: true
    //     },
    //     degree: {
    //         type: String,
    //         required: true
    //     },
    //     fieldofstudy: {
    //         type: String,
    //         required: true
    //     },
    //     from: {
    //         type: Date,
    //         required: true
    //     },
    //     to: {
    //         type: Date,
    //     },
    //     current: {
    //         type: Boolean,
    //         default: false
    //     },
    //     description: {
    //         type: String,
    //     }
    // }],
    social: [{
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        }
    }],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);