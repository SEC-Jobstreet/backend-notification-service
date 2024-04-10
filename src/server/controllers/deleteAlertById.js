'use strict';
const jobAlert = require('../models/jobAlert');

async function deleteAlertById(id) {
    try {
        await jobAlert.deleteOne({ _id: id });
    } catch (err) {
        throw err;
    }
}

module.exports = deleteAlertById;
