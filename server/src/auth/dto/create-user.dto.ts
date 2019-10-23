import { IsNotEmpty, IsString, Length } from 'class-validator';

import { AuthCredentialsDto } from './auth-credentials.dto';

export class CreateUserDto extends AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 25)
  public firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  public lastName: string;
}
