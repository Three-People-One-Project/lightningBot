'use strict';

const pgclient = require('../middleware/pg.js');

function stats(message, MessageEmbed){
    let content = message.content.split(' ');

  

    if(content[0] === '!stats' && content[1] === '!duel'){
      let wins = 0;
      let losses = 0;
     let opponent = content[2].split('<')[1].split('@')[1].split('>')[0].split('!')[1];
     let sql = 'SELECT * FROM duels WHERE winner=$1;';
     let values = [message.author.id];
 
     pgclient.query(sql, values)
     .then( results => {
 
       for(let i = 0; i < results.rows.length; i++){
         if(results.rows[i].loser === opponent){
           wins++;
         }
 
       }
 
       let sqlLoses = 'SELECT * FROM duels WHERE loser=$1;';
       
       pgclient.query(sqlLoses, values)
       .then( results => {
 
         for(let i = 0; i < results.rows.length; i++){
           if(results.rows[i].winner === opponent){
             losses++;
           }
   
         }
 
         const embed = new MessageEmbed()
         .setTitle(`Stats for ${message.author.username} and ${message.mentions.users.first().username}`)
         .setDescription(`${message.author.username} : Wins: ${wins} Losses: ${losses}
         <@${opponent}> : Wins: ${losses} Losses: ${wins}
         `)
         message.channel.send(embed)
 
       })
       .catch(err => {
         console.log(err);
       })
     })
     .catch(error => {
       console.log(error);
     })
 
    }
}

module.exports = stats;