var mongoose = require('mongoose');

var postSchema=new mongoose.Schema({
    jobName: {type: String, required: true},
    companyName: {type: String, required: true},
    location: {type: String, required: true}
});
//
var dailyPost=mongoose.model("dailyposts",postSchema);
//
module.exports=dailyPost;