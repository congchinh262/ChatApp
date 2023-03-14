import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { NODE_MAILER_CONFIG } from "../config";

const transporter = nodemailer.createTransport({
  host: NODE_MAILER_CONFIG.HOSTNAME,
  service: "gmail",
  port: 465,
  secure: false,
  requireTLS: true,
  auth: {  
    user: NODE_MAILER_CONFIG.USERNAME,
    pass: NODE_MAILER_CONFIG.PASSWORD,
  },
  logger: true,
});

export const sendMail = async (params: {
  to: string;
  subject: string;
  text?: string;
  html: string;
}) => {
  const { to, subject, text, html } = params;
  try{
    await transporter
    .sendMail({
      from: NODE_MAILER_CONFIG.FROM,
      to,
      subject,
      text: text ?? undefined,
      html,
    })
  } catch (error) {
    console.log(error);
  }
};

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
