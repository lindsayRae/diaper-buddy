const nodemailer = require('nodemailer');
const emailURL = process.env.emailURL;

let sendEmailReset = (firstName, email, GUID) => {
  let emailBody = `Hello ${firstName},

  You are receiving this email because you want to reset your password for the Diaper application. To do so, please copy and past or click the link below. If you received this by mistake then please ignore.

  ${emailURL}/pass-reset/?email=${email}&guid=${GUID}

  Have a wonderful day!`;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lbarnett712@gmail.com',
      pass: 'hwhyqqoeaujzfics',
    },
  });

  let mailOptions = {
    from: 'lbarnett712@gmail.com',
    to: email,
    subject: 'Diaper Buddy password reset',
    text: emailBody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send({ error: error });
    } else {
      res.send({ status: 200, message: 'Email was sent. Thank you!' });
    }
  });
};

module.exports.sendEmailReset = sendEmailReset;
