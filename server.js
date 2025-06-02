const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-token');

const app = express();
app.use(express.json());

function generateRtcToken(appId, appCertificate, channelName, uid, role, expirationTimeInSeconds) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  return RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
}

app.get('/get-rtc-token', (req, res) => {
  const { channelName, uid } = req.query;
  const appId = 'your_app_id'; // Replace with your Agora App ID
  const appCertificate = 'your_app_certificate'; // Replace with your Agora App Certificate
  try {
    const token = generateRtcToken(appId, appCertificate, channelName, uid || 0, RtcRole.PUBLISHER, 3600);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));