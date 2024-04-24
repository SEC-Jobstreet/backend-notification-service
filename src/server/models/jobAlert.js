const mongoose = require('mongoose');

const alertSchema=new mongoose.Schema({
    keyword: {type: [String], required: true},
    city: {type: String, required: true},
    radius: {type: Number, required: true},
    userName: {type: String, required: true},
    period: {type: String, default: "daily"},
    on: {type: Boolean, default: true},
    createDate: {type: Date, default: Date.now}
});
//
const jobAlert=mongoose.model("jobalerts",alertSchema);
//
module.exports=jobAlert;