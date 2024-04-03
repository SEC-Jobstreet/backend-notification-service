var mongoose = require('mongoose');

var alertSchema=new mongoose.Schema({
    keyword: {type: [String], required: true},
    city: {type: String, required: true},
    radius: {type: Number, required: false},
    createDate: {type: Date, default: Date.now},
    userName: {type: String, required: false}
});
//
var jobAlert=mongoose.model("jobalerts",alertSchema);
//
module.exports=jobAlert;