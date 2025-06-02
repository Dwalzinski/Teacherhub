const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

async function createWhiteboardRoom() {
  try {
    const response = await axios.post('https://api.netless.link/v5/rooms', {
      // Parameters as per Agora's REST API documentation
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': 'your_sdk_token' // Replace with SDK Token from Agora Console
      }
    });
    return response.data.uuid;
  } catch (error) {
    throw new Error('Failed to create whiteboard room: ' + error.message);
  }
}

// Implement token generation based on netless-token repository
function generateWhiteboardRoomToken(appId, appCertificate, roomUuid, uid, role, expirationTimeInSeconds) {
  // Placeholder for token generation logic
  // Refer to: https://github.com/netless-io/netless-token
  return 'generated_room_token'; // Replace with actual implementation
}

app.post('/create-whiteboard-room', async (req, res) => {
  try {
    const roomUuid = await createWhiteboardRoom();
    const token = generateWhiteboardRoomToken('your_app_id', 'your_app_certificate', roomUuid, req.body.uid, 'admin', 3600);
    res.json({ roomUuid, token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room or generate token' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));