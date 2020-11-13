'use strict';

const pgclient = require('../middleware/pg.js');

function knowledge(message, MessageEmbed){
    let content = message.content.split('!k ')[1];
    if(message.content.split(' ')[0] === '!k'){
        const sql = 'SELECT * FROM knowledge WHERE keyword=$1';
        const values = [content.toLowerCase()];
        pgclient.query(sql,values)
        .then(information => {
            console.log(information.rows[0])
            const embed = new MessageEmbed()
            .setTitle(content)
            .setColor('#228B22')
            .setDescription(information.rows[0].knowledge);
            message.channel.send(embed);
        })
        .catch(err => {
            message.channel.send('We do not currently have this in our knowledge library, if you feel this is a mistake please check your spelling and try again');
            console.error(err);
        })
    }

}

module.exports = knowledge;