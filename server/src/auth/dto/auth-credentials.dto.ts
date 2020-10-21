import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  public email: string;

  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @MinLength(8)
  public password: string;
}
