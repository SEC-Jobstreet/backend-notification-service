'use strict';
//import
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const uri = require('./config/mongoProfile');
const addAlert=require('./controllers/addAlert');
const addDailyPost=require('./controllers/addDailyPost');
const sendAlert=require('./controllers/sendAlert');
//set up
mongoose.connect(uri);
const packageLoader = protoLoader.loadSync(path.join(__dirname, '/protos/notify.proto'));
const grpcObject = grpc.loadPackageDefinition(packageLoader);
const notifyPackage = grpcObject.notifyPackage;

const PORT=40000;

const server = new grpc.Server();
server.bindAsync(`0.0.0.0:${process.env.PORT||PORT}`, grpc.ServerCredentials.createInsecure(), (err) => {
    if (err) {
        console.error('Server binding failed:', err);
    } else {
        server.addService(notifyPackage.notify.service, {
            "createAlert": createAlert,
            "createPost": createPost,
            "getNotifies": getNotifies
        });
        console.log(`Server is running on Port: ${process.env.PORT||PORT}`);
    }
});
//functions
//upload alert
function createAlert(call, callback) {
    let notifyItem={
        "keyword": call.request.keyword,
        "city": call.request.city,
        "radius": call.request.radius,
        "userName": call.request.userName
    }
    addAlert(notifyItem);
    callback(null, {"ack": true});
}
//upload new post
function createPost(call, callback) {
    let postItem={
        "jobName": call.request.jobName,
        "companyName": call.request.companyName,
        "location": call.request.location
    }
    addDailyPost(postItem);
    callback(null, {"ack": true});
}
//get matching new posts
async function getNotifies(call, callback) {
    let postList=await sendAlert(call.request.userName);
    if(postList.length>0)
    {   
        postList.forEach(posts => {
            posts.forEach(post=>call.write(post))
        });
    }
    call.end();
};
