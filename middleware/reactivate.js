const nodemailer = require('nodemailer');
const emailURL = process.env.emailURL;

let sendReactivateEmail = (firstName, email, GUID) => {
  let emailBody = `Hello ${firstName},

  Thank you for reactivating your Diaper Buddy account. In order to complete the reactivation, please copy and past or click the link below. If you received this by mistake then please ignore.

  ${emailURL}/reactivate/?email=${email}&guid=${GUID}

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
    subject: 'Diaper Buddy Reactivation Link',
    text: emailBody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(`error: ${error}`);
    console.log(`info: ${info}`);
    if (error) {
      res.send({ error: error });
    } else {
      res.send({ status: 200, message: 'Email was sent. Thank you!' });
    }
  });
};

module.exports.sendReactivateEmail = sendReactivateEmail;
