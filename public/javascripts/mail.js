const mail = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.MAILGUN_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
}

const transporter = mail.createTransport(mailGun(auth));

const sendMail = async(name, email, subject, text, callback) => {
    const mailOptions = {
        from: `${name} <${email}>`,
        to: 'shirleyartiststudio@gmail.com',
        subject: subject,
        text:`Message: ${text}`
    };
    
    transporter.sendMail(mailOptions, function(err, data) {
        if(err) {
            callback(err, null);
        }else {
            callback(null, data);
        }
    
    });

}

module.exports = sendMail;
