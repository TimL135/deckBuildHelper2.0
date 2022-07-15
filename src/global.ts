import { getDeck, getDecks } from '@/API'
import { ref } from 'vue'
export const selectedDeckGlobal = ref('')
export const decks = ref(
    getDecks()
    // ?null:[{
    //     name: "",
    //     cards: [] as Card[],
    //     combos: [] as Combo[],
    //     cardGroups:[] as Cardgroup[],
    //     extraCards:[] as ExtraCard[],
    // }]
)
export const deck = ref(
    getDeck()
    // ?null:
    // [{

    //     name: "",
    //     cards: [] as Card[],
    //     combos: []as Combo[],
    //     cardGroups:[] as Cardgroup[],
    //     extraCards:[] as ExtraCard[],
    // }]
)
export const uniqueAllCards = ref([...new Set(deck.value.cards?.filter(c => c.name))])

export function findCard(id: string) {
    return deck.value.cards.find(c => c.id == id) || deck.value.alternativeCards.find(c => c.id == id)
}
