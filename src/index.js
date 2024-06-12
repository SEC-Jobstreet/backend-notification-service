'use strict';
const path = require('path');
const server = require(path.join(__dirname, '/server/server.js'));
const gateway = require(path.join(__dirname, '/gateway/gateway.js'));
// Start server and gateway
server;
gateway;
//message queue
const messQueue=require(path.join(__dirname,"/mq.js"));
messQueue;
//
const cron = require('node-cron');
// Import functions
const send=require('./server/controllers/sendEmail');
// Schedule email sending daily at 7:00 AM
cron.schedule('0 7 * * *', () => 
{
    send('daily');
}, 
{
    timezone: 'Asia/Ho_Chi_Minh' // Specify your timezone here
});
// Schedule email sending daily at 7:00 AM on Monday
cron.schedule('0 7 * * 1', () => 
{
    send('weekly');
}, 
{
    timezone: 'Asia/Ho_Chi_Minh' // Specify your timezone here
});
//delete old post
//User ejs instead raw html
