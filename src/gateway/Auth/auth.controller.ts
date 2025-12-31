import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { SignInDTO } from 'src/DTOs/AuthDTOs/SignInDTO';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: SignInDTO })
  @Post('login')
  async signIn(
      @Res() response: Response<{ access_token: string } | { data: string }>,
      @Body() signInDTO: SignInDTO
  ): Promise<Response<{ access_token: string } | { data: string }>> {
      
      try {
          
          if (!signInDTO.email || !signInDTO.password) {
              throw new BadRequestException();
          }
          
          const token = await this.authService.signIn(signInDTO.email, signInDTO.password);
          return response.status(200).json({ ...token });

      } catch (error) {
          return response.status(401).json({ data: error.message })
      }
    
  }
}