import { Controller, Get } from '@nestjs/common';

@Controller('boom')
export class BoomController {
  @Get()
  getBoom() {
    return [1, 10, 20];
  }
}
