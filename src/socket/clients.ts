import { logger } from "@src/lib/logger.js";
import type { Socket } from "socket.io";
import { t } from "@src/i18n/index.js";
import { setup } from "@src/discord/channel.js";

export interface Stored {
  id: string;
  ip: string;
  first_seen: number;
  last_seen: number;
  channel_id: string;
}

export interface Client extends Stored {
  connected: boolean;
  socket_id?: string;
}

export const clients = new Map<string, Client>();

export async function identity(client_id: string, socket: Socket) {
  const ip = socket.handshake.address;
  const socket_id = socket.id;

  let client = clients.get(client_id);

  if (!client) {
    const channel_id = await setup(client_id);

    client = {
      id: client_id,
      ip,
      first_seen: Date.now(),
      last_seen: Date.now(),
      connected: true,
      socket_id,
      channel_id,
    };

    clients.set(client_id, client);

    logger.info(t("socket.connected.ip", { ip }));
  } else {
    client.connected = true;
    client.socket_id = socket_id;
    client.last_seen = Date.now();
    client.ip = ip;

    logger.info(t("socket.connected.id", { id: client_id }));
  }

  socket.data.client_id = client_id;
}

export function disconnect(socket: Socket) {
  const client_id = socket.data.client_id;

  if (!client_id) {
    logger.info(t("socket.disconnected.ip", { ip: socket.handshake.address }));
    return;
  }

  const client = clients.get(client_id);
  if (!client) return;

  client.connected = false;
  delete client.socket_id;

  logger.info(t("socket.disconnected.id", { id: client_id }));
}
