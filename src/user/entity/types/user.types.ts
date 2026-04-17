import { UserEntity } from '@/user/entity/user.entity';

export type IUser = Omit<UserEntity, 'hashPassword'>;