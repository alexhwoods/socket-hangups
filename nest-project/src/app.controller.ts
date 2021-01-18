import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }

  @Get('/axios')
  async getHelloWithAxios() {
    return this.appService.getHelloWithAxios();
  }

  @Get('/observable')
  getHelloWithObservable() {
    return this.appService.getHelloWithObservable();
  }
}
