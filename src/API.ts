export interface Card {
  cardId: number;
  cardType: "monster"|"spell"|"trap";
  cardName: string;
  cardCount: number;
  cardHandTrap: boolean;
  cardSeacher: boolean;
  cardComboStarter: boolean;
  cardComboPiece: boolean;
  cardSearchable: boolean;
  cardOncePerTurn: boolean;
  cardNegate: boolean;
  cardInteraption: boolean;
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

export function setData(decks: Deck[]) {
  localStorage.setItem("decks", JSON.stringify(decks));
}
export function getData(): Deck[] {
  return JSON.parse(localStorage.getItem("decks") || "false");
}
export function setDeck(deck: Deck) {
  localStorage.setItem("deck", JSON.stringify(deck));
}
export function getDeck(): Deck {
  return JSON.parse(localStorage.getItem("deck") || "false");
}
