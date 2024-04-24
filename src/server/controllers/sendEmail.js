'use strict'
//
const nodemailer = require('nodemailer');

async function sendEmail(to, text) {
    try {
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'taotenron284@gmail.com',
                pass: "zptm zynf ukpo qjuz"
            }
        });

        // Define email options
        const mailOptions = {
            from: 'taotenron284@gmail.com',
            to: to,
            subject: 'JobStreet Thông báo việc làm',
            text: text
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

module.exports=sendEmail;
