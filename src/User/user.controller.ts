import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserDTO } from 'src/db/DTOs/UserDTOs/UserDTO';
import type { CreateUserDTO } from 'src/db/DTOs/UserDTOs/CreateUserDTO';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_users' })
  async getUsers(): Promise<UserDTO[]> {
    return await this.userService.getUsers();
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return await this.userService.createUser(createUserDTO);
  }

  @MessagePattern({ cmd: 'find_user' })
  async findUser(email: string): Promise<UserDTO | undefined> {
    return await this.userService.findUser(email);
  }

  @MessagePattern({ cmd: 'check_user' })
  async checkUser(email: string): Promise<boolean> {
    return await this.userService.checkUser(email);
  }
}
