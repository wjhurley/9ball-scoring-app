import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  public teamName: string;

  @IsInt()
  @IsNotEmpty()
  public teamNumber: number;
}
