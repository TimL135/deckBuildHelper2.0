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
        for (const cardMaindeck of deck.cards.concat(deck.sideCards).concat(deck.alternativeCards)) {
            if (cardMaindeck.id.length != 15) {
                const newId = Math.random().toString().slice(-15)
                for (const combo of deck.combos) {
                    for (const card of combo.cards) {
                        if (card == cardMaindeck.id) combo.cards[combo.cards.findIndex(e => e == cardMaindeck.id)] = newId
                    }
                }
                for (const cardGroup of deck.cardGroups) {
                    for (const card of cardGroup.cards) {
                        if (card == cardMaindeck.id) {
                            cardGroup.cards[cardGroup.cards.findIndex(e => e == cardMaindeck.id)] = newId
                        }
                    }
                }
                cardMaindeck.id = newId
            }
        }
        for (const card of deck.extraCards.concat(deck.alternativeExtraCards)) {
            if (!card.id) card.id = Math.random().toString().slice(-15)
        }
    }
    console.log(deck)
    return (deck || 'false') as type.Deck
}
export function setDB(db: any) {
    localStorage.setItem('db', JSON.stringify(db))
}
export function getDB(): any {
    return JSON.parse(localStorage.getItem('db') || 'false') as string[]
}
