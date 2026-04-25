import type { AuthRequest } from '@/types/expressRequest.interface';
import { CreateUserDTO } from '@/user/dto/createUser.dto';
import { LoginUserDTO } from '@/user/dto/loginUser.dto';
import { IUserResponse } from '@/user/entity/interfaces/userResponse.interface';
import { UserEntity } from '@/user/entity/user.entity';
import { UserService } from '@/user/user.service';
import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Get,
  Req,
} from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user/register')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDTO: CreateUserDTO,
  ): Promise<IUserResponse> {
    return await this.userService.createUser(createUserDTO);
  }

  @Post('user/login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginDTO: LoginUserDTO,
  ): Promise<IUserResponse> {
    const user = await this.userService.loginUser(loginDTO);
    return this.userService.generateUserResponse(user);
  }

  @Get('user')
  async getCurrentUser(@Req() request: AuthRequest): Promise<IUserResponse> {
    return this.userService.generateUserResponse(request.user);
  }
}
