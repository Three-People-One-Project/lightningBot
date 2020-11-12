'use strict';

const superagent = require('superagent');
require('dotenv').config();
const pgclient = require('../middleware/pg.js');

function codeChallenge(message, MessageEmbed){
    let content = message.content.split(' ');
    if(content[0]==='!cc' || message.content === '!cc') {

      let sql = 'SELECT * FROM challenges;';
      let values = [];
      if(content[1] === 'javascript' || content[1] === 'c#' || content[1] === 'python' || content[1] === 'java' || content[1] === 'ruby' || content[1] === 'php' ) {
        values.push(content[1]);
        sql = 'SELECT * FROM challenges WHERE lang=$1';
      }
      if(content[1] === 'beginner' || content[1] === 'novice' || content[1] === 'expert') {
        values.push(content[1]);
        sql = 'SELECT * FROM challenges WHERE difficulty=$1';
      }
      if(content[1] === 'trees' || content[1] === 'linkedlist' || content[1] === 'hashset'){
        values.push(content[1]);
        sql = 'SELECT * FROM challenges WHERE dsa=$1';
      }
      
      // third item
      if(content[2] === 'javascript' || content[2] === 'c#' || content[2] === 'python' || content[2] === 'java' || content[2] === 'ruby' || content[2] === 'php' ) {
        values.push(content[2]);
        sql += ' AND lang=$2';
      }
      if(content[2] === 'beginner' || content[2] === 'novice' || content[2] === 'expert') {
        values.push(content[2]);
        sql += ' AND difficulty=$2';
      }
      if(content[2] === 'trees' || content[2] === 'linkedlist' || content[2] === 'hashset'){
        values.push(content[2]);
        sql += ' AND dsa=$2';
      }
      
      

      if(content[3] === 'javascript' || content[3] === 'c#' || content[3] === 'python' || content[3] === 'java' || content[2] === 'ruby' || content[2] === 'php' ) {
        values.push(content[3]);
        sql += ' AND lang=$3';
      }
      if(content[3] === 'beginner' || content[3] === 'novice' || content[3] === 'expert') {
        values.push(content[3]);
        sql += ' AND difficulty=$3';
      }
      if(content[3] === 'trees' || content[3] === 'linkedlist' || content[3] === 'hashset'){
        values.push(content[3]);
        sql += ' AND dsa=$3';
      }

      sql += ';'
      console.log(`values: ${values} sql: ${sql}`);
        let usersql = 'INSERT into users(discordID) values($1);';
        let uservalue = [message.author.id];
        pgclient.query(usersql,uservalue).then(()=>console.log('user profile added')).catch(err=>console.log(err));
        pgclient.query(sql,values)
          .then(query => {
            let min = 0;
            let max = query.rows.length;
            let num = Math.floor(Math.random()*(max-min))
            let headers = {Authorization: process.env.CODEWARS,
            ContentType: "application/json"}
            superagent.get(`https://www.codewars.com/api/v1/code-challenges/${query.rows[num].challenge_id}`).set(headers)
            .then( results => {
              let update = 'UPDATE challenges set challenge_name=$1 WHERE challenge_id=$2;';
              let final = results.body.name.replace(/\s+/g,'').toLowerCase();
              let values = [final,results.body.id];
              pgclient.query(update,values).then(()=>{
                console.log('success')
              }).catch(err => console.log(err))
              let description = results.body.description.substr(0,500)
              const embed = new MessageEmbed()
              .setTitle(`${results.body.name} (click to view full challenge)`)
              .setURL(results.body.url)
              .setColor('#0099ff')
              .setDescription(description)
              .setFooter('Full challenge available through Code Wars');
              message.channel.send(embed);
          }).catch(err => console.log(err))
          }).catch(err => {
            message.channel.send('no such challenge exist');
            console.log(err);
          })
        
    
      }
}

module.exports = codeChallenge;