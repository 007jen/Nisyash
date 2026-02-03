import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendNotificationEmail = async (subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: `"Nisyash Corporation"<${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: subject,
            html: html
        });
    } catch (error) {
        console.error("Error sending notification email:", error);
    }
};