import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../User/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
      
        try {

            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            
            if (!regex.test(email)) {
                throw new BadRequestException();
            }

            const user = await this.userService.findUser(email);

            if (user?.password !== pass) {
                throw new UnauthorizedException();
            }
            
            const payload = { sub: user.id, email: user.email };
            
            return {
                access_token: await this.jwtService.signAsync(payload),
            };

        } catch (error) {
            throw new Error(error.message);
        }
      
  }
}