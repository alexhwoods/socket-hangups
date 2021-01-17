import { Injectable, HttpService } from '@nestjs/common';
import { AxiosError } from 'axios';

let count = 0;
const url = 'https://google.com'

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  /*
   * This function uses Nest's HttpService
   * directly to make an HTTP call
   */
  async getHello() {
    count++;
    console.log(
      `${this.formatDate(
        new Date(),
      )} | (nest's http service) received request ${count}`,
    );

    await this.httpService
      .get(url)
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
  }

  /*
   * This function uses HttpService's
   * underlying `axiosRef`
   */
  async getHelloWithAxios() {
    count++;
    console.log(
      `${this.formatDate(
        new Date(),
      )} | (axios directly) received request ${count}`,
    );

    await this.httpService
      .axiosRef({
        url,
        method: 'GET',
      })
      .then(value => {
        console.log(`${this.formatDate(new Date())} | finished`);
      })
      .catch(err => {
        if (err.isAxiosError) {
          const error = err as AxiosError;
          console.log(`${this.formatDate(new Date())} | ${error.message}`);
        }
      });
  }

  formatDate(date) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
