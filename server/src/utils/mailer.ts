import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendNotificationEmail = async (subject: string, html: string) => {
    console.log(`[Mailer] Attempting to send email: "${subject}"...`);
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("[Mailer] Missing EMAIL_USER or EMAIL_PASS in environment.");
        return;
    }

    try {
        const info = await transporter.sendMail({
            from: `"Nisyash Corporation" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: subject,
            html: html
        });
        console.log(`[Mailer] Email sent successfully: ${info.messageId}`);
    } catch (error) {
        console.error("[Mailer] Critical error sending email:", error);
        throw error; // Rethrow so the caller's .catch can also log it
    }
};