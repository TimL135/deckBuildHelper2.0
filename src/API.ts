export interface Card {
  cardType: CardType;
  cardName: string;
  cardCount: number;
  cardProperties:boolean[];
  cardValue: number;
}
export interface ExtraCard{
  cardName:string;
  cardType:ExtraCardType;
  cardCount: number;
}
export type CardType= "monster"|"spell"|"trap"
export type ExtraCardType="fusion"| "synchro"|"xyz"|"link"

export interface Deck {
  name: string;
  cards: Card[];
  combos: Combo[];
  cardGroups:Cardgroup[];
  extraCards:ExtraCard[];
  sideCards:Card[];
  alternativeCards:Card[];
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
