import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ElasticService } from 'src/elasticsearch/elastic.service';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/ auth.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ChatsService {
    constructor(
        private authService: AuthService,
        private elasticService: ElasticService,
        private redisService: RedisService
        ) {}
    getUserFromSocket(socket: Socket) {
        try{
            let auth_token = socket.handshake.headers['authorization'];
            // get the token itself without "Bearer"
            auth_token = auth_token.split(' ')[1];
            
            const user_id = this.authService.getUserFromAuthenticationToken(
                auth_token
            );

            if (!user_id) {
                throw new WsException('Invalid credentials.');
            }
            return user_id;
        }catch(e){
            console.error('Error:', e.message);
        }
    }

    //user A send message to B
    async sendMessage(socket: Socket,data: {toUserId: string, message: string}, socket_id: string,server:Server ) {
        const fromUserId = this.getUserFromSocket(socket);
    
        if (!socket_id) {
          throw new Error('User B is not currently connected.');
        }

        //create message in elastic
        this.elasticService.sendMessage("messages",{
            user_id: fromUserId,
            toFriends: data.toUserId,
            message: data.message
        });

        const message=data.message;
        // Sending the message to user received
        server.to(socket_id).emit('receive_message', {
            fromUserId,
            message 
        });
    }

    //react typing of user
    sendTyping(socket:Socket,data : { roomName: string, isTyping: true }){
        socket.to(data.roomName).emit('typing', { 
            isTyping: data.isTyping, 
            user: socket.id 
        });
    }

    sendMessageInRoom(socket:Socket,data : { roomName: string, message: string }){
        const fromUserId = this.getUserFromSocket(socket);
        socket.to(data.roomName).emit('receive_message', { 
            message: data.message, 
            userSend: fromUserId 
        });
    }

    //send all user online in server
    async sendOnline(socket: Socket,messageJson: any,server:Server){
        const userIdOnline:string[]= await this.redisService.getKeysWithPrefix("user_id");
        let socketIdOnline;
        for (let i = 0; i < userIdOnline.length; i++) {
            socketIdOnline = await this.redisService.getConnectedUser(userIdOnline[i]);
            console.log(userIdOnline[i],socketIdOnline);
            if(socket.id!=socketIdOnline){
                server.to(socketIdOnline).emit('receive_message', messageJson);
            }
        }
    }

}
