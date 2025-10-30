// Vercel / Serverless function example using SendGrid
// Deploy to Vercel (place this file at /api/send-email.js) or adapt for Netlify.

const SENDER_EMAIL = process.env.SENDER_EMAIL || 'no-reply@example.com';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

async function sendViaSendgrid({ name, email, message }){
  const sg = require('@sendgrid/mail');
  sg.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: process.env.RECEIVER_EMAIL || process.env.SENDER_EMAIL,
    from: SENDER_EMAIL,
    subject: `Website Inquiry — ${name || 'New lead'}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`
  };
  return sg.send(msg);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!SENDGRID_API_KEY) return res.status(500).json({ error: 'Server not configured. Set SENDGRID_API_KEY.' });

  try{
    const body = req.body && Object.keys(req.body).length ? req.body : await new Promise((resolve,reject)=>{
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', ()=>{
        try{ resolve(JSON.parse(data)); }catch(e){ resolve({}); }
      });
      req.on('error', reject);
    });

    const { name, email, message, _honey } = body;

    // honeypot
    if(_honey) return res.status(400).json({ error: 'Spam detected' });

    // Basic validation
    if(!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

    await sendViaSendgrid({ name, email, message });
    return res.status(200).json({ ok: true, message: 'Message sent. Thank you!' });
  }catch(err){
    console.error('send-email error', err);
    return res.status(500).json({ error: 'Server error sending email' });
  }
};
