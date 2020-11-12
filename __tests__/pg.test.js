'use strict';

const pg = require('pg');
require('dotenv').config();
const pgclient = new pg.Client(process.env.DATABASE_URL);
let id = 1;
beforeAll(() => {
    pgclient.connect().then(()=> {
      console.log('connected to pg')
    })
    pgclient.on('error', err => console.error(err));

})

afterAll(() => {
    pgclient.end();
});

describe('Testing Challenges Table',() => {
    it('Can get from challenges', async () => {
        let results = await pgclient.query('SELECT * FROM challenges WHERE id=$1',[1])
        expect(results.rows[0].challenge_id).toEqual('582c297e56373f0426000098');
        expect(results.rows[0].difficulty).toEqual('novice');
        expect(results.rows[0].dsa).toEqual('linkedlist');
        expect(results.rows[0].lang).toEqual('javascript');
    })
})

describe('Testing Technical Table',() => {
    it('Can get from challenges', async () => {
        let results = await pgclient.query('SELECT * FROM technical WHERE id=$1',[1])
        expect(results.rows[0].question).toEqual('Is JavaScript a case-sensitive language? a) Yes b) No');
        expect(results.rows[0].answer).toEqual('a');
    })
})

describe('Testing Knowledge Table',() => {
    it('Can get from challenges', async () => {
        let results = await pgclient.query('SELECT * FROM knowledge WHERE id=$1',[1])
        expect(results.rows[0].keyword).toEqual('binary tree');
    })
})

describe('Testing Duels Table',() => {
    it('Can get from challenges', async () => {
        let insert = await pgclient.query(`INSERT into duels(userOne_id, userTwo_id, winner, loser) values($1, $2, $3, $4) returning id;`,[12345,6789,12345,6789]);
        expect(insert.rows[0].id).toEqual(id);
    })
})

describe('Testing Users Table',() => {
    it('Can insert into users', async () => {
        let insert = await pgclient.query(`INSERT into users(discordID) values($1) returning id;`,['1']);
        expect(insert.rows[0].id).toEqual(id);
    })
})


describe('Testing Completed Challenges Table',() => {
    it('Can get from challenges', async () => {
        let insert = await pgclient.query(`INSERT into completedChallenges(user_id, challenge_id) values($1, $2) returning id;`,[1,1]);
        expect(insert.rows[0].id).toEqual(id);
        id++;
    })
})

