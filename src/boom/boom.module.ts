import { Module } from '@nestjs/common';
import { BoomController } from './boom.controller';

@Module({
  controllers: [BoomController],
})
export class BoomModule {}
