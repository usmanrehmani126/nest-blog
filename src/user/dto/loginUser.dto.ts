import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @IsEmail({}, { message: 'email is not valid' })
  @IsNotEmpty({ message: 'email should not be empty' })
  readonly email: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  readonly password: string;
}