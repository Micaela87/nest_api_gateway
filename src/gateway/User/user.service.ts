import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDTO } from 'src/DTOs/UserDTOs/CreateUserDTO';
import { UserDTO } from 'src/DTOs/UserDTOs/UserDTO';

@Injectable()
export class UserService {

  constructor(@Inject('API_SERVICE') private readonly client: ClientProxy) {}
  
  async getUsers(): Promise<UserDTO[]> {
    
    try {

      const pattern = { cmd: 'get_users' };
      return await firstValueFrom(this.client.send<[]>(pattern, []));

    } catch (error) {
      throw new Error(error.message);
    }

  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {

    try {

      // Start validation block
      if (
        !createUserDTO.firstName ||
        !createUserDTO.lastName ||
        !createUserDTO.email ||
        !createUserDTO.password
      ) {
        throw new BadRequestException();
      }

      const cmd = { cmd: 'find_user' };
      const user: UserDTO | undefined = await firstValueFrom(this.client.send<UserDTO>(cmd, createUserDTO.email));

      if (user) {
        throw new BadRequestException();
      }
      // End validation block

      const pattern = { cmd: 'create_user' };
      return await firstValueFrom(this.client.send<UserDTO>(pattern, createUserDTO));

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findUser(email: string): Promise<UserDTO> {

    try {

      // Start validation block
      if (!email) {
        throw new BadRequestException();
      }

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if (!regex.test(email)) {
        throw new BadRequestException();
      }
      // End validation block

      const pattern = { cmd: 'find_user' };
      const user: UserDTO | undefined = await firstValueFrom(this.client.send<UserDTO>(pattern, email));

      if (!user) {
        throw new NotFoundException();
      }

      return user;

    } catch (error) {
      throw new Error(error.message);
    }
  }
}
