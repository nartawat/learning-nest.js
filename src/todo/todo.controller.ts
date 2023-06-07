import { TodoService } from './todo.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  constructor(private TodoService: TodoService) {}

  @Get()
  getTodo() {
    return {
      statusCode: 200,
      message: 'successful',
      data: this.TodoService.getTodo(),
    };
  }
  @Post()
  postTodo(@Body() body: any) {
    const title = body.title;
    const subtitle = body.subtitle;
    return this.TodoService.addTodo(title, subtitle);
  }
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.TodoService.deleteTodoById(id);
  }
}
