import { Injectable } from '@nestjs/common';
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

      const pattern = { cmd: 'create_user' };
      return await firstValueFrom(this.client.send<UserDTO>(pattern, createUserDTO));

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findUser(email: string): Promise<UserDTO> {

    try {

      const pattern = { cmd: 'find_user' };
      const user: UserDTO | undefined = await firstValueFrom(this.client.send<UserDTO>(pattern, email));

      if (!user) {
        throw new Error("User not found");
      }

      return user;

    } catch (error) {
      throw new Error(error.message);
    }
  }
}
