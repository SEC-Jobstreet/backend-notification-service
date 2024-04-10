'use strict';
//import
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const uri = require('./config/mongoProfile');
const addAlert=require('./controllers/addAlert');
const sendAlerts=require("./controllers/sendAlerts");
const updateAlertById=require("./controllers/updateAlertById");
const addDailyPost=require('./controllers/addDailyPost');
const sendNotifies=require('./controllers/sendNotifies');
const deleteAlertById=require("./controllers/deleteAlertById");
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
            "getAlert": getAlert,
            "updateAlert": updateAlert,
            "deleteAlert": deleteAlert,
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
    let err;
    try {
        addAlert(notifyItem);       
    } catch (error) {
        err=error;
    }
    if(err)
    {
        callback(null, {"ack": false});
    }
    else
    {
        callback(null, {"ack": true});
    }
}
//get alert
async function getAlert(call, callback) 
{
    let alertList=await sendAlerts(call.request.userName);
    if(alertList.length>0)
    {   
        alertList.forEach(a=>call.write(a))
    }
    call.end();
};
//upload new post
function createPost(call, callback) 
{
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
    let postList=await sendNotifies(call.request.userName);
    if(postList.length>0)
    {   
        postList.forEach(posts => {
            posts.forEach(post=>call.write(post))
        });
    }
    call.end();
};
//Update Alert
function updateAlert(call, callback)
{
    let change={
        "id": call.request.id,
        "keyword": call.request.keyword,
        "city": call.request.city,
        "radius": call.request.radius,
        "on": call.request.on
    }
    let err;
    try {
        updateAlertById(change);
    } catch (error) {
        err=error;
    }
    if(err)
    {
        callback(null, {"ack": false});
    }
    else
    {
        callback(null, {"ack": true});
    }
};
//delete an alert
function deleteAlert(call, callback)
{
    let err;
    try {
        deleteAlertById(call.request.id,);
    } catch (error) {
        err=error;
    }
    if(err)
    {
        callback(null, {"ack": false});
    }
    else
    {
        callback(null, {"ack": true});
    }
};

