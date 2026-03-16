import { Client, Events, GatewayIntentBits, TextChannel } from "discord.js";
import { resolveEnvironmentVariable as resolve } from "@src/lib/utils.js";
import config from "@config/config.json" with { type: "json" };
import type { Command } from "./command.js";
import { logger } from "@src/lib/logger.js";
import { ping } from "./commands/ping.js";
import { REST, Routes } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(
  resolve(config.discord.botToken),
);
const commands: Command[] = [ping];
const commandData = commands.map((cmd) => cmd.data.toJSON());

client.once(Events.ClientReady, async (readyClient) => {
  logger.info(`Discord client logged in as ${client.user?.tag}`);

  await rest.put(Routes.applicationCommands(readyClient.application.id), {
    body: commandData,
  });

  logger.info(`${commands.length} slash commnd(s) registered to Discord`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  // only process slash commands
  if (!interaction.isChatInputCommand()) return;

  const command = commands.find(
    (cmd) => cmd.data.name === interaction.commandName,
  );

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error(
      `${interaction.commandName} command failed in channel with ID '${interaction.channelId}'`,
    );
  }
});

export { client };
