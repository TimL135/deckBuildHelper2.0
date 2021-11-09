import { Deck, getDeck, getDecks } from '@/API';
import { ref } from 'vue';
export const selectedDeckGlobal=ref('')
export const decks =ref(getDecks())
export const deck = ref(getDeck())
export const uniqueAllCards =ref([...new Set(deck.value.cards.filter((c) => c.cardName))])