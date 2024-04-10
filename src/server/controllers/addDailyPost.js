'use strict'
const dailyPost=require('../models/dailyPost');

async function addDailyPost(postItem)
{
    try {
        await dailyPost.create(postItem);
    } catch (error) {
        console.log(error);
        throw error;        
    }
}

module.exports=addDailyPost;