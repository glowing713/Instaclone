import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mailgun from "nodemailer-mailgun-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

console.log(process.env.MAILGUN_API, process.env.MAILGUN_DOMAIN);

const sendMail = (email) => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };

  const client = nodemailer.createTransport(mailgun(options));

  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "nico@prismagram.com",
    to: address,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret is ${secret}.<br/>Copy paste on the app/website to log in.`,
  };
  return sendMail(email);
};
