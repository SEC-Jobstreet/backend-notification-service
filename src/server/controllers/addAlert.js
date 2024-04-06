'use strict'
const jobAlert=require('../models/jobAlert');

async function addAlert(notifyItem)
{
    await jobAlert.create({
        keyword: notifyItem.keyword,
        city: notifyItem.city,
        radius: notifyItem.radius,
        userName: notifyItem.userName
    });
}

module.exports=addAlert;