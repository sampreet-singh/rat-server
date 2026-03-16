import type { Command } from "@src/discord/command.js";
import { logger } from "@src/lib/logger.js";
import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

export const ping: Command = {
  // set command metadata for Discord
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

    logger.info(`Ping! command ran in channel ID '${interaction.channelId}'`);
  },
};
