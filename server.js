'use strict';

const {Client,MessageEmbed} = require('discord.js')
const client = new Client();

require('dotenv').config();
const pgclient = require('./middleware/pg.js');
const codeChallenge = require('./commands/codeChallenge.js');
const markComplete = require('./commands/markComplete.js');
// const startDuel = require('./commands/startDuel.js');
const duel = require('./commands/duel.js');
const stats = require('./commands/stats.js');
const guildMemberAdd = require('./commands/guildMemberAdd.js');
const knowledge = require('./commands/kowledge.js');


client.on('ready', ()=> {
  console.log(`Logged in as ${client.user.tag}`)
})

let dueling = {
  opponent: null,
  challenger: null,
  opponentPoints: 0,
  challengerPoints: 0,
  question: null,
  count: 10,
  questionTracker: []
}

client.on('guildMemberAdd', guildMemberAdd)

client.on('message', (message)=> {
  codeChallenge(message, MessageEmbed);
});
client.on('message', (message)=> {
  markComplete(message, MessageEmbed);
});
client.on('message', (message)=> {
  // dueling = startDuel(message, MessageEmbed, dueling);
  dueling = duel(message, MessageEmbed, dueling);
});

client.on('message', (message)=> {
  stats(message, MessageEmbed);
});
client.on('message', (message)=> {
  knowledge(message, MessageEmbed);
});

client.login(process.env.TOKEN);
