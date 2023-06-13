import { Injectable, NotFoundException } from '@nestjs/common';
import _ from 'lodash';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ReturnDocument } from 'typeorm';
import { postTodoDto } from './dto/post-todo-dto';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepo: Repository<TodoEntity>,
  ) {}
  async getTodo(keyword: string) {
    if (keyword) {
      const query = this.todoRepo.createQueryBuilder('todo');
      query.andWhere('todo.TITLE LIKE :keyword', { keyword: `%${keyword}%` });
      return query.getMany();
    } else {
      const data = await this.todoRepo.find({
        order: {
          id: 'ASC', // น้อยไปมาก
          // id: 'DESC', มากไปน้อย
        },
      });
      return data;
    }
  }
  async getTodoById(id: number) {
    const result = await this.todoRepo.findOneBy({ id: id });
    // console.log(result);
    if (_.isEmpty(result)) {
      throw new NotFoundException(`ID: ${id} not found`);
    }
    return result;
  }
  async addTodo(title: string, subtitle: string) {
    const todo = new TodoEntity();
    todo.title = title;
    todo.subtitle = subtitle;
    await todo.save();
    return 'save success';
  }
  async deleteTodoById(id: number) {
    const result = await this.todoRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID: ${id} not found`);
    }
    return `delete id: ${id}`;
  }
  async updateTodoById(id: number, body: postTodoDto) {
    const result = await this.todoRepo.findOneBy({ id: id });
    if (_.isEmpty(result)) {
      throw new NotFoundException(`ID: ${id} not found`);
    }
    const { title, subtitle } = body;
    result.title = title;
    result.subtitle = subtitle;
    await result.save();
    return `update ID: ${id} success`;
  }
}
