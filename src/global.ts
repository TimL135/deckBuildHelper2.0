import { getDeck, getDecks, setDeck, setDecks } from '@/API'
import { ref } from 'vue'
import * as type from '@/types'
export const decks = ref(getDecks())
export const deck = ref(getDeck())
export const uniqueAllCards = ref([...new Set(deck.value.cards?.filter(c => c.name))])

export function findCard(id: string) {
    if (id == 'token')
        return {
            name: 'token',
            count: 1,
            type: 'token',
            id: 'token',
        }
    return (
        deck.value.cards?.find(c => c.id == id) ||
        deck.value.alternativeCards?.find(c => c.id == id) ||
        deck.value.extraCards?.find(c => c.id == id) ||
        deck.value.alternativeExtraCards?.find(c => c.id == id)
    )
}
export function findCardByName(name: string) {
    if (name == 'token')
        return {
            name: 'token',
            count: 1,
            type: 'token',
            id: 'token',
        }
    return (
        deck.value.cards?.find(c => c.name == name) ||
        deck.value.alternativeCards?.find(c => c.name == name) ||
        deck.value.extraCards?.find(c => c.name == name) ||
        deck.value.alternativeExtraCards?.find(c => c.name == name)
    )
}
export function findCardGroup(id: string) {
    return deck.value.cardGroups.find(e => e.id == id)
}
export function findCardGroupByName(name: string) {
    return deck.value.cardGroups.find(e => e.name == name)
}
export function searchOnline(search) {
    if (!search) return
    window.open(`http://www.google.com/search?q=cardcluster ${search}`, '_newtab')
}
export function actionToText(action: string) {
    // if (action.match('token')) return action
    while (action.match('0')) {
        let id = undefined
        let counter = 12
        while (!findCard(id) && counter < 16) {
            id = action.slice(action.indexOf('0'), counter)
            counter++
        }
        action = action.replace(id, findCard(id)?.name)
    }

    return action
}

export function setHTMLClass(router: string) {
    switch (router) {
        case 'Main':
        case 'StartHand':
        case 'Combos':
        case 'CardGroups':
            document.getElementsByTagName('html')[0].className = 'portrait'
            break
        case 'Traning':
        case 'Logs':
            document.getElementsByTagName('html')[0].className = 'landscape'
            break
    }
}
export function safeDeck(safedDeck: type.Deck) {
    decks.value[decks.value.findIndex(d => d.name == safedDeck.name)] = safedDeck
    setDeck(safedDeck)
    setDecks(decks.value)
}
export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
}
