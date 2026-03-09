import { Client, Events, GatewayIntentBits } from "discord.js";
import config from "@/config/config.json" with { type: "json" };

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

export function startDiscordBot() {
  client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
  });

  client.login(config.discord.botToken);
}
