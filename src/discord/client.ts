import { bus } from "@src/events/bus.js";
import config from "@config/config.json" with { type: "json" };
import { Client, Events, GatewayIntentBits, TextChannel } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const DEBUG = config.discord.debug;

let debugChannel: TextChannel | null = null;

async function debug(message: string) {
  if (!DEBUG || !debugChannel) return;
  await debugChannel.send(message);
}

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);

  if (!DEBUG) return;

  const channel = await client.channels.fetch(config.discord.debugChannelId);

  if (channel?.isTextBased()) {
    debugChannel = channel as TextChannel;
  } else {
    console.warn("Debug channel not found or not text-based");
  }
});

bus.on("clientConnected", ({ id }) => {
  debug(`client connected: ${id}`);
});

bus.on("clientDisconnected", ({ id }) => {
  debug(`client disconnected: ${id}`);
});

export { client };
