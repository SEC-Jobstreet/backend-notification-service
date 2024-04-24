'use strict';
const path = require('path');
const server = require(path.join(__dirname, '/server/server.js'));
const gateway = require(path.join(__dirname, '/gateway/gateway.js'));

// Start server and gateway
server;
gateway;
//
const cron = require('node-cron');
// Import functions
const userEmail=require('./server/models/userEmail');
const sendNotifies=require('./server/controllers/sendNotifies');
const sendEmail=require('./server/controllers/sendEmail');
//
async function getUserList() 
{
    try 
    {
        let userList = await userEmail.find();
        return userList;
    } catch (error) {
        console.error("Error fetching user list:", error);
        throw error; // Rethrow the error for handling by the caller
    }
}
// getUserList().then((userList)=>
// {
//     userList.forEach(async (user) => 
//     {
//         let content='';
//         let matchJob=await sendNotifies(user.userName);
//         if(matchJob.length > 0)
//         {
//             matchJob.forEach(alert=>
//                 {
//                     alert.forEach(job=>
//                     {
//                         content+=job.jobName+'\n'+job.companyName+'\n'+job.location+'\n\n';
//                     })
//                 });
//             await sendEmail(user.email, content);
//         }
//     });
// });

// Schedule email sending daily at 8:00 AM
cron.schedule('0 7 * * *', () => 
{
    getUserList().then((userList)=>
    {
        userList.forEach(async (user) => 
        {
            let content='';
            let matchJob=await sendNotifies(user.userName);
            if(matchJob.length > 0)
            {
                matchJob.forEach(alert=>
                    {
                        alert.forEach(job=>
                        {
                            content+=job.jobName+'\n'+job.companyName+'\n'+job.location+'\n\n';
                        })
                    });
                await sendEmail(user.email, content);
            }
        });
    });
}, 
{
    timezone: 'Asia/Ho_Chi_Minh' // Specify your timezone here
});
