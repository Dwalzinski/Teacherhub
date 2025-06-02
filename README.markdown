# Agora.io-Powered Educational Web App

This repository contains a full-stack web application built with React and Node.js, integrated with [Agora.io](https://www.agora.io/en/) to provide real-time engagement features for educational use cases. The app supports:

- **Interactive Live Streaming**: Real-time video and audio streaming using the Agora RTC Web SDK.
- **Flexible Classroom**: Virtual classroom environment with video conferencing, screen sharing, and participant management.
- **Chat**: Real-time text messaging powered by the Agora RTM Web SDK.
- **Interactive Whiteboard**: Collaborative drawing and annotation using the Agora Interactive Whiteboard Web SDK.

The backend uses Node.js with Express to handle dynamic token generation for secure access to Agora services.

## Features

- **Live Streaming**: Users can join channels as hosts or audience members to stream video and audio.
- **Classroom Environment**: Teachers and students can participate in virtual classrooms with features like screen sharing and role-based permissions.
- **Chat Functionality**: Real-time messaging between users in channels or peer-to-peer.
- **Interactive Whiteboard**: Collaborative canvas for drawing and annotation, ideal for educational content delivery.
- **Production-Ready**: Includes error handling, secure token generation, and scalable architecture.

## Tech Stack

- **Frontend**: React, Agora RTC Web SDK, Agora RTM Web SDK, Agora Interactive Whiteboard Web SDK
- **Backend**: Node.js, Express, `agora-token` npm package
- **Deployment**: Designed to run over HTTPS for Agora Web SDK compatibility

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- [Agora.io account](https://console.agora.io/) with an App ID, App Certificate, and SDK Token for the Interactive Whiteboard
- Git

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**
   - For the backend:
     ```bash
     cd server
     npm install
     ```
   - For the frontend:
     ```bash
     cd client
     npm install
     ```

3. **Configure Environment Variables**
   - Create a `.env` file in the `server` directory with the following:
     ```
     AGORA_APP_ID=your_agora_app_id
     AGORA_APP_CERTIFICATE=your_agora_app_certificate
     AGORA_SDK_TOKEN=your_agora_sdk_token
     PORT=3000
     ```
   - Replace `your_agora_app_id`, `your_agora_app_certificate`, and `your_agora_sdk_token` with credentials from the [Agora Console](https://console.agora.io/).

4. **Run the Application**
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend:
     ```bash
     cd client
     npm start
     ```
   - The app will be accessible at `http://localhost:3000` (frontend) and the backend at `http://localhost:3000` (or your configured port). For production, ensure the app runs over HTTPS.

5. **Generate Tokens**
   - The backend provides API endpoints to generate tokens for Agora RTC, RTM, and Interactive Whiteboard services. See the API Endpoints section below.

## Project Structure

- `client/`: React frontend with components for live streaming, classroom, chat, and whiteboard.
  - `LiveStreamingComponent.js`: Initializes Agora RTC client for video/audio streaming.
  - `ClassroomComponent.js`: Manages virtual classroom features like video conferencing and screen sharing.
  - `ChatComponent.js`: Handles real-time messaging with Agora RTM.
- `server/`: Node.js/Express backend for token generation and API endpoints.
  - `server.js`: Main server file with RTC/RTM token generation routes.
  - `whiteboard.js`: Handles Interactive Whiteboard room creation and token generation.
  - `rtcToken.js`: Utility for generating Agora RTC tokens.

## API Endpoints

- **GET /get-rtc-token**
  - Query Parameters: `channelName` (string), `uid` (string or number)
  - Response: `{ token: string }`
  - Description: Generates an Agora RTC token for joining a streaming or classroom channel.

- **GET /get-rtm-token**
  - Query Parameters: `uid` (string)
  - Response: `{ token: string }`
  - Description: Generates an Agora RTM token for messaging.

- **POST /create-whiteboard-room**
  - Body: `{ uid: string }`
  - Response: `{ roomUuid: string, token: string }`
  - Description: Creates a whiteboard room and generates a Room Token.

## Usage

1. **Live Streaming**:
   - Access the live streaming interface via the frontend.
   - Users can join a channel as a host or audience member to stream video/audio.

2. **Flexible Classroom**:
   - Teachers can initiate a classroom session with screen sharing and manage participants.
   - Students join as viewers with limited controls.

3. **Chat**:
   - Users can send and receive messages in real-time within a channel or peer-to-peer.

4. **Interactive Whiteboard**:
   - Teachers and students can collaborate on a shared canvas for drawing and annotations.

## Code Snippets

The following files in the repository demonstrate key integrations:

- **AgoraRTCClient.js**: Initializes the Agora RTC client for streaming.
- **server.js**: Express server with RTC token generation endpoint.
- **whiteboard.js**: Creates whiteboard rooms and generates tokens.
- **LiveStreamingComponent.js**: React component for live streaming UI.
- **ClassroomComponent.js**: React component for classroom features.
- **ChatComponent.js**: React component for chat functionality.
- **rtcToken.js**: Utility for generating RTC tokens.

## Production Considerations

- **Security**: Store Agora credentials in environment variables and use HTTPS for all communications.
- **Error Handling**: The app includes try-catch blocks for robust error management.
- **Scalability**: Agora SDKs support large-scale concurrent users; ensure the backend is optimized for token generation.

## Troubleshooting

- **Token Errors**: Verify App ID and App Certificate in the Agora Console.
- **CORS Issues**: Ensure the backend allows requests from the frontend origin.
- **Web SDK Issues**: Confirm the app runs over HTTPS, as Agora Web SDKs require secure connections.

## References

- [Agora.io Documentation](https://docs.agora.io/en/)
- [Agora RTC Web SDK](https://agoraio-community.github.io/AgoraWebSDK-NG/)
- [Agora RTM Web SDK](https://docs.agora.io/en/signaling/overview/product-overview)
- [Agora Interactive Whiteboard Web SDK](https://docs.agora.io/en/interactive-whiteboard/overview/product-overview)
- [agora-token npm Package](https://www.npmjs.com/package/agora-token)
- [netless-token GitHub](https://github.com/netless-io/netless-token)

## License

MIT License. See [LICENSE](LICENSE) for details.