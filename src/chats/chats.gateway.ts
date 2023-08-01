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

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect { 
    @WebSocketServer()
    server: Server;
    private connectedUsers: { [user_id: string]: Socket } = {};

    constructor(
        private chatsService: ChatsService
    ) {}

    async handleConnection(socket: Socket) {
        const user_id= await this.chatsService.getUserFromSocket(socket)
        if (user_id) {
            // Storing the socket instance in the dictionary with user ID as the key
            this.connectedUsers[user_id] = socket;
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

            delete this.connectedUsers[user_id];
            console.log(`Socket with ID ${socket.id} and user ID ${user_id} disconnected(offline).`);

        } else {

            console.log(`An unauthenticated socket with ID ${socket.id} disconnected(offline).`);
        }
    }


    @SubscribeMessage('add_friend')
    async handleAddFriendEvent(@MessageBody() friendId: string, @ConnectedSocket() socket: Socket) {
        try {
            //const user = await this.chatsService.getUserFromSocket(socket);

            //add friends
           
            // Notify the user about the successful friend request
            // const friend = await this.chatsService.getUserById(friendId);
            // socket.emit('friend_request_sent', friend);

            // Notify the friend that they received a new friend request
            // const friendSocket = this.findSocketByUserId(friend.id);
            // if (friendSocket) {
            //     friendSocket.emit('friend_request_received', user);
            // }
        } catch (error) {
            // Handle errors if needed
            console.error('Error adding friend:', error.message);
        }
    }


    @SubscribeMessage('send_message')
    async sendForMessages(@MessageBody() messageJson: any, @ConnectedSocket() socket: Socket) {
        this.chatsService.sendMessage(socket,messageJson,this.connectedUsers);
    }

    @SubscribeMessage('receive_message')
    async listenForMessages(@MessageBody() message: string, @ConnectedSocket() socket: Socket) {
        console.log("receive_message",message);
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