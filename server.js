'use strict';

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
  if(content[0]==='!markcomplete') {
    let sql = 'SELECT id FROM users WHERE discordID=$1;';
    let values = [message.author.id];
    pgclient.query(sql,values).then(user=> {
      console.log(user.rows[0].id);
      let challengesql = 'SELECT id FROM challenges WHERE challenge_name=$1;';
      let challengevalue = [content[1]]
      pgclient.query(challengesql,challengevalue).then(challenge => {
        console.log(challenge.rows);
      }).catch( err => {
        console.log('bruh')
      })
    })

  }
  // if(challenge[0]==='!duel') {
  //   challengeUser = challenge[1]
  //   message.channel.send(`${challenge[1]}, you've been challenged to a duel by ${message.author.username}! reply !y to accept`)
  // }

  if(message.content === '!y') {

  }
})

client.login(process.env.TOKEN);
