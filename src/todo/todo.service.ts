import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TodoService {
  todoArray: Todo[] = [];

  getTodo() {
    return this.todoArray;
  }

  addTodo(title: string, subtitle: string) {
    const todo = {
      id: uuidv4(),
      title: title,
      subtitle: subtitle,
    };
    this.todoArray.push(todo);
    return todo;
  }

  deleteTodoById(id: string) {
    const foundId = this.todoArray.findIndex((element) => element.id === id);
    if (foundId) {
      throw new NotFoundException(`ID: ${id} not found`);
    }
    this.todoArray.splice(foundId, 1);
    return `delete id: ${id}`;
  }
}
