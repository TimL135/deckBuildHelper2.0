export interface Card {
  cardId: number;
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

export interface Deck {
  name: string;
  cards: Card[];
}

export function setData(data: Deck[]) {
  localStorage.setItem("decks", JSON.stringify(data));
}
export function getData(): Deck[] {
  return JSON.parse(localStorage.getItem("decks") || "false");
}
export function setDeck(data: Deck) {
  localStorage.setItem("deck", JSON.stringify(data));
}
export function getDeck(): Deck {
  return JSON.parse(localStorage.getItem("deck") || "false");
}
