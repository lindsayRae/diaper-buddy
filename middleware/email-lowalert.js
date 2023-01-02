const nodemailer = require('nodemailer');
const emailUser = process.env.nodemailer_user;
const emailPass = process.env.nodemailer_pass;

async function sendLowAlertEmail(firstName, email, lowAlertAmount) {
  let emailBody = `Hello ${firstName},

  This is a courtesy reminder that your diaper inventory is at or below ${lowAlertAmount} diapers. 

  If you no longer want to receive this update please go into your Settings and change the Alert dropdown to 'None'. 

  Thank you,
  Diaper Buddy`;

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
    subject: 'Diaper Buddy - Low Diaper Alert',
    text: emailBody,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('ERROR from email low alert: ', error);
    return error;
  }
}

module.exports.sendLowAlertEmail = sendLowAlertEmail;
