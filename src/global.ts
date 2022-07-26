import { getDeck, getDecks, setDeck, setDecks, setDB, getDB } from '@/API'
import { ref } from 'vue'
import * as type from '@/types'
import axios from 'axios'
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
    const pattern = /\d{15}/g
    while (action.match(pattern)) {
        action = action.replace(pattern, convert)
    }
    while (action.match('0')) {
        let id = undefined
        let counter = 12
        while (!findCard(id) && counter <= 16) {
            id = action.slice(action.indexOf('0'), counter)
            counter++
        }
        action = action.replace(id, findCard(id)?.name)
    }

    return action
}
function convert(str, p1, offset, s) {
    return findCard(str)?.name
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
function createType(type: string) {
    if (type.includes('XYZ')) return 'xyz'
    if (type.includes('Fusion')) return 'fusion'
    if (type.includes('Synchro')) return 'synchro'
    if (type.includes('Link')) return 'link'
    if (type.includes('Monster')) return 'monster'
    if (type.includes('Spell')) return 'spell'
    if (type.includes('Trap')) return 'trap'
}
export let db = getDB()
//7 days
if (db.timeStamp < Date.now() - 6.048e8 || !db.data[0].type) db = false
else db = db.data
if (!db) {
    try {
        axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?language=de').then(resp => {
            db = resp.data.data.map(e =>
                Object.fromEntries([
                    ['name', e.name],
                    ['type', createType(e.type)],
                ])
            )
            setDB({ timeStamp: Date.now(), data: db })
        })
    } catch {
        if (getDB()) db = getDB()
        else db = []
    }
}
export const mainCardDB = []
export const extraCardDB = []
if (db.length) {
    for (const card of db) {
        switch (card.type) {
            case 'link':
            case 'xyz':
            case 'fusion':
            case 'synchro':
                extraCardDB.push(card)
                break
            case 'monster':
            case 'spell':
            case 'trap':
                mainCardDB.push(card)
                break
        }
    }
}
