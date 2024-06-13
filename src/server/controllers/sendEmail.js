'use strict'
//
const nodemailer = require('nodemailer');
const jobAlert = require('../models/jobAlert');
const sendNotifies=require('../controllers/sendNotifies');
//
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
            html: text
        };
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}
async function getAlertList(period) 
{
    try 
    {
        let alertList = await jobAlert.find({period: period, on: true});
        return alertList;
    } catch (error) 
    {
        console.error("Error fetching user list:", error);
        throw error; // Rethrow the error for handling by the caller
    }
}
async function sendAll(perriod)
{
    getAlertList(perriod).then(async (alertList)=>
    {
        alertList.forEach(async (alert) => {
            let matchJob = await sendNotifies(alert);
            let content = `
                <!DOCTYPE html>
                <html>
                <body>
                    <div style="max-width: 560px; margin: 0 auto; padding: 0 12px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tr>
                                <td align="center" style="background-color: #000000; padding: 12px;">
                                    <img alt="JobStreet logo" height="40" style="height: 40px; vertical-align: middle;" src="https://ci3.googleusercontent.com/meips/ADKq_NaCI1AUgGUMMLVkxLmcW98fhZDO1cfn087mnjdVwSRH2VGpmnSPOo4tZmcbkvch8JvMPR8TQPeAGHk9xGv2-JSngnhglZBJCaK7ackQe12nHDh9e7YqQNuCJ3iMyI3VPsnBlU8hszCtgGSMLR4KKKgGS2oAKuNe1KSA8BLO1HUVNR4cozz2_Q=s0-d-e1-ft#http://cdn1.jora.com/assets/vn/ea-logo-white-9e827e201e35ae3341039b5bbc52ab1f073b5f2e2851e923e0b9d668c5ca0ef7.png">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="height: 77px; background-color: #f7f7f7; padding: 10px; margin-bottom: 10px;">
                                        <div style="font-size: 16px; font-weight: bold; color: #1c1c1c; margin-bottom: 5px;">Công việc ${alert.keyword.join(' ')} ở ${alert.city}</div>
                                        <div style="font-size: 13px; line-height: 20px; color: #1c1c1c;">Bán kính ${alert.radius} km</div>
                                    </div>  
                                </td>
                            </tr>`;
            if (matchJob.length > 0) 
            {
                matchJob.forEach(job => {
                    content += `
                            <tr>
                                <td>
                                    <div style="height: 77px; background-color: #ffffff; padding: 10px; margin-bottom: 10px;">
                                        <a title="${job.jobName}" href="${job.url}" target="_blank" style="text-decoration: none; color: #808080;">
                                            <div style="font-size: 16px; font-weight: bold; color: #1c1c1c; margin-bottom: 5px;">${job.jobName}</div>
                                            <div style="font-size: 13px; line-height: 20px; color: #1c1c1c;">${job.companyName} - ${job.location}</div>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                });
            }
            content += `
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="m_6140646603157345554table-max-width" role="presentation" style="border-collapse:collapse;width:100%!important;min-width:100%!important;max-width:560px!important;background-color:#f7f7f7;border-collapse:separate;padding:48px 24px" width="100%">
                        <tbody>
                        <tr>
                        <td style="padding-bottom:24px">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="288" style="border-collapse:collapse">
                        <tbody>
                        <tr>
                        <td align="center" style="color:#1c1c1c;font-size:20px;line-height:24px;font-weight:700;padding-bottom:24px">
                        Nhận tất cả các cơ hội việc làm trong túi của bạn.
                        </td>
                        </tr>
                        <tr>
                        <td align="center">
                        <a href="https://itunes.apple.com/app/id1348096890?alid=A1kn-JtBg7Abc7Uzz8wV&amp;hu=0&amp;recommended_only=false&amp;utm_campaign=job_alerts&amp;utm_medium=email&amp;utm_source=jobseeker_emails" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://itunes.apple.com/app/id1348096890?alid%3DA1kn-JtBg7Abc7Uzz8wV%26hu%3D0%26recommended_only%3Dfalse%26utm_campaign%3Djob_alerts%26utm_medium%3Demail%26utm_source%3Djobseeker_emails&amp;source=gmail&amp;ust=1714711561413000&amp;usg=AOvVaw185doCvKGrt8idisnLYDsj">
                        <img alt="Link to App Store" width="46%" src="https://ci3.googleusercontent.com/meips/ADKq_NZeJG5le-osLVu7kbQ8rqvZFSONCLFMHJZoqR6Z8SGr8QSSmT-jb90FE6GxouHqhZEBeW50CsB6K1ZDy9cWa2VrpjRfFn948glN0Y0Y2NO4lp-OkUjeYhMoHiOsq3j3BDSGmSFdMNNHdln8H2OfGKvVLXmZtzhw0ZKQKCeJr_CbVd5YCgHcv2ma63obY2V40zDtdw=s0-d-e1-ft#http://cdn1.jora.com/assets/app-store-logos/app-store-vi-4e30ffbd1db10d4581274bbda3bfc629542130abbe4d1da0ab2c049a0dea3d6f.png" class="CToWUd" data-bit="iit">
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a href="https://play.google.com/store/apps/details?id=com.jora.jobstreet&amp;referrer=utm_source%3Djob_alerts%26utm_medium%3Demail&amp;alid=A1kn-JtBg7Abc7Uzz8wV&amp;hu=0&amp;recommended_only=false&amp;utm_campaign=job_alerts&amp;utm_medium=email&amp;utm_source=jobseeker_emails" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://play.google.com/store/apps/details?id%3Dcom.jora.jobstreet%26referrer%3Dutm_source%253Djob_alerts%2526utm_medium%253Demail%26alid%3DA1kn-JtBg7Abc7Uzz8wV%26hu%3D0%26recommended_only%3Dfalse%26utm_campaign%3Djob_alerts%26utm_medium%3Demail%26utm_source%3Djobseeker_emails&amp;source=gmail&amp;ust=1714711561413000&amp;usg=AOvVaw2ys3Pt-wsaaGT0U8qa8_ud">
                        <img alt="Link to Play Store" width="46%" src="https://ci3.googleusercontent.com/meips/ADKq_Nb2-_L-rSxMWL7VYXFvt11hLZeDIYesYxY6eVUswr1SrKuamO17ZRffWjmVl0KZ7l_p414zh5-tw3xtOusGJuLaQEuS326Wg40yAlE0nOsTsif_pdFTdBaCOuCsyi7AEsF8SgJk5ZtMJtFLB9NWMpDgVeqno9lKzOiOArwX5o0qt4sTSQlHafiGwSUfoFa8xZCIsLw=s0-d-e1-ft#http://cdn1.jora.com/assets/app-store-logos/play-store-vi-1dc2b41b499200218b7543efad90825bb4f9888fcb8cb839e97a476c6aa045cd.png" class="CToWUd" data-bit="iit">
                        </a>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </td>
                        </tr>
                        <tr>
                        <td style="padding-bottom:24px">
                        <div style="color:#626262;font-size:14px;text-align:center">
                        Bạn đã chọn nhận email Thông báo việc làm.<br> Bạn không còn quan tâm nữa? <a href="http://35.187.238.233:3000">
                        Hủy đăng ký
                        </a> 
                        hoặc 
                        <a href="http://35.187.238.233:3000">
                        chỉnh sửa sở thích của bạn
                        </a>
                        </div>
                        </td>
                        </tr>
                        <tr>
                        <td>
                        <div style="color:#626262;font-size:14px;text-align:center">
                        <a href="http://35.187.238.233:3000">
                        JobStreet
                        </a>
                        &nbsp;- tìm một, thấy mười&nbsp;|&nbsp;Job Seeker Pty Ltd
                        </div>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                    </div>
                </body>
                </html>`;
            if (matchJob.length > 0) 
            {
            await sendEmail(alert.email, content);
            }
        });
    });
}
//
module.exports=sendAll;

