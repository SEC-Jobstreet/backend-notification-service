'use strict';
const path = require('path'); // Corrected require syntax
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageLoader = protoLoader.loadSync(path.join(__dirname, '/protos/notify.proto')); // Using path.join for cross-platform compatibility
const grpcObject = grpc.loadPackageDefinition(packageLoader);
const notifyPackage = grpcObject.notifyPackage;

const client=new notifyPackage.notify("localhost:40000", grpc.credentials.createInsecure());

module.exports=client