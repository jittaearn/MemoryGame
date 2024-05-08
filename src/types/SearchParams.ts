export type Lang = "en" | "th";

export type SearchParams = Record<string, string[] | string | undefined> & {
  lang?: Lang;
};
