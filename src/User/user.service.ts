import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/db/Schemas/user.schema';
import { CreateUserDTO } from 'src/db/DTOs/UserDTOs/CreateUserDTO';
import { UserDTO } from 'src/db/DTOs/UserDTOs/UserDTO';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  async getUsers(): Promise<UserDTO[]> {
    return await this.userModel.find();
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    
    try {

      return await this.userModel.create(createUserDTO);

    } catch (error) {
      throw new Error(error.message);
    }
    
  }

  async findUser(email: string): Promise<UserDTO> {
    
    try {

      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new NotFoundException();
      }

      return user;

    } catch (error) {
      throw new Error(error.message);
    }

  }
}
