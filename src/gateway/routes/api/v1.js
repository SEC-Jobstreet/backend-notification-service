'use strict'
//import modules
const express=require('express');
const router=express.Router();
const client = require('../../client');
//POST
router.post('/alert', (req, res) =>
{
    const keywords=req.body.keyword.split(" ");
    client.createAlert({
        "keyword": keywords,
        "city": req.body.city,
        "radius": parseFloat(req.body.radius),
        "userName": req.body.userName
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
//
router.post('/jobpost', (req, res) =>
{
    client.createPost({
        "jobName": req.body.jobName,
        "companyName": req.body.companyName,
        "location": req.body.location
    },(err, response)=>
    {console.log(req.body.jobName,req.body.companyName,req.body.location);
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
router.get('/notify/:userName', (req, res) => {
    const call = client.getNotifies({
        "userName": req.params.userName
    });
    const matchList = [];
    call.on("data", post => {
        matchList.push(post);
    });
    call.on("end", () => {
        if (matchList.length === 0) {
            res.status(200).json({ message: "no alert found" });
        } else {
            res.status(200).json({ matchList: matchList });
        }
    });
});

//
module.exports=router
