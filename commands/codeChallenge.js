'use strict';

const superagent = require('superagent');
require('dotenv').config();
const pgclient = require('../middleware/pg.js');

function codeChallenge(message, MessageEmbed){
    
    if(message.content==='!cc') {
        console.log(typeof message.author.id);
        let usersql = 'INSERT into users(discordID) values($1);';
        let uservalue = [message.author.id];
        pgclient.query(usersql,uservalue).then(()=>console.log('user profile added')).catch(err=>console.log(err));
        let sql = 'SELECT * FROM challenges;';
        pgclient.query(sql)
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
            console.log(err)
          })
      }
}

module.exports = codeChallenge;