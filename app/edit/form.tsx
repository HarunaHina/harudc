"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconDeviceFloppy, IconHome, IconLoader2 } from "@tabler/icons-react";

import Link from "next/link";

import { toast } from "sonner";

export default function Form({
  data,
}: {
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
}) {
  const [pronouns, setPronouns] = useState<string>(data.pronouns);
  const [description, setDescription] = useState<string>(data.description);
  const [track, setTrack] = useState<string>(data.track);
  const [facebook, setFacebook] = useState<string>(data.facebook);
  const [instagram, setInstagram] = useState<string>(data.instagram);
  const [tiktok, setTiktok] = useState<string>(data.tiktok);
  const [colorOne, setColorOne] = useState<string>(data.color_one);
  const [colorTwo, setColorTwo] = useState<string>(data.color_two);
  const [colorThree, setColorThree] = useState<string>(data.color_three);

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          pronouns,
          description,
          track,
          facebook,
          instagram,
          tiktok,
          color_one: colorOne,
          color_two: colorTwo,
          color_three: colorThree,
        }),
      });

      toast.success("บันทึกข้อมูลสําเร็จ");
    } catch {
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="pronoun">คําสรรพนาม</Label>
        <Input
          id="pronoun"
          value={pronouns}
          onChange={(e) => setPronouns((e.target as HTMLInputElement).value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">คําอธิบาย</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) =>
            setDescription((e.target as HTMLTextAreaElement).value)
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="track">ไอดีเพลง (Spotify)</Label>
        <Input
          id="track"
          value={track}
          onChange={(e) => setTrack((e.target as HTMLInputElement).value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="facebook">Facebook</Label>
        <Input
          id="facebook"
          value={facebook}
          onChange={(e) => setFacebook((e.target as HTMLInputElement).value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="intragram">Instragram</Label>
        <Input
          id="instragram"
          value={instagram}
          onChange={(e) => setInstagram((e.target as HTMLInputElement).value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="tiktok">TikTok</Label>
        <Input
          id="tikok"
          value={tiktok}
          onChange={(e) => setTiktok((e.target as HTMLInputElement).value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="color_one">สีที่ 1</Label>
          <Input
            type="color"
            id="color_one"
            value={colorOne}
            onChange={(e) => setColorOne((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="color_two">สีที่ 2</Label>
          <Input
            type="color"
            id="color_two"
            value={colorTwo}
            onChange={(e) => setColorTwo((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="color_three">สีที่ 3</Label>
          <Input
            type="color"
            id="color_three"
            value={colorThree}
            onChange={(e) =>
              setColorThree((e.target as HTMLInputElement).value)
            }
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link href="/">
            <IconHome />
            กลับ
          </Link>
        </Button>
        <Button type="submit" className="w-full flex-1" disabled={isLoading}>
          {isLoading ? (
            <IconLoader2 className="animate-spin" />
          ) : (
            <IconDeviceFloppy />
          )}
          บันทึกข้อมูล
        </Button>
      </div>
    </form>
  );
}
