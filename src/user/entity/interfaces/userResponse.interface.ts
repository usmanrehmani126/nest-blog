import { IUser } from '../types/user.types';

export interface IUserResponse {
  user: IUser & { token: string };
}
