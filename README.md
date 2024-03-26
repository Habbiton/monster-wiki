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

## Description

Tech test of a monster wiki, made with Typescript, NodeJS, [Nest](https://github.com/nestjs/nest) and love!

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Deployment details
This project has CI/CD on https://monster-wiki.onrender.com (main branch), and you can check swagger on https://monster-wiki.onrender.com/api.

More details about the project:
- The first request made to the server may take several minutes (usually, 2-3min) to respond. This is due to the use of Render.com as the deployment platform in the free mode. Subsequent requests will be resolved in milliseconds. Hint: a coffee makes the wait more enjoyable.
- The following improvements have been made:
  - Implement a voting system.
    - The voting section has been implemented in such a way that each user can vote for any monster at any time. Their vote is recorded and cannot be modified or voted again. At any time, Bored Mike can list the votes, view a count, or delete the votes, allowing the rest of the team to vote again. This system could be limited to certain dates or allow multiple votes over time, but it has been understood that this is beyond what was requested in the test.
  - Add pagination to the list of monsters.
  - Create an authentication (and authorization) system.
    - The duration of the JWT token is 30 minutes, so that its implementation can be verified, but at the same time, it is not inconvenient when testing the application.
  - The application's performance has been taken into account, although there are no particularly complex processing methods.

- The following design decisions / assumptions have been made:
  - The application comes preloaded with 7 users by default (1 CEO, 1 admin, and 5 regular users) and 10 monsters.
  - The CEO is Carlos Roldan. He has his own role (CEO) and is not an administrator, so he has the same privileges as other users, except for being the only one with the ability to grant gold to monsters. 
  - The secretNotes and password fields of monsters have been hidden from listing methods for all roles other than ADMIN, as they appear to be particularly sensitive. 
  - User passwords are encrypted with the app's secret key, so access data will be provided privately. 
  - Although it is indicated that users comment on Bored Mike's latest discoveries on Fridays, there is no limitation on the date when users can list monsters, nor has any date filter been implemented to view the latest added monsters. However, monsters are returned in descending order in the list, so the newest ones are always displayed first.
- No tests have been added to the application as it is understood that their implementation exceeds the scope of this test.
- The app.module.ts includes code to seed the database, controlled through a parameter in the .env file. This code is simply a tool to streamline the development process. It is not elegantly crafted and should not be considered when analyzing this code, but since it was already done, I preferred to keep it public.


## Stay in touch

- Author - [Alex Corregidor Martín](https://www.linkedin.com/in/alejandro-corregidor-martin-a17b61142/)

