'use strict';

const pgclient = require('../middleware/pg.js');

function markComplete(message, MessageEmbed){
    let content = message.content.split(' ');
    let userId = '';

    if(content[0]==='!markcomplete') {
      let sql = 'SELECT id FROM users WHERE discordID=$1;';
      let values = [message.author.id];
      pgclient.query(sql,values)
      .then(user=> {
        // console.log(user.rows[0].id);
        userId = user.rows[0].id;
        let challengesql = 'SELECT id FROM challenges WHERE challenge_name=$1;';
        let challengevalue = [content[1]]
        pgclient.query(challengesql,challengevalue)
        .then(challenge => {
          console.log(challenge.rows);
          let finalSql = 'INSERT INTO completedChallenges(user_id, challenge_id) VALUES($1, $2);';
          let finalValues = [userId, challenge.rows[0].id];
          pgclient.query(finalSql, finalValues)
          .then(result => {
            const embed = new MessageEmbed()
            .setTitle(`Completion`)
            .setColor('#0099ff')
            .setDescription('Congratulations on completing your code challenge')
            .setImage('https://media.giphy.com/media/l0MYJnJQ4EiYLxvQ4/giphy-downsized-large.gif')
            message.channel.send(embed);
          })
          .catch(err => console.log(err))
        })
        .catch( err => {
          console.log(err)
        })
      })
  
    }
}

module.exports = markComplete;