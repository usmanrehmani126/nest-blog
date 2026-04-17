import { CreateUserDTO } from '@/user/dto/createUser.dto';
import { UserEntity } from '@/user/entity/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDTO: CreateUserDTO) {
    try {
      const user = new UserEntity();
      Object.assign(user, createUserDTO);
      const newUser= await this.userRepository.save(user);
      return this.generateUserResponse(newUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  generateUserResponse(user: UserEntity) {
    return {
      user,
    };
  }
}
