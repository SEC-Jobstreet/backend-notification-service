'use strict';
const jobAlert = require('../models/jobAlert');

async function sendAlerts(name) {
    try {
        let alertList = await jobAlert.find({ userName: name });
        return alertList;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = sendAlerts;
