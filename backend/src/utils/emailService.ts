import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  service: "gmail",
  secure: false,
  auth: {
    user: "codewithtoyin@gmail.com",
    pass: "eymn koiw ojih zuws",
  },
} as SMTPTransport.Options);

export const sendOTP = (email: string, otp: string): void => {
  const mailOptions = {
    from: "codewithtoyin@gmail.com",
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #2E86C1;">Hello!</h2>
        <p>Thank you for signing up to COTICKET. We're excited to have you on board.</p>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <p style="font-size: 1.5em; font-weight: bold; color: #E74C3C;">${otp}</p>
        <p>Please use this code to complete your verification process. The OTP is valid for the next 10 minutes.</p>
        <blockquote style="border-left: 4px solid #2E86C1; padding-left: 10px; color: #5D6D7E;">
          “We love what we do and we do what our clients love & work with great clients all over the world to create thoughtful and purposeful websites.”
                ― ProWeb365
        </blockquote>
        <p>If you did not request this code, please ignore this email or contact support.</p>
        <p>Best regards,<br>COTICKET Team</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};
