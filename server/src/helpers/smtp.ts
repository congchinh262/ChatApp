import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { NODE_MAILER_CONFIG } from "../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: NODE_MAILER_CONFIG.USERNAME,
    pass: NODE_MAILER_CONFIG.PASSWORD,
  },
  logger: true,
});

export const sendMail = (params: {
  to: string;
  subject: string;
  text?: string;
  html: string;
}) => {
  const { to, subject, text, html } = params;
  transporter
    .sendMail({
      from: NODE_MAILER_CONFIG.FROM,
      to,
      subject,
      text: text ?? undefined,
      html,
      headers: { "x-myheader": "test header" },
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });
};

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
