import AgoraRTC from 'agora-rtc-sdk-ng';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

async function joinChannel(appId, token, channel, uid) {
  try {
    await client.join(appId, channel, token, uid);
    console.log(`Joined channel ${channel} as user ${uid}`);
    // Add code to publish local tracks, subscribe to remote tracks, etc.
  } catch (error) {
    console.error('Failed to join channel:', error);
  }
}

export { client, joinChannel };