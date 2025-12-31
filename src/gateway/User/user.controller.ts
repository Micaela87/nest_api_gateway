import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/DTOs/UserDTOs/UserDTO';
import type { CreateUserDTO } from 'src/DTOs/UserDTOs/CreateUserDTO';
import type { Response } from 'express';
import { AuthGuard } from '../Auth/auth.guard';

@Controller("users")
export class UserController {
  
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(
    @Res() response: Response<{ data: UserDTO[] | string }>
  ): Promise<Response<{ data: UserDTO[] | string }>> {

    try {

      const data: UserDTO[] = await this.userService.getUsers();
      return response.status(200).json({ data });

    } catch (error) {
      return response.status(500).json({ data: error.message });
    }
    
  }

  @UseGuards(AuthGuard)
  @Post()
  async createUser(
    @Res() response: Response<{ data: UserDTO | string }>,
    @Body() createUserDTO: CreateUserDTO
  ): Promise<Response<{ data: UserDTO | string }>> {
    
    try {
      
      const data: UserDTO = await this.userService.createUser(createUserDTO);
      return response.status(200).json({ data });

    } catch (error) {
      return response.status(500).json({ data: error.message });
    }
  }
}
