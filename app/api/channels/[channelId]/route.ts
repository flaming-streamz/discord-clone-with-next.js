import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function DELETE(req: Request, { params }: { params: { channelId: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId) return new NextResponse("Server ID is missing", { status: 400 });
    if (!params.channelId) return new NextResponse("Channel ID is missing", { status: 400 });
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: { some: { profileId: profile.id, role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] } } },
      },
      data: { channels: { delete: { id: params?.channelId, name: { not: "general" } } } },
      include: { members: { include: { profile: true }, orderBy: { role: "asc" } } },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.error("[API_CHANNEL_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { channelId: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const { name, type } = await req.json();

    if (name === "general") return new NextResponse("Channel name cannot be 'general'", { status: 400 });

    const serverId = searchParams.get("serverId");

    if (!serverId) return new NextResponse("Server ID is missing", { status: 400 });
    if (!params.channelId) return new NextResponse("Channel ID is missing", { status: 400 });

    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: { some: { profileId: profile.id, role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] } } },
      },
      data: { channels: { update: { where: { id: params?.channelId }, data: { name, type } } } },
      include: { members: { include: { profile: true }, orderBy: { role: "asc" } } },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.error("[API_CHANNEL_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
