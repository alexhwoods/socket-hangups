import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getHello(): Promise<string> {
    const { data } = await this.httpService
      .get('http://localhost:3302/')
      .toPromise();

    return data + '\n(this written from C)';
  }
}