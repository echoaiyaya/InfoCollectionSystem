const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new mongoose.Schema({
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
	content : {
		type : String,
		required : true
	},
    picture : {
        type : String
    },
    priority: {
        type: Number,
        required: true,
        'default': 4
        // 0 scroll, 1 headline, 2 speical, 3 home page, 4 regular
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
    categoryId : {type: Schema.Types.ObjectId, ref: 'categories'},
    tags : [{type: Schema.Types.ObjectId, ref: 'tags'}]
});

// const tagsSchema = new mongoose.Schema({
//     _id : false,
//     tagsId : Schema.Types.ObjectId,
// });


const news = mongoose.model('news', newsSchema);