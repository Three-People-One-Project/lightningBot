'use strict';

const pgclient = require('./pg.js');
const saveResults = require('./saveResults.js');

function generateQuestionnaire(message, MessageEmbed, dueling){
   
  
    if(dueling.count > 0) {
  
    
    let sql = 'SELECT * from technical;';
    
        pgclient.query(sql)
        .then(results => {
          let max = results.rows.length;
          let num = Math.floor(Math.random()*max);
          if(dueling.questionTracker.length === 0){
            dueling.questionTracker.push(results.rows[num].id);
          } 
          else if(dueling.questionTracker.length > 0 && dueling.questionTracker.length <= 10){
            while(dueling.questionTracker.includes(results.rows[num].id)){
              num = Math.floor(Math.random()*max);
            }
            dueling.questionTracker.push(results.rows[num].id);
          }
          
              let somethingElse = results.rows[num].question.split('?');
              dueling.question = results.rows[num].question;
              const embed = new MessageEmbed()
              .setTitle(somethingElse[0])
              .setColor('#0099ff')
              .setDescription(somethingElse[1])
              message.channel.send(embed);
              dueling.count--;
                           
        })
  }

  else if(dueling.count === 0){
    setTimeout( () => {
      if(dueling.challengerPoints > dueling.opponentPoints){
        saveResults(dueling.challenger, dueling.opponent, dueling.challenger, dueling.opponent);
        message.channel.send(`<@${dueling.challenger}> won. ${dueling.challengerPoints} /10 <@${dueling.opponent}> scored ${dueling.opponentPoints} /10`)
      }

      if(dueling.challengerPoints < dueling.opponentPoints){
        saveResults(dueling.challenger, dueling.opponent, dueling.opponent, dueling.challenger);
        message.channel.send(`<@${dueling.opponent}> won. ${dueling.opponentPoints} /10 <@${dueling.challenger}> scored ${dueling.challengerPoints} /10`)
      }
      if(dueling.challengerPoints === dueling.opponentPoints){
        generateQuestionnaire(message, MessageEmbed, dueling);
      };
      dueling.challenger = null;
      dueling.challengerPoints = 0;
      dueling.opponent = null;
      dueling.opponentPoints = 0;
    },3000)
  }
  return dueling;
  }

  module.exports = generateQuestionnaire;