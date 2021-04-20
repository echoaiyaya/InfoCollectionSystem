const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://admin:1234567890@cluster0.dsauy.mongodb.net/globalnews?retryWrites=true&w=majority';

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {            
  console.log(`Mongoose connected to ${dbURI}`);       
});                                                    
mongoose.connection.on('error', err => {               
  console.log('Mongoose connection error:', err);      
});                                                    
mongoose.connection.on('disconnected', () => {         
  console.log('Mongoose disconnected');                
});          

require('./news');
require('./categories');
require('./tags');
require('./videos');
require('./pictures');
require('./spiders');