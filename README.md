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
## Using `num-connections.sh` to help debug
In the repo there is a Bash script that will show the number of TCP connections involving some port.
```bash
bash num-connections.sh 3000
```