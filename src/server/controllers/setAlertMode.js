// 'use strict';
// const jobAlert = require('../models/jobAlert');

// async function setAlertMode(id, on) {
//     try {
//         await jobAlert.updateOne({ _id: id }, { $set: { on: on } });
//     } catch (err) {
//         console.log(err);
//         throw err;
//     }
// }
// //update mode
// router.post('/alertmode', (req, res) =>
// {
//     client.setMode({
//         "id": req.body.id,
//         "on": req.body.on
//     },(err,response)=>
//     {
//         if(err)
//         {
//             res.status(200).json({ message: err.message });
//         }
//         if(response)
//         {
//             res.status(200).json({ message: response["ack"] });
//         }        
//     });
// });
// function setMode(call, callback)
// {
//     let err;
//     function stringToBoolean(str) {
//         return str === 'true';
//     }
//     try {
//         setAlertMode(call.request.id, stringToBoolean(call.request.on));
//     } catch (error) {
//         err=error;
//     }
//     if(err)
//     {
//         callback(null, {"ack": false});
//     }
//     else
//     {
//         callback(null, {"ack": true});
//     }
// };
// module.exports = setAlertMode;
