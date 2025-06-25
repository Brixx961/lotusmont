const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

const MAILCHIMP_API_KEY = 'c3e6330bbe15a2a94e8cb2010adf9002-us19';
const AUDIENCE_ID = '1f59d1e4bb';
const DATACENTER = 'us19';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const auth = Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64');

    console.log('Attempting to subscribe:', email);

    const response = await axios.post(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        email_address: email,
        status: 'subscribed',
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Mailchimp success response:', response.data);
    res.status(200).json({ message: '🎉 Subscribed successfully!' });
  } catch (error) {
    console.error('Mailchimp API error:', JSON.stringify(error.response?.data, null, 2) || error.message);

    const mailchimpError = error.response?.data;

    if (mailchimpError?.title === 'Member Exists') {
      return res.status(400).json({ message: '⚠️ Email is already subscribed.' });
    }

    res.status(500).json({
      message: '❌ Subscription failed.',
      error: mailchimpError?.detail || mailchimpError?.title || 'Unknown error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
