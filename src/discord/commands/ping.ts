import type { Command } from "@src/discord/command.js";
import { t } from "@src/i18n/index.js";
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
    .setDescription(t("discord.commands.ping.description")),

  async execute(interaction: ChatInputCommandInteraction) {
    const pingValue = Math.round(interaction.client.ws.ping);

    await interaction.reply({
      content: t("discord.commands.ping.reply", {
        ping: pingValue,
      }),
      flags: MessageFlags.Ephemeral,
    });

    logger.info(
      t("discord.commands.ping.log", {
        channelId: interaction.channelId,
      }),
    );
  },
};
