const mongoose = require('mongoose');

const alertSchema=new mongoose.Schema({
    keyword: {type: [String], required: true},
    city: {type: String, required: true},
    radius: {type: Number, required: false},
    createDate: {type: Date, default: Date.now},
    userName: {type: String, required: false}
});
//
const jobAlert=mongoose.model("jobalerts",alertSchema);
//
module.exports=jobAlert;