'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PasswordPromptProps {
  onUnlock: () => void;
}

export default function PasswordPrompt({ onUnlock }: PasswordPromptProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const correctPassword = process.env.NEXT_PUBLIC_EDIT_PASSWORD;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <Card className="relative max-w-md mx-auto w-full">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password to edit"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  Incorrect password. Please try again.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <Button type="submit" className="w-full">
            Unlock
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}