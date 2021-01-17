const setup = require('../../../config/setup')
var nodemailer = require('nodemailer');

function sendEmail(to, subject, message) {
    let transporter = nodemailer.createTransport({
      // host: setup.smtp.host,
      // port: setup.smtp.port,
      // secure: setup.smtp.secure,
      service: setup.smtp.service,
      auth: {
        user: setup.smtp.user,
        pass: setup.smtp.password
      }
    });
    let mailOptions = {
      from: setup.smtp.user,
      to: to.join(","),
      subject: subject ,
      html: message
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
      {
        console.log('err-email', err);
      }
    });
}

module.exports = {
  sendEmail,
}
