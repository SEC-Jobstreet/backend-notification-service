const mongoose = require('mongoose');
//
const Schema = mongoose.Schema;

const EmailSchema = new Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true }
    });
const userEmail = mongoose.model('useremails', EmailSchema);

module.exports = userEmail;