const Discord = require('discord.js')

module.exports = {

name: 'ping',
alias: ["Ping"],
async execute(client, message, args){

 message.reply("Pong!")

        }

}