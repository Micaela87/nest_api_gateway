import { Module } from '@nestjs/common';
import { UserController } from './User/user.controller';
import { UserService } from './User/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
