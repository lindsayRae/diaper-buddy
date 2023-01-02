const nodemailer = require('nodemailer');
const emailURL = process.env.emailURL;
const emailUser = process.env.nodemailer_user;
const emailPass = process.env.nodemailer_pass;

async function sendEmail(firstName, email, GUID) {
  let emailBody = `Hello ${firstName},

  Thank you for registering with Diaper Buddy. In order to activate your account, please copy and past or click the link below. If you received this by mistake then please ignore.

  ${emailURL}/activate/?email=${email}&guid=${GUID}

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
    subject: 'Diaper Buddy Activation Link',
    text: emailBody,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error email registration: '.error);
    return error;
  }
}

module.exports.sendEmail = sendEmail;
