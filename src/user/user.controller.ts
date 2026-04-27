import { CustomUserDecorator } from '@/user/decorators/user.decorators';
import { CreateUserDTO } from '@/user/dto/createUser.dto';
import { LoginUserDTO } from '@/user/dto/loginUser.dto';
import { IUserResponse } from '@/user/entity/interfaces/userResponse.interface';
import { UserEntity } from '@/user/entity/user.entity';
import { AuthGuard } from '@/user/guards/auth.guards';
import { UserService } from '@/user/user.service';
import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Get,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';

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
  @UseGuards(AuthGuard)
  async getCurrentUser(
    @CustomUserDecorator() user: UserEntity,
  ): Promise<IUserResponse> {
    return this.userService.generateUserResponse(user);
  }

  @Put('user/update')
  @UseGuards(AuthGuard)
  async updateUser(
    @CustomUserDecorator('id') userId: number,
    @Body('user') updateUserDTO: UpdateUserDto,
  ): Promise<IUserResponse> {
    const updatedUser = await this.userService.updateUser(
      userId,
      updateUserDTO,
    );
    return this.userService.generateUserResponse(updatedUser);
  }
}
