import { Injectable, HttpService } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigurationService } from './configuration/configuration.service';
import * as util from 'util';
import { AxiosError, AxiosRequestConfig } from 'axios';

let count = 0;

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configurationService: ConfigurationService,
  ) {}

  async getHello(): Promise<string> {
    count++;;
    console.log(
      `${this.formatDate(new Date())} | received request ${count}`,
    );

    await this.httpService
      .get('http://localhost:3302')
      // .get('https://google.com')
      .toPromise()
      .then(value => {
        console.log('finished')
      })
      .catch(err => {
        if (err.isAxiosError) {
          const error = err as AxiosError;
          console.log(error.message)
        }
      });

    return 'fpp';
  }

  formatDate(date) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
