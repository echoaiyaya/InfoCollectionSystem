const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spidersSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
        'default': Date.now
        //0 top categories, 1 subcategories
    },
    targetName: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      required: true
      //1 news, 2 picture, 3 videos
    },
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        'default': false
    },
    frequency: {
        type: Number,
        required: true,
        'default': 0
    },
    categoryId : {type: Schema.Types.ObjectId, ref: 'categories'},
    limit: {
      type: Number,
      required: true
    },
    start_url: {
      type: String,
      required: true
    },
    linksSelector: {
      type: String,
      required: true
    },
    titleSelector: {
      type: String,
      required: true
    },
    pictureSelector: {
      type: String,
      required: true
    },
    publicTimeSelector: {
      type: String,
      required: true
    },
    authorSelector: {
      type: String,
      required: true
    },
    contentSelector: {
      type: String,
      required: true
    }

});


const spiders = mongoose.model('spiders', spidersSchema);