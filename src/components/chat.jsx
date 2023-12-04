import React from 'react';
import './chat.css';
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
import '@zegocloud/zimkit-react/index.css';
import { useEffect, useState } from 'react';
import { app_id, app_secret } from './constants';

const id = Math.floor(Math.random() * 1000);

function ChatRoom() {
  const [state, setState] = useState({
    appConfig: {
      appID: app_id, // The AppID you get from the ZEGOCLOUD admin console.
      serverSecret: app_secret, // The serverSecret you get from ZEGOCLOUD Admin Console.
    },
    // The userID and userName is a strings of 1 to 32 characters.
    // Only digits, letters, and the following special characters are supported: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'
    userInfo: {
      // Your ID as a user.
      userID: `User${id}`,
      // Your name as a user.
      userName: `User${id}`,
      // The image you set as a user avatar must be network images. e.g., https://storage.zego.im/IMKit/avatar/avatar-0.png
      userAvatarUrl: '',
    },
    error: null,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const zimKit = new ZIMKitManager();
        const token = zimKit.generateKitTokenForTest(
          state.appConfig.appID,
          state.appConfig.serverSecret,
          state.userInfo.userID
        );
        await zimKit.init(state.appConfig.appID);

        // Handle the connectUser() call with a catch block to handle errors
        await zimKit.connectUser(state.userInfo, token).catch((error) => {
          console.error('Error occurred during connection:', error);
          setState({ ...state, error: 'Error occurred during connection' });
        });
      } catch (error) {
        console.error('Error occurred during initialization:', error);
        setState({ ...state, error: 'Error occurred during initialization' });
      }
    };

    init().catch(handleErrors);
  }, [state]);

  const handleErrors = (error) => {
    console.error('Unhandled promise rejection:', error);
    setState({ ...state, error: 'Unhandled promise rejection' });
  };

  return (
    <div className="App">
      Welcome Home {state.userInfo.userID}
      <Common></Common>
      {state.error && <div>Error: {state.error}</div>}
    </div>
  );
}

export default ChatRoom;


