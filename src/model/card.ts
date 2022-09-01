export interface Card {
  name: string;
  portrait?: string;
  useFullscreenPortrait?: boolean;

  subtitle?: string;
  title?: string;

  notes?: { header?: string; text: string }[];
  quote?: string;

  status?: { title: string; options?: string; wide?: boolean }[];
}
