import { CreateUserDTO } from "@/user/dto/createUser.dto";
import { LoginUserDTO } from '@/user/dto/loginUser.dto';
import { IUserResponse } from '@/user/entity/interfaces/userResponse.interface';
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
  async createUser(
    @Body('user') createUserDTO: CreateUserDTO,
  ): Promise<IUserResponse> {
    return await this.userService.createUser(createUserDTO);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginDTO: LoginUserDTO,
  ): Promise<IUserResponse> {
    const user = await this.userService.loginUser(loginDTO);
    return this.userService.generateUserResponse(user);
  }
}