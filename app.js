const fs = require('node:fs');

const { Client, Intents,Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// const {token} =require("./config.json")
require("dotenv").config()
token=process.env.BOT_TOKEN

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
client.on('interactionCreate', async interaction => {
	if (interaction.isSelectMenu() && interaction.customId === 'feedback-select') {
		const val=parseInt(interaction.values[0])
		if(val<3){
		  await interaction.reply('Thanks for the feedback.We are constantly upgrading our bot to make it better.');

		}
		else if(val>2){
		 await interaction.reply('Thanks for the feedback.We are happy to hear that you liked our service :).');

		}
	};
	if (!interaction.isCommand()) return;


	


	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token); //login bot using token