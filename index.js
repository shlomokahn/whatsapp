const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log('סרוק את הקוד כדי להתחבר:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('הבוט מחובר ומוכן לפעולה!');
});

client.on('message', async message => {
    const keywords = ["הזמנה", "תשלום", "דחוף"]; // רשימת מילות המפתח שלך
    if (keywords.some(word => message.body.includes(word))) {
        console.log(`🚀 הודעה עם מילת מפתח נמצאה: ${message.body}`);
        console.log(`📌 קישור להודעה: https://web.whatsapp.com/send?phone=${message.from.replace('@c.us', '')}`);

        // ניתן גם לשלוח התראה לאימייל/טלגרם או להחזיר תשובה בוואטסאפ
        message.reply(`📌 נמצאה הודעה עם מילת מפתח: ${message.body}`);
    }
});

client.initialize();
