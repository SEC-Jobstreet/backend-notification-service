'use strict'
//import modules
const express=require('express');
const router=express.Router();
const client = require('../../client');
//POST
//create alert
router.post('/alert', (req, res) =>
{
    //const keywords=req.body.keyword.split(" ");
    client.createAlert({
        "keyword": req.body.keyword,
        "city": req.body.city,
        "radius": req.body.radius,
        "userName": req.body.userName,
        "email": req.body.email
    },(err, response)=>
    {
        if(err)
        {
            res.status(200).json({ message: err.message });
        }
        if(response)
        {
            res.status(200).json({ message: response["ack"] });
        }
    });
});
//create job
router.post('/post', (req, res) =>
{
    client.createPost({
        "id": req.body.id,
        "jobName": req.body.jobName,
        "companyName": req.body.companyName,
        "location": req.body.location,
        "description": req.body.description,
        "url": req.body.url
    },(err, response)=>
    {
        if(err)
        {
            res.status(200).json({ message: err.message });
        }
        if(response)
        {
            res.status(200).json({ message: response["ack"] });
        }
    });
});
//GET
//get alerts
router.get('/alert/:userName', (req, res) => {
    let call = client.getAlert({"userName": req.params.userName});
    let alerts=[]
    call.on("data", a => {alerts.push(a);});
    call.on("end", () => {
        if (alerts.length === 0) {
            res.status(200).json({ message: "no alert found" });
        }
        else 
        {
            res.status(200).json({ alertList: alerts });
        }
    });   
});
//PUT
router.put('/alert', (req, res) =>
{
    client.updateAlert({
        "id": req.body.id,
        "keyword": req.body.keyword,
        "city": req.body.city,
        "radius": req.body.radius,//grpc default NaN/other type into 0 & grpc auto parse string into num until meet a char
        "userName": req.body.userName,
        "period": req.body.period,
        "email": req.body.email,
        "on": req.body.on
    },(err, response)=>
    {
        if(err)
        {
            res.status(200).json({ message: err.message });
        }
        if(response)
        {
            res.status(200).json({ message: response["ack"] });
        }
    });
});
//DELETE
//delete request
router.delete('/alert', (req, res) =>
{
    client.deleteAlert({
        "id": req.body.id
    },(err,response)=>
    {
        if(err)
        {
            res.status(200).json({ message: err.message });
        }
        if(response)
        {
            res.status(200).json({ message: response["ack"] });
        }        
    });
});

module.exports=router
