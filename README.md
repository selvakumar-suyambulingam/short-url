<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Short URL Service

The Short URL Service is a lightweight, high-performance solution for creating and managing short URLs, designed to handle high volumes of traffic and provide fast redirections. This project is built with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications.

## Features

- **URL Shortening**: Convert long URLs into manageable short links that are easier to share.
- **Redirection**: Quick and efficient redirection from short URLs to the original URLs.
- **Custom Alias**: Allows the creation of short URLs with custom aliases.
- **Data Integrity**: Required indexes and unique contraints enforced.
- **Rate Limiting**: URL requests are rate limited
- **Analytics**: Tracks access statistics for each short URL, including total hits and hits by User-Agent.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later recommended)
- A running instance of mysql
- Optionally, Docker for containerization

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/selvakumar-suyambulingam/short-url.git
cd short-url
```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with Docker

```bash
# update DB host
Use DATABASE_HOST_DOCKER in app.module.ts to make the local database accessible from docker

# build
docker build -t short-url-app .

# run
docker run -p 3000:3000 short-url-app
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

After starting the application, you can access the Swagger API documentation at http://localhost:3000/api.

## API Example Requests and Responses

The file named api-examples.json in the root directory contains sample requests and responses for the API, serving as a quick reference to understand the API's functionality and structure.

## Further Enhancements
- Code
  - Extensive test cases
  - JSON logging
  - Efficient URL shortening algorithm to avoid collisions
  - Custom logging
  - Custom Exception handlers
  - Attaching q uuid to every request to uniquly identify the request
- Monitoring and Alert
  - Send stats to prometheus and visualize in grafana and setup alerts
- Advanced Rate Limiting
  - Rate limiting based on ip
- Database perfromance
  - Use a high performance database
  - DB replicas
  - Caching using Redis or Memcache
- Handling High Traffic
  - Load balancing requests across instances
  - Auto scaling
