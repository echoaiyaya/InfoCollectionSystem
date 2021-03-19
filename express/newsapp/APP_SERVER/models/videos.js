const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videosSchema = new mongoose.Schema({
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
		picture : {
			type : String
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
	// categoryId : {type: Schema.Types.ObjectId, ref: 'categories'},
  // tags : [{type: Schema.Types.ObjectId, ref: 'tags'}]
});


module.exports = mongoose.model('videos',videosSchema);
//const videos = mongoose.model('videos', videosSchema);