import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/db/userDTOs/UserDTO';

@Controller("users")
export class UserController {
  
  constructor(private readonly userService: UserService) { }

  @Get()
  async getUsers(@Res() response): Promise<UserDTO[] | Error> {

    try {

      const data: UserDTO[] = await this.userService.getUsers();
      return response.status(200).json({ data }) as UserDTO[];

    } catch (error) {
      return response.status(500).json({ message: error.message }) as Error;
    }
    
  }

  @Post()
  async createUser(@Res() response, @Body() createUserDTO): Promise<UserDTO | Error> {
    
    try {
      
      const data: UserDTO = await this.userService.createUser(createUserDTO);
      return response.status(200).json({ data }) as UserDTO;

    } catch (error) {
      return response.status(500).json({ message: error.message }) as Error;
    }
  }
}
