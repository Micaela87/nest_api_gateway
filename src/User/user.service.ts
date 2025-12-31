import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/db/UserDTOs/CreateUserDTO';
import { UserDTO } from 'src/db/UserDTOs/UserDTO';

@Injectable()
export class UserService {

  public users: UserDTO[] = [
        {
          id: "string",
          firstName: "string",
          lastName: "string",
          email: "milano.micael@gmail.com",
          password: "Pa$$w0rD",
          dateOfBirth: new Date()
        },
        {
          id: "string",
          firstName: "string",
          lastName: "string",
          email: "milano.micael@hotmail.com",
          password: "Pa$$w0rD",
          dateOfBirth: new Date()
        }
      ]
  
  async getUsers(): Promise<UserDTO[]> {
    return await new Promise((resolve) => {
      resolve(this.users)
    });
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    
    this.users.push({
      id: "string",
      ...createUserDTO
    });

    return await new Promise((resolve) => {
      resolve({
        id: "string",
        ...createUserDTO
      })
    })
  }

  async findUser(email: string): Promise<UserDTO | undefined> {
    
    const user: UserDTO | undefined = this.users.find((user: UserDTO) => user.email === email);
    return await new Promise((resolve) => {
      resolve(user)
    });

  }
}
