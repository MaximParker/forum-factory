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

### `GET /api/`
- Retrieves a JSON object of available endpoints in the API

### `GET /api/users/`
- Retrieves a list of users

### `GET /api/users/:username`
- Retrieves an individual user from the database
- `:username` must be valid and exist

### `GET /api/topics`
- Retrieves a list of topics

### `GET /api/articles`
- Retrieves a list of articles

### `GET /api/articles/:article_id`
- Retrieves an individual article, along with the number of comments associated with it

### `PATCH /api/articles/:article_id`
- Increments the article's `votes` property by the `inc_votes` property in the request body
- Example request body: 
```
{ inc_votes: -3 }
```
### `GET /api/articles/:article_id/comments`
- Retrieves a list of comments associated with the given `article_id`

### `POST /api/articles/:article_id/comments`
- Adds a comment to the database, associated with the given `article_id`
- Example request body:
```
{ username: "lurker", body: "10/10 would comment again" };
```
### `PATCH /api/comments/:comment_id`
- Increments the comment's `votes` property by the `inc_votes` property in the request body
- Example request body: 
```
{ inc_votes: 7 }
```

### `DELETE /api/comments/:comment_id`
- Deletes the specified comment from the database
---
Copyright (c) 2022