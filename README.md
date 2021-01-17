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
requests=10 && k6 run --vus $requests --iterations $requests script-axios.js

# You'll see a bunch of "socket hang up" errors
requests=10 && k6 run --vus $requests --iterations $requests script-http-service.js
```

In particular, it happens as soon as a socket goes to be reused for the first time. You'll notice that if you run the above tests with `requests=n-1`, where `n` is the size of the connection pool, you won't have an issue.

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