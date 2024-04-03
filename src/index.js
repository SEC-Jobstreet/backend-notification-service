'use strict';
//
const path = require('path'); // Corrected require syntax
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const uri = require('./models/mongoProfile');
const addAlert=require('./models/methods/addAlert');
const addDailyPost=require('./models/methods/addDailyPost');
const sendAlert=require('./models/methods/sendAlert');
//
mongoose.connect(uri);
const packageLoader = protoLoader.loadSync(path.join(__dirname, '/protos/notify.proto'));
const grpcObject = grpc.loadPackageDefinition(packageLoader);
const notifyPackage = grpcObject.notifyPackage;
//
const PORT=40000;
//
const server = new grpc.Server();
server.bindAsync(`0.0.0.0:${process.env.PORT||PORT}`, grpc.ServerCredentials.createInsecure(), (err) => {
    if (err) {
        console.error('Server binding failed:', err);
    } else {
        console.log('Server bound on port 40000'); // Log successful binding
        server.addService(notifyPackage.notify.service, {
            "createAlert": createAlert,
            "createPost": createPost,
            "getNotifies": getNotifies
        });
        console.log('Server started successfully');
    }
});
//
//functions
function createAlert(call, callback) {
    let notifyItem={
        "keyword": call.request.keyword,
        "city": call.request.city,
        "radius": call.request.radius,
        "userName": call.request.userName
    }
    addAlert(notifyItem);//model.create
    callback(null, {"ack": true});//response and request must be like proto if not=> no match field
}
//
function createPost(call, callback) {
    let postItem={
        "jobName": call.request.jobName,
        "companyName": call.request.companyName,
        "location": call.request.location
    }
    addDailyPost(postItem);
    callback(null, {"ack": true});//response and request must be like proto if not=> no match field
}

async function getNotifies(call, callback) {
    var postList=await sendAlert(call.request.userName);
    if(postList.length>0)
    {   
        postList.forEach(posts => {
            posts.forEach(post=>call.write(post))
        });
    }
    call.end();
};
