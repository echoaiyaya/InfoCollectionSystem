const mongoose = require('mongoose');

const picturesSchema = new mongoose.Schema({
	title : {
		type : String,
		required : true
	},
    author : {
		type : String,
		required : true
	},
    intro : {
		type : String,
		required : true
	},
    link : {
		type : String,
		required : true
	},
    actived: {
        type: Boolean,
        required: true,
        'default': false
    },
	publicTime : {
		type : Date,
		required : true,
		'default' : Date.now
	},
    insertTime : {
		type : Date,
		required : true,
		'default' : Date.now
	},
    categoryId : Schema.Types.ObjectId,
    Tags : [tagsSchema]
});

const tagsSchema = new mongoose.Schema({
    _id : false,
    tagsId : Schema.Types.ObjectId,
});


const pictures = mongoose.model('pictures', picturesSchema);