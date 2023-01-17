const config = require('../config.json')
const { PermissionFlagsBits } = require('discord.js')
module.exports = (client, message) =>{
    if(!message.content.startsWith(config.prefix)) return//si el mensaje NO empieaza por el prefijo, retorna
    if(message.author.bot) return//Si el autor del mensaje es un bot, retorna
    if(message.channel.type == 1) return//Si el mensaje es en md(mensaje directo), retorna. 1 == md, 0 == canal de texto || https://discord.com/developers/docs/resources/channel#channel-object-channel-types
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    
    let cmd = client.commands.find((c) => c.name == command || c.alias && c.alias.includes(command))
    if(cmd){

        if(!message.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) return message.author.send(`No tengo permisos para enviar mensajes en el servidor donde ejecutaste el comando!`).catch(e => console.log("No puedo alertar al usuario!"))
       
        cmd.execute(client, message, args)
    }


}