import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { BoomModule } from './boom/boom.module';

@Module({
  imports: [TodoModule, BoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
