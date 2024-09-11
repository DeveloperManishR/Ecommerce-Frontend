import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();
const ENDPOINT =import.meta.env.VITE_REACT_APP_BASEURL;
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    console.log("socket",socket)
    const userId = useSelector((state) => state.auth.user.id);
    console.log("user",userId)

    useEffect(() => {
        if (userId) {
            const newSocket = socketIOClient(ENDPOINT);
            newSocket.emit('register', userId);
            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [userId]);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

