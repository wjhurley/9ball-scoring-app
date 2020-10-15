import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  public name: string;

  @IsInt()
  @IsNotEmpty()
  public year: number;
}
