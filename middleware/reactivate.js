const nodemailer = require('nodemailer');
const emailURL = process.env.emailURL;
const emailUser = process.env.nodemailer_user;
const emailPass = process.env.nodemailer_pass;

async function sendReactivateEmail(firstName, email, GUID) {
  let emailBody = `Hello ${firstName},

  Thank you for reactivating your Diaper Buddy account. In order to complete the reactivation, please copy and past or click the link below. If you received this by mistake then please ignore.

  ${emailURL}/reactivate/?email=${email}&guid=${GUID}

  Have a wonderful day!`;

  let transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  let mailOptions = {
    from: emailUser,
    to: email,
    subject: 'Diaper Buddy Reactivation Link',
    text: emailBody,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('ERROR from email reactivate: ', error);
    return error;
  }
}

module.exports.sendReactivateEmail = sendReactivateEmail;
