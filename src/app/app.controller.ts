import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  Ok(): string {
    return 'OK';
  }
}
