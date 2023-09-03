import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  console.log("Running Servers Post route ... ");
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        imageUrl,
        name,
        inviteCode: uuidv4(),
        profileId: profile.id,
        channels: {
          create: [{ name: "General", profileId: profile.id }],
        },
        members: { create: [{ profileId: profile.id, role: MemberRole.ADMIN }] },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("API ~ servers ~ Post error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}