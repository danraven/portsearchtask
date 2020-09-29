# My First Xeneta

We are providing a simplified real-world usage scenario of a core
Xeneta feature. In our system, users are given the option to search
for origin and destination ports by name, and see a visualisation of
the price development over a selected period of time. We provide a
small backend with three API endpoints that return port information,
do a simple string search, or return the time-series information about
the prices.

## Usage

### Create environment variables

The front-end relies on an environment variable to determine the backend URL called `API_URL`. The build supports reading it from a `.env` file placed in the root directory of the project. See `.env.example` to set it up.

### Installation and build

```sh
# Install dependencies
$ npm install

# Single build
$ npm run build

# Development server at localhost:3000
$ npm start

# Watcher build (Rebuilds on file changes) + Development server at localhost:3000
$ npm run watch
```

# Building
The project will build HTML using EJS templates from the `views` folder. Client-side JavaScript is built
from the `src/index.js` entrypoint with Webpack 4 and Babel 7. CSS is applied via styled components, but additional styling can be loaded as modules.

# API
Provided is a simple web server, with an API that allows looking up ports and querying for time-series of freight
rates between the respective ports. It is available from http://localhost:3000/

## /api/ports/:id
Returns a single port based on the provided port code. (NOOSL, CNSGH, NLRTM)

```json
{"id":"NOOSL","country":"NO","name":"Oslo"}
```

## /api/ports/search/:query
Free text search for port codes and port names. Returns an object with matching ports.

```json
{"results":[{"id":"CNSGH","country":"CN","name":"Shanghai"},{"id":"CNSTG","country":"CN","name":"Shantou"}]}
```

## /api/rates/:origin/:destination/:fromdate/:todate
Returns a timeseries of rates from port to port, within the given time-period. `origin` and `destination`
are port codes, the date formats are ISO-8601 dates, e.g. `2018-06-30`.
https://github.com/xeneta/portsearchtask
This returns an object containing a time-series of freight rates. The time-series is an array of arrays,
containing the date and the price for that given day.

```json
{"rates":[["2018-06-30",1972],["2018-07-01",2022],["2018-07-02",2022],["2018-07-03",2022]]}
```

Note that the dataset only contains data between `2017-08-30` and `2018-06-30`. If there is no rate available
on a specific date within the dataset, the price is set to `null`.

# Notes

* Admittedly this took longer than expected and overall I'm not that satisfied with the end product. A great portion of time was spent on finding the appropriate libraries that are extensible and doesn't force their own styling, but in hindsight it would've been far more optimal to use existing UI suites to speed up the task (and I ended up using external CSS for the datepicker anyway). The end result didn't end up looking great either, but hopefully at least it showcases my use of styled components.
* For network efficiency I considered using a state managment library or a caching layer on top of the requests, or modify the backend to provide an additional endpoint that provides all of the possible destinations, eliminating the need to hit the server for a list of port suggestions. I ended up just adding an adjustable delay and minimum length to the search input before querying the API. Cancel tokens could also be implemented to intercept ongoing but outdated search queries.
* A smart caching layer can also be applied to the search results, storing and merging intervals based on queries and only hit the server if there's a "gap" in the date range, as in a date that hasn't been queried for the two ports. This might also ease the server load with the tradeoff being a more complex and loaded client side.
* More verbose validation errors and more strict rules (e.g. picking the same port as start and end)
