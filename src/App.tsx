import React from 'react';
import LiveStreamingComponent from './LiveStreamingComponent';
import ClassroomComponent from './ClassroomComponent';
import ChatComponent from './ChatComponent';

const App = () => {
  const appId = import.meta.env.VITE_AGORA_APP_ID;
  const defaultChannel = 'default-channel';
  const uid = Math.floor(Math.random() * 1000000);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">TeacherHub</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Live Streaming</h2>
            <LiveStreamingComponent 
              appId={appId} 
              channel={defaultChannel} 
              uid={uid} 
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Classroom</h2>
            <ClassroomComponent 
              appId={appId} 
              channel={defaultChannel} 
              uid={uid} 
              role="student"
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Chat</h2>
            <ChatComponent 
              appId={appId} 
              channel={defaultChannel} 
              uid={uid.toString()} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;