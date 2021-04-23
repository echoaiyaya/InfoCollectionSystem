const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        'default': false 
    },
    insertTime: {
      type: Date,
      'default' : Date.now
    }
});


const feedback = mongoose.model('feedback', feedbackSchema);