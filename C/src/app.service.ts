import { Injectable, HttpService } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigurationService } from './configuration/configuration.service';
import * as util from 'util';
import { AxiosError, AxiosRequestConfig } from 'axios';
import * as Agent from 'agentkeepalive';

let count = 0;
const agent = new Agent({
  maxSockets: 1,
  maxFreeSockets: 1,
});

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configurationService: ConfigurationService,
  ) {}

  async getHello(): Promise<string> {
    count++;
    console.log(
      `${this.formatDate(
        new Date(),
      )} | (nest's http service) received request ${count}`,
    );

    await this.httpService
      .get('http://localhost:3302')
      .toPromise()
      .then(value => {
        console.log(`${this.formatDate(new Date())} | finished`);
      })
      .catch(err => {
        if (err.isAxiosError) {
          const error = err as AxiosError;
          console.log(`${this.formatDate(new Date())} | ${error.message}`);
        }
      });

    return 'fpp';
  }

  async getHelloWithAxios(): Promise<string> {
    count++;
    console.log(`${this.formatDate(new Date())} | (axios directly) received request ${count}`);

    await this.httpService
      .axiosRef({
        url: 'http://localhost:3302',
        method: 'GET',
        httpAgent: agent
      })
      .then(value => {
        console.log(`${this.formatDate(new Date())} | finished`);
      })
      .catch(err => {
        if (err.isAxiosError) {
          const error = err as AxiosError;
          console.log(
            `${this.formatDate(new Date())} | ${error.message}`,
          );
        }
      });

    return 'fpp';
  }

  formatDate(date) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
