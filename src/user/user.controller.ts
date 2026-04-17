import { CreateUserDTO } from "@/user/dto/createUser.dto";
import { UserService } from "@/user/user.service";
import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(new ValidationPipe())
  @Post('register')
  async createUser(@Body('user') createUserDTO: CreateUserDTO): Promise<any> {
    return await this.userService.createUser(createUserDTO);
  }
}