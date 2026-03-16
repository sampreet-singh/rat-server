import { logger } from "@src/lib/logger.js";
import type { Socket } from "socket.io";

export interface Stored {
  id: string;
  ip: string;
  firstSeen: number;
  lastSeen: number;
}

export interface Client extends Stored {
  connected: boolean;
  socketId?: string;
}

export const clients = new Map<string, Client>();

export function identity(clientId: string, socket: Socket) {
  const ip = socket.handshake.address;
  const socketId = socket.id;

  let client = clients.get(clientId);

  if (!client) {
    client = {
      id: clientId,
      ip,
      firstSeen: Date.now(),
      lastSeen: Date.now(),
      connected: true,
      socketId,
    };

    clients.set(clientId, client);

    logger.info(`Client identified: ID ${clientId}`);
  } else {
    client.connected = true;
    client.socketId = socketId;
    client.lastSeen = Date.now();
    client.ip = ip;

    logger.info(`Client reconnected: ID ${clientId}`);
  }

  socket.data.clientId = clientId;
}

export function disconnect(socket: Socket) {
  const clientId = socket.data.clientId;

  if (!clientId) {
    logger.info(`Client disconnected: IP ${socket.handshake.address}`);
    return;
  }

  const client = clients.get(clientId);
  if (!client) return;

  client.connected = false;
  delete client.socketId;

  logger.info(`Client disconnected: ID ${clientId}`);
}
