const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true,
        'default': 0
        //0 news, 1 videos, 2 pictures
    },
    name: {
        type: String,
        required: true
    },
    actived: {
        type: Boolean,
        required: true,
        'default': false
    }
});


const categories = mongoose.model('categories', categoriesSchema);