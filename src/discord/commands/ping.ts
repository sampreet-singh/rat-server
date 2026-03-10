import type { Command } from "@src/discord/command.js";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription(
      "Replies with 'Pong!' and the bot's latency in milliseconds.",
    ),

  execute: async function (interaction: ChatInputCommandInteraction) {
    interaction.reply(`Pong! ${Math.round(interaction.client.ws.ping)}`);
  },
};
