const nodemailer = require('nodemailer');
const emailURL = process.env.emailURL;
const emailUser = process.env.nodemailer_user;
const emailPass = process.env.nodemailer_pass;

async function sendEmailReset(firstName, email, GUID) {
  let emailBody = `Hello ${firstName},

  You are receiving this email because you want to reset your password for the Diaper application. To do so, please copy and past or click the link below. If you received this by mistake then please ignore.

  ${emailURL}/pass-reset/?email=${email}&guid=${GUID}

  Have a wonderful day!`;

  //! nodemailer no longer takes gmail
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
    subject: 'Diaper Buddy password reset',
    text: emailBody,
  };
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
}

module.exports.sendEmailReset = sendEmailReset;
