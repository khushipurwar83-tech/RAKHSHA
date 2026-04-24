import { io } from 'socket.io-client';

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || 'https://rakhsha-backend.onrender.com';

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: true,
});

export default socket;