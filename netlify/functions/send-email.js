// Netlify Function wrapper for SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'no-reply@example.com';

const handler = async (event) => {
  if(event.httpMethod !== 'POST') return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  if(!SENDGRID_API_KEY) return { statusCode: 500, body: JSON.stringify({ error: 'Server not configured. Set SENDGRID_API_KEY.' }) };

  try{
    const body = JSON.parse(event.body || '{}');
    const { name, email, message, _honey } = body;
    if(_honey) return { statusCode: 400, body: JSON.stringify({ error: 'Spam detected' }) };
    if(!name || !email || !message) return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };

    const sg = require('@sendgrid/mail');
    sg.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: process.env.RECEIVER_EMAIL || process.env.SENDER_EMAIL,
      from: SENDER_EMAIL,
      subject: `Website Inquiry — ${name || 'New lead'}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`
    };
    await sg.send(msg);
    return { statusCode: 200, body: JSON.stringify({ ok: true, message: 'Message sent. Thank you!' }) };
  }catch(err){
    console.error('netlify send-email err', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error sending email' }) };
  }
};

module.exports = { handler };
