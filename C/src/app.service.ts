import { Injectable, HttpService } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigurationService } from './configuration/configuration.service';
import * as util from 'util';
import { AxiosError, AxiosRequestConfig } from 'axios';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configurationService: ConfigurationService,
  ) {}

  async getHello(): Promise<string> {
    await this.httpService
      .get('http://localhost:3302')
      // .get('https://google.com')
      .toPromise()
      // .then(value => {
      //   console.log(JSON.stringify(value.headers));
      // })
      .catch(err => {
        if (err.isAxiosError) {
          const error = err as AxiosError;

          // console.log(`httpsAgent: ${error.config.httpsAgent}`);
          console.log(`request: ${util.inspect(error.request)}`);
// 
          console.log(`reusedSocket: ${error.request.reusedSocket}`);
          console.log(`response: ${util.inspect(error.response)}`);;

          process.exit(1);
        }
      });

    return 'fpp';
  }

  // @Cron('* * * * * *')
  // handleCron() {
  //   const x = this.httpService.axiosRef.toString();
  //   const a = this.configurationService.httpAgent.getCurrentStatus(); // I think this is a different instance of configuration service, created by Nest DI
  //   const b = this.configurationService.httpsAgent.getCurrentStatus();

  //   console.log(`a: ${JSON.stringify(a)}`);
  //   console.log(`b: ${JSON.stringify(b)}`);
  //   console.log(`x: ${x}`);
  // }
}
