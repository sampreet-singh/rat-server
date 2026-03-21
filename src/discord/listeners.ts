import { clients } from "@src/socket/clients.js";
import { ChannelType } from "discord.js";
import { t } from "@src/i18n/index.js";
import { bus } from "@src/lib/bus.js";
import { client } from "./client.js";

bus.on("client_connected", async ({ client_id }) => {
  const data = clients.get(client_id);
  if (!data?.channel_id) return;

  const channel = await client.channels.fetch(data.channel_id);
  if (!channel || channel.type !== ChannelType.GuildText) return;

  await channel.send(t("client.connected", { id: client_id }));
});

bus.on("client_disconnected", async ({ client_id }) => {
  const data = clients.get(client_id);
  if (!data?.channel_id) return;

  const channel = await client.channels.fetch(data.channel_id);
  if (!channel || channel.type !== ChannelType.GuildText) return;

  await channel.send(t("client.disconnected", { id: client_id }));
});
