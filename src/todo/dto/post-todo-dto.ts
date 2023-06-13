import { IsNotEmpty } from 'class-validator';

export class postTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  subtitle: string;
}
