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
    const deck = JSON.parse(localStorage.getItem('deck') || 'false') as type.Deck
    if (deck) {
        for (const combo of deck.combos) {
            for (let card of combo.cards) {
                if (typeof card == 'object') {
                    card = card.id
                }
            }
        }
    }
    return deck
}
