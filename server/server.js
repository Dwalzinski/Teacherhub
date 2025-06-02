require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { RtcTokenBuilder, RtcRole } = require('agora-token');

const app = express();
app.use(cors());
app.use(express.json());

const { AGORA_APP_ID, AGORA_APP_CERTIFICATE, PORT } = process.env;

function generateRtcToken(channelName, uid, role, expirationTimeInSeconds) {
  if (!AGORA_APP_ID || !AGORA_APP_CERTIFICATE) {
    throw new Error('AGORA_APP_ID and AGORA_APP_CERTIFICATE must be defined');
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  
  return RtcTokenBuilder.buildTokenWithUid(
    AGORA_APP_ID,
    AGORA_APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );
}

app.get('/get-rtc-token', (req, res) => {
  const { channelName, uid } = req.query;
  
  try {
    const token = generateRtcToken(
      channelName,
      parseInt(uid) || 0,
      RtcRole.PUBLISHER,
      3600
    );
    res.json({ token });
  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

app.get('/get-rtm-token', (req, res) => {
  const { uid } = req.query;
  
  try {
    const token = generateRtcToken(
      'RTM',
      uid,
      RtcRole.PUBLISHER,
      3600
    );
    res.json({ token });
  } catch (error) {
    console.error('RTM token generation error:', error);
    res.status(500).json({ error: 'Failed to generate RTM token' });
  }
});

const port = PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));