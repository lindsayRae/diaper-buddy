const nodemailer = require('nodemailer');
const nodemailerPass = process.env.nodemailerPass;

let sendLowAlertEmail = (firstName, email, lowAlertAmount) => {
  let emailBody = `Hello ${firstName},

  This is a courtesy reminder that your diaper inventory is at or below ${lowAlertAmount} diapers. 

  If you no longer want to receive this update please go into your Settings and change the Alert dropdown to 'None'. 

  Thank you,
  Diaper Buddy`;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lbarnett712@gmail.com',
      pass: nodemailerPass,
    },
  });

  let mailOptions = {
    from: 'lbarnett712@gmail.com',
    to: email,
    subject: 'Diaper Buddy - Low Diaper Alert',
    text: emailBody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(`error: ${error}`);
    console.log(`info: ${info}`);
    // if (error) {
    //   res.send({ error: error }); // res is not defined
    // } else {
    //   res.send({ status: 200, message: 'Email was sent. Thank you!' });
    // }
  });
};

module.exports.sendLowAlertEmail = sendLowAlertEmail;
