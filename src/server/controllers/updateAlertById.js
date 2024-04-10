'use strict'
const jobAlert=require('../models/jobAlert');

async function updateAlertById(change)
{
    try {
        await jobAlert.updateOne({ _id: change.id },
             { $set: {
                keyword: change.keyword,
                city: change.city,
                radius: change.radius,
                on: change.on 
                } 
            });
    } catch (err) {
        throw err;
    }
}

module.exports=updateAlertById;