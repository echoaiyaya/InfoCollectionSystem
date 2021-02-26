const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
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
const tags = mongoose.model('tags', tagsSchema);