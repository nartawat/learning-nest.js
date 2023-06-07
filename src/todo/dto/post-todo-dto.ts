import { IsNotEmpty } from 'class-validator';

export class postTodoDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  subtitle: string;
}
