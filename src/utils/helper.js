import nodemailer from "nodemailer";
import logger, { logStream } from '../config/logger';

export const sendMail = (userMailID, token) => {
    console.log("user credentials", process.env.SENDER_ID , process.env.PASSWORD);
    const host = process.env.APP_HOST;
    const port = process.env.APP_PORT;
    const api_version = process.env.API_VERSION;

    const transport = nodemailer.createTransport(
        {
            service : "gmail",
            auth: {
                user: process.env.SENDER_ID,
                pass: process.env.PASSWORD
            }
        }
    )
  // send mail with defined transport object
  const mailOption = {
    from: process.env.SENDER_ID,
    to: userMailID,
    subject: "Password Reset Link",
    html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><"$http://localhost:3000/users/resetPassword/y${token}">click here</a></h1>`, // html body
  }

  transport.sendMail(mailOption, (err, info_) => {
      const sendMailInfo = err ? logger.log('error', err) : logger.log('info', info);
      return sendMailInfo;
  })
};



