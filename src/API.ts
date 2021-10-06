export interface Card {
  cardId: number;
  cardName: string;
  cardCount: number;
  cardHandTrap: boolean;
  cardBrick: boolean;
  cardComboStarter: boolean;
  cardValue: number;
}
export interface Deck {
  name: string;
  cards: Card[];
}

export function setData(data: Deck[]) {
  localStorage.setItem("decks", JSON.stringify(data))
}
export function getData(): Deck[] {
  return JSON.parse(localStorage.getItem("decks") || "[]")
}