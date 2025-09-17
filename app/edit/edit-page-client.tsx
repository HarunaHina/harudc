"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Form from "./form";
import PasswordPrompt from "./password-prompt";

interface EditPageClientProps {
  data: {
    pronouns: string;
    description: string;
    track: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    color_one: string;
    color_two: string;
    color_three: string;
  };
}

export default function EditPageClient({ data }: EditPageClientProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4">
        <PasswordPrompt onUnlock={() => setIsUnlocked(true)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4">
      <Card className="relative max-w-md mx-auto w-full">
        <CardContent>
          <Form data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
