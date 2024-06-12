const mongoose = require('mongoose');

const postSchema=new mongoose.Schema({
    ID: {type: String, required: true},
    jobName: {type: String, required: true},
    companyName: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    url: {type: String, required: true}
});
//
const dailyPost=mongoose.model("dailyposts",postSchema);
//
module.exports=dailyPost;