# The Mutated States of Northcodia Group Project - Back End API

## Built by:

### - Sahar Batol (https://github.com/SaharBatol)

### - Philip Burgess (https://github.com/BigYoSpeck)

### - Oscar James (https://github.com/oscarJames24)

### - Khalid Stonehouse (https://github.com/KhalidStonehouse2001)

### - Leah (https://github.com/MarshmallowFlump)

## Description

TODO

## Setting up / Installation Requirements

### Prerequisites

- Node.js LTS 16.x [Node.js](https://nodejs.org/en/)
- PostgreSQL 12.9 [psql](https://www.postgresql.org/)

### Dependencies

- dotenv 14.x [dotenv](https://www.npmjs.com/package/dotenv)
- express 4.x [express](https://www.npmjs.com/package/express)
- pg 8.x [node-postgres](https://www.npmjs.com/package/pg)
- pg-format 1.x [pg-format](https://www.npmjs.com/package/pg-format)

### Dev Dependencies

- jest 27.x [jest](https://www.npmjs.com/package/jest)
- supertest 6.x [supertest](https://www.npmjs.com/package/supertest)
- nodemon 2.x [nodemon](https://www.npmjs.com/package/nodemon)

### Cloning

- In your terminal:

        $ git clone https://github.com/BigYoSpeck/bys-news.git
        $ cd bys-news

## Running the Application

- Initialising in Node

        $ npm install

<!-- - Installing dependencies

        $ npm install dotenv
        $ npm install express --save
        $ npm install pg
        $ npm install pg-format -->

- Installing dev dependencies

        $ npm i -D jest
        $ npm i -D supertest
        $ npm i -D nodemon

You will need to create _two_ `.env` files for the app: `.env.test` and `.env.development`. Into `.env.test` add `PGDATABASE=<database_name_here>` with your choice of database name for both the dev and test environment.

There is a provided `db` folder with some data, a [setup.sql](./db/setup.sql) file and a `seeds` folder.

- Setup database

        $ npm run setup-dbs && npm run seed

## Testing the application

To run the provided tests

        $ npm t

To run the dev environment

        $ npm run dev

This can then be accessed at [http://127.0.0.1:9090/api](http://127.0.0.1:9090/api)

I recommend the Google Chrome extension [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh) for inspecting the available endpoints.

## Available endpoints

```http
GET /api
```

---

#### **GET /api**

Responds with:

- JSON describing all the available endpoints on your API, see the [endpoints.json](./endpoints.json) for an (incomplete) example.

---

#### Copyright (c) 2022 The Mutated States of Northcodia
