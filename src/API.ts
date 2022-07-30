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
    const deck = JSON.parse(localStorage.getItem('deck'))
    if (deck) {
        for (const card of deck.cards) {
            if (card.id.length != 15) {
                const newId = Math.random().toString().slice(-15)
                for (const combo of deck.combos) {
                    for (let card of combo.cards) {
                        if (card == card.id) card = newId
                    }
                }
                for (const cardGroup of deck.cardGroups) {
                    for (let card of cardGroup.cards) {
                        if (card == card.id) card = newId
                    }
                }
                card.id = newId
            }
        }
    }
    return (deck || 'false') as type.Deck
}
export function setDB(db: any) {
    localStorage.setItem('db', JSON.stringify(db))
}
export function getDB(): any {
    return JSON.parse(localStorage.getItem('db') || 'false') as string[]
}
