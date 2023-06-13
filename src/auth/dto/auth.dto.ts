import { IsString, MaxLength, MinLength, Matches } from 'class-validator';

export class AuthDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4, { message: 'password > 3' })
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, {
    message: 'password too week',
  })
  password: string;
}
