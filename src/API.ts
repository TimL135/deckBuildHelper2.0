export interface Card {
  cardId: number;
  cardName: string;
  cardCount: number;
  cardHandTrap: boolean;
  cardBrick: boolean;
  cardComboStarter: boolean;
  cardValue: number;
}
export type Deck = Card[]


export function setData(data: Card[]) {
  localStorage.setItem("deck", JSON.stringify(data))
}
export function getData(): Card[] {
  return JSON.parse(localStorage.getItem("deck") || "[]")
}