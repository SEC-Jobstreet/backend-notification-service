'use strict'
//import modules
const express=require('express');
const router=express.Router();
const client = require('../../client');
//POST
//create alert
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
//create job
router.post('/post', (req, res) =>
{
    client.createPost({
        "jobName": req.body.jobName,
        "companyName": req.body.companyName,
        "location": req.body.location
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
//get notifies
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
            res.status(200).json({ message: "no match found" });
        }
        else 
        {
            const unique = matchList.filter((post, index, self) =>
                index === self.findIndex(p =>
                    p.jobName === post.jobName &&
                    p.companyName === post.companyName &&
                    p.location === post.location
            ));
            res.status(200).json({ matchList: unique });
        }
    });
});
//get alerts
router.get('/alert/:userName', (req, res) => {
    const call = client.getAlert({
        "userName": req.params.userName
    });
    const alerts=[]
    call.on("data", a => {
        alerts.push(a);
    });
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
    function stringToBoolean(str) {
        return str === 'true';
    }
    const keywords=req.body.keyword.split(" ");
    client.updateAlert({
        "id": req.body.id,
        "keyword": keywords,
        "city": req.body.city,
        "radius": req.body.radius,
        "on": stringToBoolean(req.body.on)
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
