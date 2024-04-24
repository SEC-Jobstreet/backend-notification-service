// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var notify_pb = require('./notify_pb.js');

function serialize_notifyPackage_ack(arg) {
  if (!(arg instanceof notify_pb.ack)) {
    throw new Error('Expected argument of type notifyPackage.ack');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifyPackage_ack(buffer_arg) {
  return notify_pb.ack.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifyPackage_alert(arg) {
  if (!(arg instanceof notify_pb.alert)) {
    throw new Error('Expected argument of type notifyPackage.alert');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifyPackage_alert(buffer_arg) {
  return notify_pb.alert.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifyPackage_id(arg) {
  if (!(arg instanceof notify_pb.id)) {
    throw new Error('Expected argument of type notifyPackage.id');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifyPackage_id(buffer_arg) {
  return notify_pb.id.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifyPackage_post(arg) {
  if (!(arg instanceof notify_pb.post)) {
    throw new Error('Expected argument of type notifyPackage.post');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifyPackage_post(buffer_arg) {
  return notify_pb.post.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifyPackage_userName(arg) {
  if (!(arg instanceof notify_pb.userName)) {
    throw new Error('Expected argument of type notifyPackage.userName');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifyPackage_userName(buffer_arg) {
  return notify_pb.userName.deserializeBinary(new Uint8Array(buffer_arg));
}


var notifyService = exports.notifyService = {
  createPost: {
    path: '/notifyPackage.notify/createPost',
    requestStream: false,
    responseStream: false,
    requestType: notify_pb.post,
    responseType: notify_pb.ack,
    requestSerialize: serialize_notifyPackage_post,
    requestDeserialize: deserialize_notifyPackage_post,
    responseSerialize: serialize_notifyPackage_ack,
    responseDeserialize: deserialize_notifyPackage_ack,
  },
  //
createAlert: {
    path: '/notifyPackage.notify/createAlert',
    requestStream: false,
    responseStream: false,
    requestType: notify_pb.alert,
    responseType: notify_pb.ack,
    requestSerialize: serialize_notifyPackage_alert,
    requestDeserialize: deserialize_notifyPackage_alert,
    responseSerialize: serialize_notifyPackage_ack,
    responseDeserialize: deserialize_notifyPackage_ack,
  },
  updateAlert: {
    path: '/notifyPackage.notify/updateAlert',
    requestStream: false,
    responseStream: false,
    requestType: notify_pb.alert,
    responseType: notify_pb.ack,
    requestSerialize: serialize_notifyPackage_alert,
    requestDeserialize: deserialize_notifyPackage_alert,
    responseSerialize: serialize_notifyPackage_ack,
    responseDeserialize: deserialize_notifyPackage_ack,
  },
  getAlert: {
    path: '/notifyPackage.notify/getAlert',
    requestStream: false,
    responseStream: true,
    requestType: notify_pb.userName,
    responseType: notify_pb.alert,
    requestSerialize: serialize_notifyPackage_userName,
    requestDeserialize: deserialize_notifyPackage_userName,
    responseSerialize: serialize_notifyPackage_alert,
    responseDeserialize: deserialize_notifyPackage_alert,
  },
  //
getNotifies: {
    path: '/notifyPackage.notify/getNotifies',
    requestStream: false,
    responseStream: true,
    requestType: notify_pb.userName,
    responseType: notify_pb.post,
    requestSerialize: serialize_notifyPackage_userName,
    requestDeserialize: deserialize_notifyPackage_userName,
    responseSerialize: serialize_notifyPackage_post,
    responseDeserialize: deserialize_notifyPackage_post,
  },
  //
deleteAlert: {
    path: '/notifyPackage.notify/deleteAlert',
    requestStream: false,
    responseStream: false,
    requestType: notify_pb.id,
    responseType: notify_pb.ack,
    requestSerialize: serialize_notifyPackage_id,
    requestDeserialize: deserialize_notifyPackage_id,
    responseSerialize: serialize_notifyPackage_ack,
    responseDeserialize: deserialize_notifyPackage_ack,
  },
};

exports.notifyClient = grpc.makeGenericClientConstructor(notifyService);
