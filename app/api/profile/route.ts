import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";
import { Profile } from "@/types/profile";
import { eq } from "drizzle-orm";

const PROFILE_ID = 1;

async function readProfile(): Promise<{ profile?: Profile }> {
  try {
    const result = await db.select().from(usersTable).where(eq(usersTable.id, PROFILE_ID));
    
    if (!result || result.length === 0) {
      return { profile: undefined };
    }

    const profileData = result[0];
    const profile: Profile = {
      pronouns: profileData.pronouns || "",
      description: profileData.description || "",
      track: profileData.track || "",
      facebook: profileData.facebook || "#",
      instagram: profileData.instagram || "#",
      tiktok: profileData.tiktok || "#",
      color_one: profileData.color_one || "",
      color_two: profileData.color_two || "",
      color_three: profileData.color_three || "",
    };

    return { profile };
  } catch (error) {
    console.error("Failed to read profile:", error);
    return { profile: undefined };
  }
}

async function writeProfile(data: Profile): Promise<void> {
  const cleanData = {
    pronouns: data.pronouns?.trim() || "",
    description: data.description?.trim() || "",
    track: data.track?.trim() || "",
    facebook: data.facebook?.trim() || "#",
    instagram: data.instagram?.trim() || "#",
    tiktok: data.tiktok?.trim() || "#",
    color_one: data.color_one?.trim() || "",
    color_two: data.color_two?.trim() || "",
    color_three: data.color_three?.trim() || "",
  };

  try {
    await db
      .update(usersTable)
      .set({ ...cleanData })
      .where(eq(usersTable.id, PROFILE_ID))
  } catch (error) {
    console.error("Failed to write profile:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const { profile } = await readProfile();

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: profile }, { status: 200 });
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await writeProfile(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export const runtime = "nodejs";
