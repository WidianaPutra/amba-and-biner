import axios from "axios";

export interface DiscordLogPayload {
  actions: string;
  data1: string | number;
  data2: string | number;
}

export async function SendToDiscord(
  actions: string,
  data1: string | number,
  data2: string | number,
): Promise<void> {
  await axios.post("/api/discord-log", {
    actions,
    data1: String(data1),
    data2: String(data2),
  } satisfies DiscordLogPayload);
}
