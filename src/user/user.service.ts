import { CreateUserDTO } from '@/user/dto/createUser.dto';
import { LoginUserDTO } from '@/user/dto/loginUser.dto';
import { IUserResponse } from '@/user/entity/interfaces/userResponse.interface';
import { UserEntity } from '@/user/entity/user.entity';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<IUserResponse> {
    try {
      const user = new UserEntity();
      Object.assign(user, createUserDTO);

      const userByEmail = await this.userRepository.findOne({
        where: { email: createUserDTO.email },
      });
      const userByUserName = await this.userRepository.findOne({
        where: { username: createUserDTO.username },
      });

      if (userByEmail || userByUserName) {
        throw new BadRequestException(
          'User with this email or username already exists',
        );
      }

      const newUser = await this.userRepository.save(user);
      return this.generateUserResponse(newUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async loginUser(loginDTO: LoginUserDTO): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginDTO.email },
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const isMatch = await bcrypt.compare(
        loginDTO.password,
        user.password as string,
      );
      if (!isMatch) {
        throw new BadRequestException('Invalid password');
      }
      delete user.password;
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  generateToken(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      },
    );
  }

  generateUserResponse(user: UserEntity): IUserResponse {
    return {
      user: { ...user, token: this.generateToken(user) },
    };
  }
}
