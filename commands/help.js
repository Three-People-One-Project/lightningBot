'use strict';

function help(message, MessageEmbed){

  if(message.content.startsWith('!help')){
    // message.channel.send('Commands');
    // message.channel.send('!cc = code challenges');
    // message.channel.send('!duel <username> = duel someone');


    const embed = new MessageEmbed()
         .setColor('#fc2c03')
         .setTitle(`Bot Commands`)
         .setDescription(`
            !cc = Code Challenge
            This takes aditional paramaeters of difficulty level, language and dsa type
            Difficult = beginner, novice, expert, master
            Language = javascript, c#, python, ruby, etc
            DSA = trees, hashset, linkedlist, queues, stacks, graphs
            Example: !cc novice javascript hashset
            The order of the additional parameters doesn't matter

            !k word = gives you information on the topic entered
            Example: !k binary tree

            !duel @opponent's username = challenge another person in a web dev quiz challenge!
            Example: !duel @Opponent'sUsername
            Opponent's reply to accept the challenge: !duel !y 
            To deny the challenge: !duel !n
          `)
          
          message.channel.send(embed);


  }

}

module.exports = help;