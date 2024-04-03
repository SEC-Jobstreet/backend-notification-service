'use strict'
var dailyPost=require('../dailyPost');

async function addDailyPost(postItem)
{
    await dailyPost.create(postItem);
}

module.exports=addDailyPost;