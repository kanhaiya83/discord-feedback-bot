const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription("The rating you are willing to give our bot!").addStringOption(option =>
      option.setName('rating')
			.setDescription('How was you experience with our bot?')
			.setRequired(true)
			.addChoices(
				{ name: 'Terrible', value: '1' },
				{ name: 'Meh', value: '2' },
				{ name: 'Good', value: '3' },
				{ name: 'Lovely', value: '4' },
				{ name: 'Excellent!', value: '5' },
			)
			),
  async execute(interaction) {
const givenRating=parseInt(interaction.options.getString("rating"))

    console.log(givenRating);
    if(givenRating<3){
		  await interaction.reply({content:'Thanks for the feedback.',ephemeral:true});
		  await interaction.followUp({content:'We are constantly upgrading our bot to make it better.',ephemeral:true});

		}
		else if(givenRating>2){
		 await interaction.reply({content:'Thanks for the feedback.',ephemeral:true})
     await interaction.followUp({content:'We are happy to hear that you liked our service :).',ephemeral:true});

		}
  },
};
