// The site has one design system and two "modes":
//  - general: Evan Demsey's engineering portfolio (employers)
//  - audio:   the Sharkbomb Audio side (customers)
// Shared pages (about, contact, project detail) pick their mode from `?from=audio`.
export type SiteMode = "general" | "audio";

export function modeFromParam(value: string | string[] | undefined): SiteMode {
  const v = Array.isArray(value) ? value[0] : value;
  return v === "audio" ? "audio" : "general";
}

export function withMode(href: string, mode: SiteMode): string {
  if (mode !== "audio") return href;
  return href + (href.includes("?") ? "&" : "?") + "from=audio";
}

export function emailFor(mode: SiteMode): string {
  return mode === "audio" ? CONTACT.emailAudio : CONTACT.emailPortfolio;
}

export const CONTACT = {
  // Portfolio side and Sharkbomb Audio side each have their own address.
  emailPortfolio: "evan@demsey.org",
  emailAudio: "evan@sharkbomb.net",
  github: "https://github.com/SharkbombEvan",
  linkedin: "https://www.linkedin.com/in/evandemsey/",
  instagram: "https://instagram.com/SharkbombAudio",
  reverb: "https://reverb.com/shop/sharkbombaudio",
};
