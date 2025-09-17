import { Card, CardContent } from "@/components/ui/card";
import EditPageClient from "./edit-page-client";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch profile: ${res.status}`);
    }

    const response = await res.json();
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export default async function EditPage() {
  const data = await getData();

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4">
        <Card className="relative max-w-md mx-auto w-full">
          <CardContent>
            <p className="text-center text-muted-foreground py-4">
              Failed to load profile data. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <EditPageClient data={data} />;
}
