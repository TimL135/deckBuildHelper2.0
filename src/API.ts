export interface Card {
  cardType: cardType;
  cardName: string;
  cardCount: number;
  cardProperties:boolean[];
  cardValue: number;
}
export interface ExtraCard{
  cardName:string;
  cardType:extraCardType;
  cardCount: number;
}
export type cardType= "monster"|"spell"|"trap"
export type extraCardType="fusion"| "synchro"|"xyz"|"link"
export interface Deck {
  name: string;
  cards: Card[];
  combos: Combo[];
  cardGroups:Cardgroup[];
  extraCards:ExtraCard[];
}
export type Combo = [string|Cardgroup];
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
