import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';
import { MessageRoomDto } from './dtos/messageRoom.dto';
import { RedisService } from 'src/redis/redis.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect { 
    @WebSocketServer()
    server: Server;

    constructor(
        private chatsService: ChatsService,
        private redisService: RedisService
    ) {}

    async handleConnection(socket: Socket) {
        const user_id= await this.chatsService.getUserFromSocket(socket)
        if (user_id) {
            // Storing the socket instance in the dictionary with user ID as the key
            await this.redisService.setConnectedUser(user_id, socket.id);
            console.log('Connected user_id:', user_id);
        } else {
            console.log('An unauthenticated socket connected.');
        }

        const socketId = socket.id;
        console.log('Connected socket ID:', socketId);
    }

    async handleDisconnect(socket: Socket) { 
        const user_id = await this.chatsService.getUserFromSocket(socket);
        if (user_id) {
            await this.redisService.removeConnectedUser(user_id);
            console.log(`Socket with ID ${socket.id} and user ID ${user_id} disconnected(offline).`);

        } else {

            console.log(`An unauthenticated socket with ID ${socket.id} disconnected(offline).`);
        }
    }

    @SubscribeMessage('send_message')
    async sendForMessages(@MessageBody() messageJson: any, @ConnectedSocket() socket: Socket) {
        const socket_id =await this.redisService.getConnectedUser("user_id"+messageJson.toUserId);
        this.chatsService.sendMessage(socket,messageJson,socket_id,this.server);
    }

    @SubscribeMessage('online')
    async sendStatusOnline(@MessageBody() messageJson: any, @ConnectedSocket() socket: Socket) {
        this.chatsService.sendOnline(socket,messageJson,this.server);
    }

    @SubscribeMessage('receive_message')
    async listenForMessages(@MessageBody() message: string) {
        console.log("receive_message",message);
    }

    @SubscribeMessage('chat_room')
    async sendMessageToRoom(@MessageBody() messageJson: MessageRoomDto, @ConnectedSocket() socket: Socket) {
        this.chatsService.sendMessageInRoom(socket,messageJson);
    }

    @SubscribeMessage('typing')
    handleTypingEvent(@MessageBody() data: { roomName: string, isTyping: true }, @ConnectedSocket() socket: Socket) {
        this.chatsService.sendTyping(socket,data);
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