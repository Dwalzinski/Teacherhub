import React, { useEffect, useState } from 'react';
import AgoraRTM from 'agora-rtm-sdk';

const ChatComponent = ({ appId, channel, uid }) => {
  const [client] = useState(() => AgoraRTM.createInstance(appId));
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch(`/get-rtm-token?uid=${uid}`);
      const { token } = await response.json();
      setToken(token);
    };
    fetchToken();
  }, [uid]);

  useEffect(() => {
    if (token) {
      client.login({ uid, token }).then(() => {
        client.joinChannel(channel).then(() => {
          console.log('Joined chat channel');
          // Add logic to send/receive messages
        });
      }).catch(error => {
        console.error('Failed to login or join channel:', error);
      });
    }
  }, [client, token, channel, uid]);

  return <div>Chat Interface</div>;
};

export default ChatComponent;