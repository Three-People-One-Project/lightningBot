'use strict';

const generateQuestionnaire = require('../middleware/generateQuestion.js');

function startDuel(message, MessageEmbed, dueling){
    let content = message.content.split(' ');

    if(content[0]==='!duel') {

        if(content[1] === '!y' && dueling.opponent !== null){
          message.channel.send(`<@${dueling.opponent}> has accepted the challenge from <@${dueling.challenger}>`);
        }
    
        else if(content[1] !== '!y'){
          if(content[1] === '!n'){
            message.channel.send(`<@${dueling.opponent}> has denied the challenge from <@${dueling.challenger}>`)
            dueling.opponent = null;
            dueling.challenger = null;
          }
          else{
            message.channel.send(`${content[1]}, you've been challenged to a duel by <@${message.author.id}>! reply !duel !y to accept or reply !duel !n to deny`)
            dueling.opponent = content[1].split('<')[1].split('@')[1].split('>')[0].split('!')[1];
            dueling.challenger = message.author.id;
          }
    
          
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