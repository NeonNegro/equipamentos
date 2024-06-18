# Equipaments

## Used Technologies
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Description

In this Backend program it is possible to register users and equipment; in addition to
rent and return these to stock. New units of already registered equipment can also be added.

## Diagram
![Diagram](https://i.imgur.com/vlD7iuV.png)
## Prerequisites

Before starting, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Postgres](https://www.postgresql.org/)

## Installation

```bash
$ npm install
```

## .env Configuration

In order to use this, you need to create a `.env` file in the root of the program, with the keys `JWT_SECRET` and `DATABASE_URL`, like this:

```bash
DATABASE_URL="postgres://[ user ]:[ password ]@[ adress ]:[ port ]/[ database_name ]"
JWT_SECRET= [ your_jwt_secret_here ]
```

postgres://usuario:senha@localhost:5432/banco_de_dados

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
