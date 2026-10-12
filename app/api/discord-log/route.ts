import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 1024;

function toField(value: unknown): string {
  const text = String(value ?? "").trim();

  return (text || "N/A").slice(0, MAX_FIELD_LENGTH);
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { message: "Discord webhook is not configured." },
      { status: 500 },
    );
  }

  // Pastikan URL berasal dari konfigurasi server yang tepercaya.
  try {
    const url = new URL(webhookUrl);

    if (
      url.protocol !== "https:" ||
      url.hostname !== "discord.com" ||
      !url.pathname.startsWith("/api/webhooks/")
    ) {
      return NextResponse.json(
        { message: "Invalid Discord webhook configuration." },
        { status: 500 },
      );
    }
  } catch {
    return NextResponse.json(
      { message: "Invalid Discord webhook configuration." },
      { status: 500 },
    );
  }

  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("actions" in body) ||
      !("data1" in body) ||
      !("data2" in body) ||
      typeof body.actions !== "string" ||
      body.actions.length === 0 ||
      body.actions.length > 256 ||
      typeof body.data1 !== "string" ||
      typeof body.data2 !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid log payload." },
        { status: 400 },
      );
    }

    await axios.post(
      webhookUrl,
      {
        embeds: [
          {
            title: `Log Aksi: ${body.actions}`,
            color: 3447003,
            fields: [
              {
                name: "Data 1",
                value: toField(body.data1),
                inline: true,
              },
              {
                name: "Data 2",
                value: toField(body.data2),
                inline: true,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      },
      {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Failed to send Discord log." },
      { status: 502 },
    );
  }
}
