import { Injectable, HttpService } from '@nestjs/common';
import * as util from 'util';

const sleep = util.promisify(setTimeout);

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getHello(): Promise<string> {
    await sleep(5 * 1000);

    return 'foo';
  }
}
