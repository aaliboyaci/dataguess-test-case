export interface Country {
  name: string;
  emoji: string;
  currency: string;
  code: string;
  capital: string;
  continent?: { name: string } | null;
  languages: { name: string }[];
}
