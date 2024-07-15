import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

export const connect = (token, onMessageReceived) => {
    const socket = new SockJS('http://localhost:8085/ws');
    stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
            Authorization: `Bearer ${token}`
        },
        debug: (str) => {
            console.log(str);
        }
    });

    stompClient.onConnect = () => {
        console.log('Connected to WebSocket');
        stompClient.subscribe('/user/queue/notifications', (message) => {
            console.log('Received notification:', message.body);
            onMessageReceived(message.body);
        });
    };

    stompClient.onStompError = (frame) => {
        console.error(`Broker reported error: ${frame.headers.message}`);
        console.error(`Additional details: ${frame.body}`);
    };

    stompClient.onWebSocketError = (frame) => {
        console.error('WebSocket error: ', frame);
    };

    stompClient.onWebSocketClose = (frame) => {
        console.log('WebSocket closed: ', frame);
    };

    stompClient.activate();
};

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.deactivate();
    }
};
