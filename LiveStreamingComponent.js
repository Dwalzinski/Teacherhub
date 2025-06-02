import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const LiveStreamingComponent = ({ appId, channel, uid }) => {
  const [client] = useState(() => AgoraRTC.createClient({ mode: 'live', codec: 'vp8' }));
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch(`/get-rtc-token?channelName=${channel}&uid=${uid}`);
      const { token } = await response.json();
      setToken(token);
    };
    fetchToken();
  }, [channel, uid]);

  useEffect(() => {
    if (token) {
      client.join(appId, channel, token, uid).then(() => {
        console.log('Joined live streaming channel');
        // Add logic to publish local tracks and subscribe to remote streams
      }).catch(error => {
        console.error('Failed to join channel:', error);
      });
    }
  }, [client, appId, channel, token, uid]);

  return <div>Live Streaming Interface</div>;
};

export default LiveStreamingComponent;