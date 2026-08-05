const nodemailer = require('nodemailer');
require('dotenv').config();

const {
  EMAIL_SERVICE,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_FROM,
} = process.env;

const transporterConfig = EMAIL_HOST && EMAIL_PORT
  ? {
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: EMAIL_SECURE === 'true' || Number(EMAIL_PORT) === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    }
  : {
      service: EMAIL_SERVICE || 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    };

const transporter = nodemailer.createTransport(transporterConfig);

transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter verification failed:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: EMAIL_FROM || '"Book Donation Platform" <no-reply@example.com>',
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

module.exports = sendEmail;
