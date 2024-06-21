'use strict';
const path = require('path');
const server = require(path.join(__dirname, '/server/server.js'));
const gateway = require(path.join(__dirname, '/gateway/gateway.js'));
const dailyPost= require('./server/models/dailyPost');
// Start server and gateway
server;
gateway;
//message queue
const messQueue=require(path.join(__dirname,"/gateway/messQueue.js"));
messQueue;
//
const cron = require('node-cron');
// Import functions
const sendMatchPosts=require('./server/controllers/sendEmail');
// Schedule email sending weekly at 6:00 AM on Monday
cron.schedule('0 6 * * 1', async() => 
    {
        sendMatchPosts('weekly');
    }, 
    {
        timezone: 'Asia/Ho_Chi_Minh' // Specify your timezone here
    });
// Schedule email sending daily at 7:00 AM
cron.schedule('0 7 * * *', async() => 
    {
        sendMatchPosts('daily');
        dailyPost.deleteMany({});
    }, 
    {
        timezone: 'Asia/Ho_Chi_Minh' // Specify your timezone here
    });
