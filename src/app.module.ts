import { Module } from '@nestjs/common';
import { AuthModule } from './gateway/Auth/auth.module';
import { UserModule } from './gateway/User/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
