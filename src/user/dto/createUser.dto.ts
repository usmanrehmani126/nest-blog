import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'username should not be empty' })
  readonly username: string;

  @IsEmail({}, { message: 'email is not valid' })
  @IsNotEmpty({ message: 'email should not be empty' })
  readonly email: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  readonly password: string;
}
