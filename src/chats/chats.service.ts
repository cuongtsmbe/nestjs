import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/ auth.service';

@Injectable()
export class ChatsService {
    constructor(private authService: AuthService) {}
    getUserFromSocket(socket: Socket) {
        try{
            let auth_token = socket.handshake.headers['authorization'];
            // get the token itself without "Bearer"
            auth_token = auth_token.split(' ')[1];
            
            const user = this.authService.getUserFromAuthenticationToken(
                auth_token
            );

            if (!user) {
                throw new WsException('Invalid credentials.');
            }
            return user;
        }catch(e){
            console.error('Error:', e.message);
        }
    }
}
