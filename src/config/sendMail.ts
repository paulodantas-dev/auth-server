import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, url: string, txt: string) => {
  const { OAuth2 } = google.auth;

  const oauth2Client = new OAuth2(
    process.env.MAILING_SERVICE_CLIENT_ID,
    process.env.MAILING_SERVICE_CLIENT_SECRET,
    process.env.OAUTH_PLAYGROUND
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.MAILING_SERVICE_REFRESH_TOKEN,
  });

  const token = new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

  const smtpTransport = nodemailer.createTransport({
    port: 587,
    host: 'smtp.gmail.com',
    service: 'gmail',
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_ADDRESS,
      clientId: process.env.MAILING_SERVICE_CLIENT_ID,
      clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
      accessToken: token,
    },
  } as nodemailer.TransportOptions);

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: to,
    subject: 'MERN-AUTH-APP by Paulo Dantas',
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: #0f766e;">Welcome to the mern full auth.</h2>
              <div style="text-align: center; margin: 50px 0">
                 <a href=${url} style="background: #0e7490; text-decoration: none; color: white; padding: 10px 20px;">${txt}</a>
              </div>
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>

              <div>
                <p style="font-size: 8px;">
                  ${url}
                </p>
              </div>
            </div>
        `,
  };
  smtpTransport.sendMail(mailOptions, (err, result) => {
    if (err) {
      return err;
    }

    return result;
  });
};
