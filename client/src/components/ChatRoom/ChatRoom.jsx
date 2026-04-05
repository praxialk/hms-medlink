import './ChatRoom.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Chat from '../Chatpanel/Chatpanel';
import Navbar from '../navbar/navbar';
import { useAuth } from '../../AuthContext/AuthContext';

const socket = io.connect(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001');

function ChatRoom() {
  const { userType, setuserType } = useAuth();
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    console.log('Stored Doctor ID:', storedUserType);
    if (storedUserType) {
      setuserType(storedUserType);
    }
  }, [setuserType]);

  const joinRoom = () => {
    if (username.trim() !== '' && room.trim() !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div>
      {userType === 'patient' && <Navbar />}
      <div className='App'>
        {!showChat ? (
          <div className='joinChatContainer'>
            <h3>Join A Chat</h3>
            <input
              type='text'
              placeholder='John...'
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              type='text'
              placeholder='Room ID...'
              onChange={(event) => setRoom(event.target.value)}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat
            socket={socket}
            username={username}
            room={room}
          />
        )}
      </div>
    </div>
  );
}

export default ChatRoom;
