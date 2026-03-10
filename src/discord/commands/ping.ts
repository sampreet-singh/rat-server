import type { Command } from "@src/discord/command.js";
import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription(
      "Replies with 'Pong!' and the bot's latency in milliseconds.",
    ),

  execute: async function (interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: `Pong! ${Math.round(interaction.client.ws.ping)}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
