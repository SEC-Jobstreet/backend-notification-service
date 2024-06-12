'use strict';
const jobAlert = require('../models/jobAlert');

async function deleteAlertById(id) {
    try {
        const result = await jobAlert.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new Error(`No document found with the provided ID: ${id}`);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = deleteAlertById;
