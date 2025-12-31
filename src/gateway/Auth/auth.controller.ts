import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import type { SignInDTO } from 'src/DTOs/AuthDTOs/SignInDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(
      @Res() response: Response<{ access_token: string } | { message: string }>,
      @Body() signInDto: SignInDTO
  ): Promise<Response<{ access_token: string } | { message: string }>> {
      
      try {
          
          const token = await this.authService.signIn(signInDto.email, signInDto.password);
          return response.status(200).json({ ...token });

      } catch (error) {
          return response.status(403).json({ message: error.message })
      }
    
  }
}