export const debug = 'debug TypeScript'
export interface Card {
    type: CardType
    name: string
    count: number
    properties: boolean[]
    value: number
    id: string
}
export interface ExtraCard {
    name: string
    type: ExtraCardType
    count: number
}
export type CardType = 'monster' | 'spell' | 'trap'
export type ExtraCardType = 'fusion' | 'synchro' | 'xyz' | 'link'

export interface Deck {
    name: string
    cards: Card[]
    combos: Combo[]
    cardGroups: Cardgroup[]
    extraCards: ExtraCard[]
    sideCards: Card[]
    alternativeCards: Card[]
}
export interface Slot {
    name: string
    value: string
}
export interface Combo {
    cards: [string | Cardgroup]
    active: boolean
}

export interface Cardgroup {
    name: string
    id: string
    cards: string[]
    active: boolean
}
