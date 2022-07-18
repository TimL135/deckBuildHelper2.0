import { getDeck, getDecks } from '@/API'
import { ref } from 'vue'
export const selectedDeckGlobal = ref('')
export const decks = ref(getDecks())
export const deck = ref(getDeck())
export const uniqueAllCards = ref([...new Set(deck.value.cards?.filter(c => c.name))])

export function findCard(id: string) {
    return deck.value.cards.find(c => c.id == id) || deck.value.alternativeCards.find(c => c.id == id) || deck.value.extraCards.find(c => c.id == id)
}
export function findCardByName(name: string) {
    return (
        deck.value.cards.find(c => c.name == name) ||
        deck.value.alternativeCards.find(c => c.name == name) ||
        deck.value.extraCards.find(c => c.name == name)
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
