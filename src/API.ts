import * as type from '@/types'

export function setDecks(decks: type.Deck[]) {
    localStorage.setItem('decks', JSON.stringify(decks))
}
export function getDecks(): type.Deck[] {
    return JSON.parse(localStorage.getItem('decks') || 'false')
}
export function setDeck(deck: type.Deck) {
    localStorage.setItem('deck', JSON.stringify(deck))
}
export function getDeck(): type.Deck {
    return JSON.parse(localStorage.getItem('deck') || 'false') as type.Deck
}
export function setDB(db: any) {
    localStorage.setItem('db', JSON.stringify(db))
}
export function getDB(): any {
    return JSON.parse(localStorage.getItem('db') || 'false') as string[]
}
