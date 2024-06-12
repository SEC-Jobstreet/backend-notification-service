'use strict'
const jobAlert=require('../models/jobAlert');

async function addAlert(notifyItem)
{
    try {
        await jobAlert.create({
            keyword: notifyItem.keyword,
            city: notifyItem.city,
            radius: notifyItem.radius,
            userName: notifyItem.userName,
            email: notifyItem.email
        });        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports=addAlert;