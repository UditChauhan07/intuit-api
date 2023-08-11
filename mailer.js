// mailer.js
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendResetPasswordEmail = async (email, resetLink) => {
  try {
    const msg = {
        to: email,
        from: 'gurindersingh.dx@gmail.com', // Replace with your verified sender email in SendGrid
        subject: 'Reset Your Password',
        html: `<p>Click the following link to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
      };

    await sgMail.send(msg);
    console.log('Reset password email sent successfully!');
  } catch (error) {
    console.error('Error sending reset password email:', error);
  }
};

module.exports = { sendResetPasswordEmail };
