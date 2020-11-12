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
          **Code Challenge**
            !cc = Code Challenge
            This takes additional parameters of difficulty level, language and dsa type
            Difficulty = beginner, novice, expert, master
            Language = javascript, c#, python, ruby, etc
            DSA = trees, hashset, linkedlist, queues, stacks, graphs
            Example:
            \`\`\`
            !cc
            !cc javascript
            !cc c# trees
            !cc javascript novice linkedlist
            \`\`\`
            **Knowledge**
            !k word = gives you information on the topic entered
            Example:
            \`\`\`
            !k binary tree
In computer science, a binary tree is a tree data structure in which each node has at most two children, which are referred to as the left child and the right child. A recursive definition using just set theory notions is that a (non-empty) binary tree is a tuple (L, S, R), where L and R are binary trees or the empty set and S is a singleton set containing the root.
            \`\`\`
            **Technical Question duel**
            !duel @opponent's username = challenge another person in a technical question quiz challenge!
            Opponent's reply to accept the challenge: !duel !y or !duel !n to deny
            Reply with your answers to the questions a or b.
            once the match is over the winner or loser will be saved.
            Example:
            \`\`\`
            TrialByFire
            !duel @Leah
            testBot
            @Leah, you've been challenged to a duel by @TrialbyFire! reply !duel !y to accept or reply !duel !n to deny
            Leah
            !duel !y
            testbot
            @Leah has accepted the challenge from @TrialbyFire
            or if they deny:
            Leah
            !duel !n
            @Leah has denied the challenge from @TrialbyFire
            \`\`\`
            !stats allows you to see your total wins and losses against an individual
            Example: !stats @opponent will return stats between you and opponent
          `);
          
          message.channel.send(embed);


  }

}

module.exports = help;