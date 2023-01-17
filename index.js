const Discord = require('discord.js')
require('colors')
const config = require('./config.json')
const fs = require('fs')
const client = new Discord.Client({//Creamos el cliente con los intentos
    intents: [
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages,
    ],

})
//Handler de comando
client.commands = new Discord.Collection()//Creamos una coleccion en donde tendremos nuestros comandos
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'))//Leemos la carpeta comandos y filtramos las que terminan en .js
for(const file of commandFiles){
    console.log(`[Comandos] - Cargando Comando!`.yellow)
    const command = require(`./comandos/${file}`)
    client.commands.set(command.name, command)//Ponemos el nombre del comando en la coleccion
    console.log(`[${file}] - Comando cargado!`.green)
}
//Handler de eventos
const eventFiles = fs.readdirSync('./eventos').filter(file => file.endsWith('.js'))
for(const file of eventFiles){
    console.log(`[Eventos] - Cargando evento`.yellow)
    const nombre_evento = file.split(".")[0]
    const evento = require(`./eventos/${file}`)
    client.on(nombre_evento, evento.bind(null, client))
    console.log(`[${file}] - Evento cargado`.green)
}

client.login(config.token)
