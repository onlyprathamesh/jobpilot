const twilio = require("twilio");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendWhatsappReminder = async ({message}) => {
    try {
        await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM,
            to: 'whatsapp:+917385373925',
            body: message
        });
    } catch (error) {
        console.error("Error sending WhatsApp message:", error.message);
    }
};

module.exports = sendWhatsappReminder;