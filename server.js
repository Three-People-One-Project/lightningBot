'use strict';

let challenger = null;
let opponent = null;
let question = null;
let count = 11;
let challengerPoints = 0;
let opponentPoints = 0;

const {Client,MessageEmbed} = require('discord.js')
require('dotenv').config();
const pg = require('pg');
const pgclient = new pg.Client(process.env.DATABASE_URL);
pgclient.connect().then(()=> {
  console.log('connected to pg')
})
pgclient.on('error', err => console.error(err));
const superagent = require('superagent');
const client = new Client();

client.on('ready', ()=> {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('guildMemberAdd', (member)=> {
  const channel = member.guild.channels.cache.find( channel => {
    channel.name === 'general'
  })
  if(!channel) {
    return;
  }
  channel.send(`Welcome to the war zone, ${member}`);
})

let duel = true;
let challengeUser = ''

client.on('message', (message)=> {
  if(message.content==='!cc') {
    console.log(typeof message.author.id);
    let usersql = 'INSERT into users(discordID) values($1);';
    let uservalue = [message.author.id];
    pgclient.query(usersql,uservalue).then(()=>console.log('user profile added')).catch(err=>console.log(err));
    let sql = 'SELECT * FROM challenges;';
    pgclient.query(sql)
      .then(query => {
        let min = 0;
        let max = query.rows.length;
        let num = Math.floor(Math.random()*(max-min))
        let headers = {Authorization: process.env.CODEWARS,
        ContentType: "application/json"}
        superagent.get(`https://www.codewars.com/api/v1/code-challenges/${query.rows[num].challenge_id}`).set(headers)
        .then( results => {
          console.log(typeof results.body.name);
          console.log(results.body.name);
          console.log(results.body.id);
          let update = 'UPDATE challenges set challenge_name=$1 WHERE challenge_id=$2;';
          let final = results.body.name.replace(/\s+/g,'').toLowerCase();
          console.log(final)
          let values = [final,results.body.id];
          pgclient.query(update,values).then(()=>{
            console.log('success')
          }).catch(err => console.log(err))
          let description = results.body.description.substr(0,500)
          const embed = new MessageEmbed()
          .setTitle(`${results.body.name} (click to view full challenge)`)
          .setURL(results.body.url)
          .setColor('#0099ff')
          .setDescription(description)
          .setFooter('Full challenge available through Code Wars');
          message.channel.send(embed);
      }).catch(err => console.log(err))
      }).catch(err => {
        console.log(err)
      })
  }
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

  if(content[0]==='!duel') {

    console.log(opponent);
    console.log(challenger);

    if(question === null && challenger !== null && opponent !== null){
      message.channel.send(`<@${opponent}> has accepted the challenge from <@${challenger}>`);
    }

    if(content[1] !== '!y'){
      message.channel.send(`${content[1]}, you've been challenged to a duel by <@${message.author.id}>! reply !y to accept`)
      opponent = content[1].split('<')[1].split('@')[1].split('>')[0].split('!')[1];
      challenger = message.author.id;

      
    }
    else if(content[1] === '!y' && challenger !== null){


      if(message.author.id === opponent){
       generateQuestionnaire(message);
      }

      
    }
  }

  if(challenger === message.author.id && question !== null){

   let sql = 'SELECT * FROM technical WHERE question=$1;';
   let values = [question];

   console.log(question);

   pgclient.query(sql, values)
   .then( answers => {
     if(message.content === 'a' && message.content === answers.rows[0].answer || message.content === 'b' && message.content === answers.rows[0].answer){
       challengerPoints++;
       message.channel.send(`<@${challenger}> answered correctly`);

       if(count > 0){
         setTimeout( () => {
          generateQuestionnaire(message);

         },2000)
       }
     } else{
       message.channel.send(`<@${challenger}> answered wrong`)
     }

   })
  }

  if(opponent === message.author.id && question !== null){

    let sql = 'SELECT * FROM technical WHERE question=$1;';
    let values = [question];
 
    console.log(question);
 
    pgclient.query(sql, values)
    .then( answers => {
      if(message.content === 'a' && message.content === answers.rows[0].answer || message.content === 'b' && message.content === answers.rows[0].answer){
        opponentPoints++;
        message.channel.send(`<@${opponent}> answered correctly`);
 
        if(count > 0){
          setTimeout( () => {
           generateQuestionnaire(message);
 
          },2000)
        }
      } else{
        message.channel.send(`<@${opponent}> answered wrong`)
      }
 
    })
   }

   if(content[0] === '!stats' && content[1] === '!duel'){
     let wins = 0;
     let losses = 0;
    opponent = content[2].split('<')[1].split('@')[1].split('>')[0].split('!')[1];
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

  

  console.log(opponent);
  console.log(challenger);
})

function generateQuestionnaire(message){

  if(count <= 0){
    count = 11;
  }

  let sql = 'SELECT * from technical;';
      pgclient.query(sql)
      .then(results => {
        
        let max = results.rows.length;
        let num = Math.floor(Math.random()*max);
        
            let somethingElse = results.rows[num].question.split('?');
            question = results.rows[num].question;
            const embed = new MessageEmbed()
            .setTitle(somethingElse[0])
            .setColor('#0099ff')
            .setDescription(somethingElse[1])
            message.channel.send(embed);
            count--;
            if(count <= 0){
              setTimeout( () => {
                if(challengerPoints > opponentPoints){
                  saveResults(challenger, opponent, challenger, opponent);
                  message.channel.send(`<@${challenger}> won. ${challengerPoints} /10 <@${opponent}> scored ${opponentPoints} /10`)
                }

                if(challengerPoints < opponentPoints){
                  saveResults(challenger, opponent, opponent, challenger);
                  message.channel.send(`<@${opponent}> won. ${opponentPoints} /10 <@${challenger}> scored ${challengerPoints} /10`)
                }
              },3000)

              question = null;
            }
            console.log(count);
            
         
      })
}

function saveResults(challenger, opponent, winner, loser){
  let sql = `INSERT into duels(userOne_id, userTwo_id, winner, loser) values($1, $2, $3, $4);`;
  let values = [challenger, opponent, winner, loser];

  pgclient.query(sql, values)
  .then( results => {
    console.log('saveResults');
  })
}

client.login(process.env.TOKEN);
