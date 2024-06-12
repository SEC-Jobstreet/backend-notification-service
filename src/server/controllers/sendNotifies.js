'use strict';
const jobAlert = require('../models/jobAlert');
const dailyPost = require('../models/dailyPost');
const { set } = require('mongoose');

async function sendNotifies(alert) {
    try {
        const regexPattern = alert.keyword.join('|');
        const regex = new RegExp(regexPattern, 'i');
        let postList=await dailyPost.find({ $or: [{description: { $regex: regex }}, {companyName: { $regex: regex }}, {jobName: { $regex: regex }} ], location: { $regex: new RegExp(alert.city, 'i') } });
        return postList;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = sendNotifies;
