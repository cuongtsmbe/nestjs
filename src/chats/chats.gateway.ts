import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    constructor(private chatsService: ChatsService) {}

    async handleConnection(socket: Socket) {
        await this.chatsService.getUserFromSocket(socket)
        const socketId = socket.id;
        console.log('Connected socket ID:', socketId);
    }

    @SubscribeMessage('send_message')
    async listenForMessages(@MessageBody() message: string, @ConnectedSocket() socket: Socket) {

        const user = await this.chatsService.getUserFromSocket(socket)
        this.server.sockets.emit('receive_message', {
            message,
            user
        });
    }

    @SubscribeMessage('join_room')
    async handleJoinRoomEvent(@MessageBody() roomName: string, @ConnectedSocket() socket: Socket) {
        socket.join(roomName);
        console.log(`Socket with ID ${socket.id} joined room: ${roomName}`);
    }

    @SubscribeMessage('leave_room')
    async handleLeaveRoomEvent(@MessageBody() roomName: string, @ConnectedSocket() socket: Socket) {
        socket.leave(roomName);
        console.log(`Socket with ID ${socket.id} left room: ${roomName}`);
    }

}