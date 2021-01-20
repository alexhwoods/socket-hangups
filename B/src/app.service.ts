import { Injectable } from '@nestjs/common';
import * as util from 'util';

const sleep = util.promisify(setTimeout);

@Injectable()
export class AppService {
  constructor() {}

  async getHello(): Promise<string> {
    return 'b';
  }
}
