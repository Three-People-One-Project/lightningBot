'use strict';

function guildMemberAdd(member){
    const channel = member.guild.channels.cache.find( channel => {
        channel.name === 'general'
      })
      if(!channel) {
        return;
      }
      channel.send(`Welcome to the war zone, ${member}`);
}

module.exports = guildMemberAdd;