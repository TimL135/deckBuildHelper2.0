export const debug = "debug TypeScript";
export interface Card {
  type: CardType;
  name: string;
  count: number;
  properties: boolean[];
  value: number;
  id: string;
}
export interface ExtraCard {
  name: string;
  type: ExtraCardType;
  count: number;
  id: string;
}
export interface OwnCard {
  name: string;
  count: number;
  id: string;
  type: CardType | ExtraCardType;
}

export type CardType = "monster" | "spell" | "trap";
export type ExtraCardType = "fusion" | "synchro" | "xyz" | "link";

export interface Deck {
  name: string;
  cards: Card[];
  combos: Combo[];
  cardGroups: Cardgroup[];
  extraCards: ExtraCard[];
  sideCards: Card[];
  alternativeCards: Card[];
  alternativeExtraCards: ExtraCard[];
  traingsDeck: any[];
  logs: Log[];
}
export interface Log {
  name: string;
  active: boolean;
  startHand: string[];
  log: string[];
  missingCards: string[];
}
export interface Slot {
  name: string;
  value: string;
  hide: boolean;
  def: boolean;
}
export interface Combo {
  cards: string[];
  active: boolean;
}

export interface Cardgroup {
  name: string;
  id: string;
  cards: string[];
  active: boolean;
}
