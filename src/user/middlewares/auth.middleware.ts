import { AuthRequest } from '@/types/expressRequest.interface';
import { UserEntity } from '@/user/entity/user.entity';
import { UserService } from '@/user/user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = new UserEntity();
       next();
      return;
    }
    const token = req.headers.authorization?.split(' ')[1];
    try {
      const decode = verify(token, process.env.JWT_SECRET as string) as {
        id: number;
      };
      const user = await this.userService.findById(decode.id);
      req.user = user;
      next();
    } catch (error) {
      req.user = new UserEntity();
      next();
    }
  }
}
