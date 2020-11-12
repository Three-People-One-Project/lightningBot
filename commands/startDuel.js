'use strict';

const generateQuestionnaire = require('../middleware/generateQuestion.js');
let opponent = require('../middleware/opponent.js');
let challenger = require('../middleware/challenger.js');
let question = require('../middleware/question.js');

function startDuel(message, MessageEmbed, dueling){
    let content = message.content.split(' ');

    if(content[0]==='!duel') {

        if(dueling.question === null && dueling.challenger !== null && dueling.opponent !== null){
          message.channel.send(`<@${dueling.opponent}> has accepted the challenge from <@${dueling.challenger}>`);
        }
    
        if(content[1] !== '!y'){
          message.channel.send(`${content[1]}, you've been challenged to a duel by <@${message.author.id}>! reply !y to accept`)
          dueling.opponent = content[1].split('<')[1].split('@')[1].split('>')[0].split('!')[1];
          dueling.challenger = message.author.id;
    
          
        }
        else if(content[1] === '!y' && dueling.challenger !== null){
    
    
          if(message.author.id === dueling.opponent){
            dueling = generateQuestionnaire(message, MessageEmbed, dueling);
          }
    
          
        }
      }
      return dueling;
}

module.exports = startDuel;