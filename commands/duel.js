'use strict';

const pgclient = require('../middleware/pg.js');
const generateQuestionnaire = require('../middleware/generateQuestion.js');
let opponent = require('../middleware/opponent.js');
let opponentPoints = require('../middleware/opponentPoints.js');
let challenger = require('../middleware/challenger.js');
let challengerPoints = require('../middleware/challengerPoints.js');
let question = require('../middleware/question.js');
// let startDuel = require('./startDuel.js');


function duel(message, MessageEmbed, dueling){
    // startDuel(message, MessageEmbed);
   console.log(`message author: ${message.author.id}`)
   console.log(`challenger: ${dueling.challenger}`)
   console.log(`opponent: ${dueling.opponent}`)
   console.log(`question: ${dueling.question}`)

    
      if(dueling.challenger === message.author.id && dueling.question !== null || dueling.opponent === message.author.id && dueling.question !== null){
    
       let sql = 'SELECT * FROM technical WHERE question=$1;';
       let values = [question];
        let current = null;
        if(dueling.challenger === message.author.id){
            current = dueling.challenger;
        }
        else if(dueling.opponent === message.author.id){
            current = dueling.opponent;
        }
       pgclient.query(sql, values)
       .then(answers => {
         if(message.content === 'a' && message.content === answers.rows[0].answer || message.content === 'b' && message.content === answers.rows[0].answer){
           client.removeListener('message', messageListener);
          //  message.channel.send('listener off');
          if(message.author.id === dueling.challenger){
            dueling.challengerPoints++;
              message.channel.send(`<@${dueling.challenger}> answered correctly`);
          }
          else if(message.author.id === dueling.opponent){
            dueling.opponentPoints++
            message.channel.send(`<@${dueling.opponent}> answered correctly`);
          }
    
           if(dueling.count > 0){
             generateQuestionnaire(message, MessageEmbed).then(() => {
               client.on('message', messageListener);
              //  message.channel.send('listener on');
             });
              
            }
            if( dueling.count === 0 ) {
                dueling.question = null;
              
            }
          } else{
            message.channel.send(`<@${dueling.current}> answered wrong`)
          }
          
        })
      }
}

module.exports = duel;