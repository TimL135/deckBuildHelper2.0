export interface Card {
  cardType: "monster"|"spell"|"trap";
  cardName: string;
  cardCount: number;
  cardProperties:boolean[];
  cardValue: number;
}
export type cardType= "monster"|"spell"|"trap"

export interface Deck {
  name: string;
  cards: Card[];
  combos: Combo[];
  cardGroups:Cardgroup[];
}
export type Combo = string[];

export interface Cardgroup{
  name: string;
cards: string[];
}

export function setDecks(decks: Deck[]) {
  localStorage.setItem("decks", JSON.stringify(decks));
}
export function getDecks(): Deck[] {
  return JSON.parse(localStorage.getItem("decks") || "false");
}
export function setDeck(deck: Deck) {
  localStorage.setItem("deck", JSON.stringify(deck));
}
export function getDeck(): Deck {
  return JSON.parse(localStorage.getItem("deck") || "false");
}
