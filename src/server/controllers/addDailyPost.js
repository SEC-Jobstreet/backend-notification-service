'use strict'
const dailyPost=require('../models/dailyPost');

async function addDailyPost(postItem)
{
    await dailyPost.create(postItem);
}

module.exports=addDailyPost;