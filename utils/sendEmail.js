const nodemailer = require("nodemailer");

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const secretmanagerClient = new SecretManagerServiceClient();

const callAccessSecretVersionHost = async () => {
  // Construct request
  const request = {
    name: 'projects/720009966636/secrets/EMAIL_HOST/versions/latest'
  };
  // Run request
  const [responseHost] = await secretmanagerClient.accessSecretVersion(request);
  const secretValueHost = responseHost.payload.data.toString();
  return secretValueHost;
}

const callAccessSecretVersionUser = async () => {
  // Construct request
  const request = {
    name: 'projects/720009966636/secrets/EMAIL_USER/versions/latest'
  };
  // Run request
  const [responseUser] = await secretmanagerClient.accessSecretVersion(request);
  const secretValueUser = responseUser.payload.data.toString();
  return secretValueUser;
}

const callAccessSecretVersionPass = async () => {
  // Construct request
  const request = {
    name: 'projects/720009966636/secrets/EMAIL_PASS/versions/latest'
  };
  // Run request
  const [responsePass] = await secretmanagerClient.accessSecretVersion(request);
  const secretValuePass = responsePass.payload.data.toString();
  return secretValuePass;
}

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  const secretValueHost = await callAccessSecretVersionHost();
  const secretValueUser = await callAccessSecretVersionUser();
  const secretValuePass = await callAccessSecretVersionPass();
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    host: secretValueHost,
    port: 587,
    auth: {
      user: secretValueUser,
      pass: secretValuePass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Option for sending email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;


//ENV
// const nodemailer = require("nodemailer");

// const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
//   // Create Email Transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: 587,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   // Option for sending email
//   const options = {
//     from: sent_from,
//     to: send_to,
//     replyTo: reply_to,
//     subject: subject,
//     html: message,
//   };

//   // send email
//   transporter.sendMail(options, function (err, info) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(info);
//     }
//   });
// };

// module.exports = sendEmail;