import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { resolveEnvironmentVariable as resolve } from "@src/lib/utils.js";
import config from "@config/config.json" with { type: "json" };
import type { Command } from "./command.js";
import { ping } from "./commands/ping.js";
import { logger } from "@src/lib/logger.js";
import { t } from "@src/i18n/index.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commands: Command[] = [ping];
const commandData = commands.map((cmd) => cmd.data.toJSON());

const rest = new REST({ version: "10" }).setToken(
  resolve(config.discord.botToken),
);

client.once(Events.ClientReady, async (readyClient) => {
  logger.info(t("discord.ready", { tag: client.user?.tag }));

  await rest.put(Routes.applicationCommands(readyClient.application.id), {
    body: commandData,
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
      t("discord.commands.failed", {
        command: interaction.commandName,
        channelId: interaction.channelId,
      }),
    );
  }
});

export { client };
