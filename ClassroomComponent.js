import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const ClassroomComponent = ({ appId, channel, uid, role }) => {
  const [client] = useState(() => AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }));
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
        console.log('Joined classroom channel');
        if (role === 'teacher') {
          // Add logic for screen sharing, participant management
        }
      }).catch(error => {
        console.error('Failed to join channel:', error);
      });
    }
  }, [client, appId, channel, token, uid, role]);

  return <div>Classroom Interface</div>;
};

export default ClassroomComponent;