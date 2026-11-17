const nodemailer = require('nodemailer');

let transporter = null;

// Real email only when SMTP settings exist in .env (SMTP_HOST, SMTP_PORT,
// SMTP_USER, SMTP_PASS). Without them there is no transporter.
function getTransporter() {
    if (!process.env.SMTP_HOST) return null;
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for 587
            auth: process.env.SMTP_USER
                ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
                : undefined
        });
    }
    return transporter;
}

async function sendMail({ to, subject, text, html }) {
    const smtp = getTransporter();

    if (!smtp) {
        // The reset LINK is a secret. Printing it is handy while you develop
        // (no mail server needed) but must never end up in production logs.
        if (process.env.NODE_ENV === 'production') {
            console.error('Email not sent: SMTP is not configured (set SMTP_HOST in .env).');
            return;
        }
        console.log('\n=========== EMAIL (development mode: SMTP is not configured) ===========');
        console.log(`To:      ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(text);
        console.log('=========================================================================\n');
        return;
    }

    await smtp.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER || 'no-reply@courier.local',
        to,
        subject,
        text,
        html
    });
}

module.exports = { sendMail };