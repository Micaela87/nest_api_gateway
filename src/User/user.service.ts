import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/db/UserDTOs/CreateUserDTO';
import { UserDTO } from 'src/db/UserDTOs/UserDTO';

@Injectable()
export class UserService {
  
  async getUsers(): Promise<UserDTO[]> {
    return await new Promise((resolve) => {
      resolve([
        {
          id: "string",
          firstName: "string",
          lastName: "string",
          email: "string",
          password: "string",
          dateOfBirth: new Date()
        },
        {
          id: "string",
          firstName: "string",
          lastName: "string",
          email: "string",
          password: "string",
          dateOfBirth: new Date()
        }
      ])
    });
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return await new Promise((resolve) => {
      resolve({
        id: "string",
        ...createUserDTO
      })
    })
  }
}
