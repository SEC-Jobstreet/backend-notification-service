'use strict';
const jobAlert = require('../models/jobAlert');

async function sendAlerts(name) {
    try {
        let alertList = await jobAlert.find({ userName: name });
        return alertList;
    } catch (err) {
        throw err;
    }
}

module.exports = sendAlerts;
