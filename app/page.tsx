import { ShineBorder } from "@/components/magicui/shine-border";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandSpotifyFilled,
  IconBrandTiktok,
  IconCircleDotFilled,
  IconCircleFilled,
  IconCircleRectangleFilled,
  IconMoonFilled,
  IconPointFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

async function getAvatar(id: string) {
  return await fetch(`https://api.lanyard.rest/v1/users/${id}`).then(
    async (d) => (await d.json()).data
  );
}

async function getData() {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
    cache: "no-store",
  }).then(
    async (d) => (await d.json()).data
  );
}

export default async function Home() {
  const avatar = await getAvatar("818634096816422942");
  const data = await getData();

  const status = {
    online: { icon: IconCircleFilled, color: "text-emerald-600", text: "ออนไลน์" },
    dnd: { icon: IconCircleRectangleFilled, color: "text-red-600", text: "ห้ามรบกวน" },
    idle: { icon: IconMoonFilled, color: "text-yellow-500", text: "ไม่อยู่" },
    offline: { icon: IconCircleDotFilled, color: "text-neutral-600", text: "ออฟไลน์" },
  };
  const discordStatusKey = String(avatar.discord_status) as keyof typeof status;
  const discordStatus = status[discordStatusKey] || status["offline"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4">
      <Card className="relative max-w-md mx-auto w-full pt-0">
        <ShineBorder shineColor={[data.color_one, data.color_two, data.color_three]} />
        <CardHeader className="h-30 bg-[url('https://cdn.discordapp.com/banners/818634096816422942/a_1810365f148644a3e1a09366f699821e?size=4096')] rounded-t-xl flex items-center gap-3">
          <div className="relative -ml-1 mt-25 ">
            <Avatar className="size-26 ring-2 ring-card bg-card">
              <AvatarImage src="/avatar.gif" />
            </Avatar>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`ring-3 ring-card bg-card rounded-full absolute bottom-1 right-1`}
                >
                  {discordStatus.icon && (
                    <discordStatus.icon
                      className={cn("size-5", discordStatus.color)}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">{discordStatus.text}</TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent className="pt-8 space-y-4">
          <div className="leading-snug">
            <CardTitle className="text-lg">
              {avatar.discord_user.global_name}
            </CardTitle>
            <CardDescription className="inline-flex items-center gap-2">
              <span>{avatar.discord_user.username}</span>
              <IconPointFilled className="size-2" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    {data.pronouns}
                  </span>
                </TooltipTrigger>
                <TooltipContent>คําสรรพนาม</TooltipContent>
              </Tooltip>
              <Badge variant="outline">
                <Image
                  src={`https://cdn.discordapp.com/clan-badges/${avatar.discord_user.primary_guild.identity_guild_id}/${avatar.discord_user.primary_guild.badge}`}
                  alt="Clan Badge"
                  width={25}
                  height={25}
                  className="size-3.5"
                />
                {avatar.discord_user.primary_guild.tag}
              </Badge>
            </CardDescription>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="inline-flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    className="size-5"
                    src="https://cdn.discordapp.com/badge-icons/4514fab914bdbfb4ad2fa23df76121a6.png"
                    alt="Nitro Tier"
                    width={25}
                    height={25}
                  />
                </TooltipTrigger>
                <TooltipContent>เงิน</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    className="size-5"
                    src="https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png"
                    alt="House Balance"
                    width={25}
                    height={25}
                  />
                </TooltipTrigger>
                <TooltipContent>HypeSquad Balance</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    className="size-5"
                    src="https://cdn.discordapp.com/badge-icons/51040c70d4f20a921ad6674ff86fc95c.png"
                    alt="Server Boost"
                    width={25}
                    height={25}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  การบูสต์เซิร์ฟเวอร์ตั้งแต่ 9 ส.ค. 2568
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="inline-flex items-center gap-2">
              <Button 
                size="icon" 
                variant="secondary" 
                asChild
                disabled={!data.facebook || data.facebook === "#"}
              >
                <Link href={data.facebook || "#"} target="_blank">
                  <IconBrandFacebook />
                </Link>
              </Button>
              <Button 
                size="icon" 
                variant="secondary" 
                asChild
                disabled={!data.instagram || data.instagram === "#"}
              >
                <Link href={data.instagram || "#"} target="_blank">
                  <IconBrandInstagram />
                </Link>
              </Button>
              <Button 
                size="icon" 
                variant="secondary" 
                asChild
                disabled={!data.tiktok || data.tiktok === "#"}
              >
                <Link href={data.tiktok || "#"} target="_blank">
                  <IconBrandTiktok />
                </Link>
              </Button>
            </div>
          </div>

          <div className="p-4 flex flex-col border rounded-lg space-y-4">
            <div style={{ whiteSpace: "pre-wrap" }} className="text-sm">
              {data.description}
            </div>
          </div>

          <div className="p-4 flex flex-col border rounded-lg space-y-4">
            <div className="inline-flex items-center gap-2">
              <IconBrandSpotifyFilled className="size-4" />
              <h1 className="text-xs font-semibold">Now Playing</h1>
            </div>

            {data.track ? (
              <iframe
                src={`https://open.spotify.com/embed/track/${data.track}?utm_source=generator`}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">
                No track selected
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
