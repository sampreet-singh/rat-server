import config from "@config/config.json" with { type: "json" };
import { CategoryChannel, ChannelType } from "discord.js";
import { t } from "@src/i18n/index.js";
import { client } from "./client.js";

export async function setup(client_id: string): Promise<string> {
  const category = await client.channels.fetch(config.discord.category_id);

  if (!category || category.type !== ChannelType.GuildCategory) {
    throw new Error(t("discord.errors.invalid_category_id"));
  }

  const channel = await (category as CategoryChannel).children.create({
    name: config.discord.channel_name.replace("{id}", client_id),
    type: ChannelType.GuildText,
  });

  return channel.id;
}
