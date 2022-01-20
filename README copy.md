# ForumFactory API

## Introduction

**ForumFactory** is a [node-postgres](https://node-postgres.com/) back-end API for a messageboard-style forum. It draws from its database of users, topics, articles, and comments.

> A live version can be accessed here: https://forum-factory.herokuapp.com/api

Written by [Maxim Parker](github.com/MaximParker). Latest version 1.0.0 (20 Jan 2022).

---
## Set-up guide
### 1. Install dependencies
```
$ npm i
$ npm i -D jest
$ npm i -D supertest
$ npm i -D nodemon
```
At a minimum, [Node.js 17.0.1](https://nodejs.org/en/download/) and [Postgres 8.7.1](https://www.postgresql.org/download/) are required. Postgres will be installed with the command above.

### 2. Set environment variables
Create two `.env` files, `.env.development` and `.env.test`, which should read respectively:
```
PGDATABASE=forum_factory
```
```
PGDATABASE=forum_factory_test
```
> Note: Ubuntu users may get password authentication errors. In this case, [set your local PSQL password](https://www.eukhost.com/blog/webhosting/postgres-gives-an-error-of-password-authentication-failed-for-user/) and add `PGPASSWORD=your_password_here` into both `.env` files. Don't use your computer password!

### 3. Set-up and seed the databases
```
$ npm run setup-dbs && npm run seed
```
The databases can now be accessed via `psql`.

---
## Testing
To run the provided test suite:
```
$ npm t
```
To run the dev environment:
```
$ npm run dev
```

---
## Available endpoints

```http
GET /api/topics
GET /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles
GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments
DELETE /api/comments/:comment_id
GET /api
```

Copyright (c) 2022