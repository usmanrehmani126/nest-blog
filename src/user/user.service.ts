import { CreateUserDTO } from '@/user/dto/createUser.dto';
import { IUserResponse } from '@/user/entity/interfaces/userResponse.interface';
import { UserEntity } from '@/user/entity/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';

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
      const newUser = await this.userRepository.save(user);
      return this.generateUserResponse(newUser);
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
