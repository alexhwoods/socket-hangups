import { Injectable, HttpService } from '@nestjs/common';
import { AxiosError } from 'axios';

let count = 0;
const google = 'https://google.com'
const url = google

function formatDate(date) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  /*
   * This function uses Nest's HttpService
   * directly to make an HTTP call
   */
  async getHello() {
    this.logIncomingRequest('(http service)');

    await this.httpService
      .get(google)
      .toPromise()
      .then(value => {
        this.logFinished();
      })
      .catch(this.logError);
  }

  /*
   * This function uses HttpService's
   * underlying `axiosRef`
   */
  async getHelloWithAxios() {
    this.logIncomingRequest('(axios directly)');

    await this.httpService
      .axiosRef({
        url,
        method: 'GET',
      })
      .then(value => {
        this.logFinished();
      })
      .catch(this.logError);
  }

  logIncomingRequest(prefix) {
    count++;
    console.log(
      `${formatDate(new Date())} | ${prefix} received request ${count}`,
    );
  }

  logFinished() {
    console.log(`${formatDate(new Date())} | finished`);
  }

  logError(err) {
    if (err.isAxiosError) {
      const error = err as AxiosError;
      console.log(`${formatDate(new Date())} | ${error.message}`);
    }
  }
}
