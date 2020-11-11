'use strict';

const pgclient = require('./pg.js');
const saveResults = require('./saveResults.js');
let count = require('./count.js');
let question = require('./question.js');
let challengerPoints = require('./challengerPoints.js');
let opponentPoints = require('./opponentPoints.js');

function generateQuestionnaire(message, MessageEmbed, dueling){

    if(dueling.count <= 0){
      dueling.count = 10;
    }
  
    if(dueling.count>0) {
  
    
    let sql = 'SELECT * from technical;';
        pgclient.query(sql)
        .then(results => {
          
          let max = results.rows.length;
          let num = Math.floor(Math.random()*max);
          
              let somethingElse = results.rows[num].question.split('?');
              dueling.question = results.rows[num].question;
              const embed = new MessageEmbed()
              .setTitle(somethingElse[0])
              .setColor('#0099ff')
              .setDescription(somethingElse[1])
              message.channel.send(embed);
              dueling.count--;
              if(dueling.count <= 0){
                setTimeout( () => {
                  if(dueling.challengerPoints > dueling.opponentPoints){
                    saveResults(dueling.challenger, dueling.opponent, dueling.challenger, dueling.opponent);
                    message.channel.send(`<@${dueling.hallenger}> won. ${dueling.challengerPoints} /10 <@${dueling.opponent}> scored ${dueling.opponentPoints} /10`)
                  }
  
                  if(dueling.challengerPoints < dueling.opponentPoints){
                    saveResults(dueling.challenger, dueling.opponent, dueling.opponent, dueling.challenger);
                    message.channel.send(`<@${dueling.opponent}> won. ${dueling.opponentPoints} /10 <@${dueling.challenger}> scored ${dueling.challengerPoints} /10`)
                  }
  
                  dueling.challenger = null;
                  dueling.challengerPoints = 0;
                  dueling.opponent = null;
                  dueling.opponentPoints = 0;
                },3000)
  
              }              
        })
  }
  console.log(`generate question: ${dueling.question}`)
  return dueling.question;
  }

  module.exports = generateQuestionnaire;