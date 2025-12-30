import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDTO } from 'src/db/userDTOs/CreateUserDTO';
import { UserDTO } from 'src/db/userDTOs/UserDTO';

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
      console.log(createUserDTO);
      return await firstValueFrom(this.client.send<CreateUserDTO>(pattern, createUserDTO)) as UserDTO;

    } catch (error) {
      throw new Error(error.message);
    }
  }
}
