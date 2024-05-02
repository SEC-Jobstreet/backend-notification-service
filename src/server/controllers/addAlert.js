'use strict'
const jobAlert=require('../models/jobAlert');

async function addAlert(notifyItem)
{
    try {
        const lowerCaseKeyword = notifyItem.keyword.map(keyword => keyword.toLowerCase());
        await jobAlert.create({
            keyword: lowerCaseKeyword,
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