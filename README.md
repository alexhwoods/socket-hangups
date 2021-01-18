# Nest HttpService Socket Hang Up Bug

This repo reproduces a difference between Axios and HttpService.

# Setup
1. Clone the repo
2. Install k6 (load testing framework). e.g. `brew install k6`
3. Run the Nest project
```bash
cd nest-project && npm install
npm run start
```

# Reproduction
Now, in another terminal do the following. Watch the console of the running Nest app.
```
cd test

# All requests to google.com will succeed
$ requests=10 && k6 run --vus $requests --iterations $requests script-axios.js

# (in the Nest app's console)
6:45:28 | (axios directly) received request 1
6:45:28 | (axios directly) received request 2
6:45:28 | (axios directly) received request 3
6:45:28 | (axios directly) received request 4
6:45:28 | (axios directly) received request 5
6:45:28 | (axios directly) received request 6
6:45:28 | (axios directly) received request 7
6:45:28 | (axios directly) received request 8
6:45:28 | (axios directly) received request 9
6:45:28 | (axios directly) received request 10
6:45:29 | finished
6:45:29 | finished
6:45:29 | finished
6:45:29 | finished
6:45:29 | finished
6:45:29 | finished
6:45:29 | finished
6:45:29 | finished
6:45:29 | finished
6:45:29 | finished



$ requests=10 && k6 run --vus $requests --iterations $requests script-http-service.js

# (in the Nest app's console)
6:43:38 | (http service) received request 1
6:43:38 | (http service) received request 2
6:43:38 | (http service) received request 3
6:43:38 | (http service) received request 4
6:43:38 | (http service) received request 5
6:43:38 | (http service) received request 6
6:43:38 | (http service) received request 7
6:43:38 | (http service) received request 8
6:43:38 | (http service) received request 9
6:43:38 | (http service) received request 10
6:43:38 | finished
6:43:38 | socket hang up
6:43:38 | finished
6:43:38 | socket hang up
6:43:39 | finished
6:43:39 | socket hang up
6:43:39 | finished
6:43:39 | socket hang up
6:43:39 | finished
6:43:39 | socket hang up
```

Don't hit run it with too many requests. Eventually Google will rate limit you 😅.
If that happens just use some other url. A "hello world" Nest.js app is also a good option; I played with that for a while. Just wanted to use Google to show that **this is a client problem**.

# `Axios` vs. `HttpService`
The endpoints hit are virtually identical, except one directly uses the underlying `axiosRef` provided by `HttpService`, and the 
other uses `HttpService` by itself.

i.e.
```typescript
// causes socket hang ups with connection pooling
await this.httpService
  .get(url)
  .toPromise()
  .then(...)
  .catch(...);
```
vs.
```typescript
// works fine with connection pooling
await this.httpService
  .axiosRef({
    url,
    method: 'GET',
  })
  .then(...)
  .catch(...);
```

Note that the `axiosRef` approach does still use connection pooling.

If you want to test this, write a "Hello world" server that takes 3 seconds to respond, and replace `google.com` with the url for that local server.
e.g.
```typescript
import { Injectable } from '@nestjs/common';
import * as util from 'util';

const sleep = util.promisify(setTimeout);

@Injectable()
export class AppService {
  constructor() {}

  async getHello() {
    await sleep(3 * 1000);
  }
}
```
Then run 2 requests.
You'll see that even though they arrive at the same time, they get in line to use the same socket (completing at the 3s and then the 6s mark).

## Using `num-connections.sh` to help debug
In the repo there is a Bash script that will show the number of TCP connections involving some port.
```bash
bash num-connections.sh 3000
```