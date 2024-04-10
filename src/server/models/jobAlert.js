const mongoose = require('mongoose');

const alertSchema=new mongoose.Schema({
    keyword: {type: [String], required: true},
    city: {type: String, required: true},
    radius: {type: Number, required: true},
    createDate: {type: Date, default: Date.now},
    userName: {type: String, required: true},
    on: {type: Boolean, default: true}
});
//
const jobAlert=mongoose.model("jobalerts",alertSchema);
//
module.exports=jobAlert;