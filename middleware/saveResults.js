'use strict';

const pgclient = require('./pg.js');

function saveResults(challenger, opponent, winner, loser){
    let sql = `INSERT into duels(userOne_id, userTwo_id, winner, loser) values($1, $2, $3, $4);`;
    let values = [challenger, opponent, winner, loser];
  
    pgclient.query(sql, values)
    .then( results => {
      console.log('saveResults');
    })
  }

  module.exports = saveResults;