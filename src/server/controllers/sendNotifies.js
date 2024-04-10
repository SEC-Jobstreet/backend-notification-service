'use strict';
const jobAlert = require('../models/jobAlert');
const dailyPost = require('../models/dailyPost');
const { set } = require('mongoose');

async function sendNotifies(name) {
    try {
        let postList=[];
        let alertList = await jobAlert.find({ userName: name });
        for (let alert of alertList) {
            const regexPattern = alert.keyword.join('|');
            const regex = new RegExp(regexPattern, 'i');
            let posts=await dailyPost.find({ $and: [{ jobName: { $regex: regex } }, { location: { $regex: new RegExp(alert.city, 'i') } }] });
            postList.push(posts);
        }
        return postList;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = sendNotifies;
