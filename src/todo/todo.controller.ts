import { query } from 'express';
import { postTodoDto } from './dto/post-todo-dto';
import { TodoService } from './todo.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChangeStringPipe } from 'src/pipes/change-string.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private TodoService: TodoService) {}

  @Get()
  getTodo(@Query('keyword') keyword: string) {
    return this.TodoService.getTodo(keyword);
  }
  @Get('/:id')
  getTodoById(@Param('id') id: number) {
    return this.TodoService.getTodoById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  // =========== เรียกใช้ custom pipes แถมถูกเรียกก่อน ตัว default ด้านบนด้่วย ===========
  @UsePipes(new ChangeStringPipe())
  postTodo(@Body() body: postTodoDto) {
    const { title, subtitle } = body;
    return this.TodoService.addTodo(title, subtitle);
  }
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.TodoService.deleteTodoById(id);
  }
  @Put(':id')
  updateById(@Param('id') id: number, @Body() body: postTodoDto) {
    // return title;
    return this.TodoService.updateTodoById(id, body);
  }
}
