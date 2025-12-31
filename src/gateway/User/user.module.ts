import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
        {
            name: process.env.MICROSERVICES_NAME ?? 'API_SERVICE',
            transport: Transport.TCP,
            options: {
                host: process.env.MICROSERVICES_HOST ?? '127.0.0.1',
                port: process.env.MICROSERVICES_PORT as unknown as number ?? 3001
            }
        }]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}