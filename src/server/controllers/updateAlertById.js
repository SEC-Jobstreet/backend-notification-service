'use strict';
const jobAlert = require('../models/jobAlert');

async function updateAlertById(change) {
    try {
        // Create an instance of the jobAlert model with the provided form data
        const alertInstance = new jobAlert({
            _id: change.id,
            keyword: change.keyword,
            city: change.city,
            radius: change.radius,
            email: change.email,
            on: change.on,
            userName: change.userName
        });

        // Validate the instance
        await alertInstance.validate();

        // If validation passes, perform the update
        await jobAlert.updateOne({ _id: change.id }, { $set: {
            keyword: change.keyword,
            city: change.city,
            radius: change.radius,
            on: change.on
        }});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = updateAlertById;
