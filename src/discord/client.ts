import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { resolve_environment_variable as resolve } from "@src/lib/utils.js";
import config from "@config/config.json" with { type: "json" };
import type { Command } from "./commands/command.js";
import { ping } from "./commands/ping.js";
import { logger } from "@src/lib/logger.js";
import { t } from "@src/i18n/index.js";
import "@src/discord/listeners.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commands: Command[] = [ping];
const command_data = commands.map((cmd) => cmd.data.toJSON());

const rest = new REST({ version: "10" }).setToken(
  resolve(config.discord.bot_token),
);

client.once(Events.ClientReady, async (ready_client) => {
  logger.info(t("discord.ready", { tag: client.user?.tag }));

  await rest.put(Routes.applicationCommands(ready_client.application.id), {
    body: command_data,
  });

  logger.info(
    t("discord.commands.registered", {
      count: commands.length,
    }),
  );
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.find(
    (cmd) => cmd.data.name === interaction.commandName,
  );

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch {
    logger.error(
      t("errors.command_failed", {
        command: interaction.commandName,
        channel_id: interaction.channelId,
      }),
    );
  }
});

export { client };
