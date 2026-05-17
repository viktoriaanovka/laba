const express = require('express');
const path = require('path');
const Mailjet = require('node-mailjet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            error: 'Усі поля форми мають бути заповнені',
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            error: 'Некоректна email-адреса',
        });
    }

    try {
        await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: process.env.SENDER_EMAIL,
                        Name: 'Lab 6 Contact Form',
                    },
                    To: [
                        {
                            Email: process.env.OWNER_EMAIL,
                            Name: 'Site Owner',
                        },
                    ],
                    Subject: subject,
                    TextPart: `Ім'я: ${name}\nEmail: ${email}\n\nПовідомлення:\n${message}`,
                    HTMLPart: `
                        <h3>Нове повідомлення з сайту</h3>
                        <p><strong>Ім'я:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Тема:</strong> ${subject}</p>
                        <p><strong>Повідомлення:</strong></p>
                        <p>${message}</p>
                    `,
                },
            ],
        });

        return res.status(200).json({
            message: 'Повідомлення успішно відправлено',
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Помилка під час відправлення email через Mailjet',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});