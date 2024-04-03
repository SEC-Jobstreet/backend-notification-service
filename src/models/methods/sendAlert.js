'use strict';
var jobAlert = require('../jobAlert');
var dailyPost = require('../dailyPost');
const { set } = require('mongoose');

async function findAlert(name) {
    try {
        var postList=[];
        const alertList = await jobAlert.find({ userName: name });
        for (const alert of alertList) {
            var posts=await dailyPost.find({ $and: [{ jobName: { $in: alert.keyword } }, { location: alert.city }] });
            postList.push(posts);
        }
        return postList;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = findAlert;
