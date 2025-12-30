import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserDTO } from 'src/db/UserDTOs/UserDTO';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_users' })
  async getUsers(): Promise<UserDTO[]> {
    return await this.userService.getUsers();
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(createUserDTO): Promise<UserDTO> {
    console.log('im here');
    return await this.userService.createUser(createUserDTO);
  }
}
