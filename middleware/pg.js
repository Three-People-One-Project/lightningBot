'use strict';

const pg = require('pg');
const pgclient = new pg.Client(process.env.DATABASE_URL);
pgclient.connect().then(()=> {
  console.log('connected to pg')
})
pgclient.on('error', err => console.error(err));

module.exports = pgclient;