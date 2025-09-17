export interface Profile {
  pronouns: string;
  description: string;
  track: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  color_one: string;
  color_two: string;
  color_three: string;
}

export interface ProfileResponse {
  ok: boolean;
  data?: Profile;
  url?: string;
  error?: string;
}