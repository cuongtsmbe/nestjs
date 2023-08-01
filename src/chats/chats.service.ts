import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ElasticService } from 'elasticsearch/elastic.service';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/ auth.service';

@Injectable()
export class ChatsService {
    constructor(private authService: AuthService,
        private elasticService: ElasticService,
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
    async sendMessage(socket: Socket,data: {toUserId: string, message: string},connectedUsers: { [user_id: string]: Socket } ) {
  
        const fromUserId = this.getUserFromSocket(socket);
        const toSocket = connectedUsers[data.toUserId];
    
        if (!toSocket) {
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
        toSocket.emit('receive_message', {
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
}
