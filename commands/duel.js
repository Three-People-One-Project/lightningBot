'use strict';

const pgclient = require('../middleware/pg.js');
const generateQuestion = require('../middleware/generateQuestion.js');
let opponent = require('../middleware/opponent.js');
let opponentPoints = require('../middleware/opponentPoints.js');
let challenger = require('../middleware/challenger.js');
let challengerPoints = require('../middleware/challengerPoints.js');
let question = require('../middleware/question.js');
let startDuel = require('./startDuel.js');
const generateQuestionnaire = require('../middleware/generateQuestion.js');


function duel(message, MessageEmbed, dueling){
    dueling = startDuel(message, MessageEmbed, dueling);
   

    
      if(dueling.challenger === message.author.id && dueling.question !== null || dueling.opponent === message.author.id && dueling.question !== null){
    
       let sql = 'SELECT * FROM technical WHERE question=$1;';
       let values = [dueling.question];
        let current = null;
        if(dueling.challenger === message.author.id){
            current = dueling.challenger;
        }
        else if(dueling.opponent === message.author.id){
            current = dueling.opponent;
        }
       pgclient.query(sql, values)
       .then(answers => {

        let response = message.content.toLowerCase();

         if(response === 'a' && response === answers.rows[0].answer || response === 'b' && response === answers.rows[0].answer){
          //  client.removeListener('message', messageListener);
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
             dueling = generateQuestion(message, MessageEmbed, dueling);
              
            }
            
          } else if(answers.rows[0].answer === 'a' && response === 'b' || answers.rows[0].answer === 'b' && response === 'a'){
            message.channel.send(`<@${current}> answered wrong`)
            
          }
          if( dueling.count === 0 ) {
            dueling = generateQuestion(message, MessageEmbed, dueling);
            dueling.questionTracker = [];
              dueling.question = null;

              dueling.count = 10;
            
          }
          
        })
      }

      return dueling;
}

module.exports = duel;