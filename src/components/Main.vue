<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />

    <div class="container" style="margin-top: 3vh">
        <div>
            <SexyInput
                placeholder="deck"
                v-model="selectedDeck"
                type="select"
                :options="decks"
                :selectOnBlur="true"
                :controlInput="false"
                :optionProjection="a => a.name"
                btnText="Confirm"
                :btnAction="loadDeck"
                class="orange"
                btnClass="orange"
                labelClass="orange text-dark"
                listClass="orange text-dark"
                :list-item-class="item => 'orange text-dark'"
            />
        </div>

        <div class="btn-group rounded w-100 orange mt-2" role="group" aria-label="Basic radio toggle button group">
            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradioMainDeck"
                autocomplete="off"
                @change="selectedDeckKind = 'mainDeck'"
                :checked="selectedDeckKind == 'mainDeck'"
            />
            <label class="btn btn-outline-primary w-25" for="btnradioMainDeck">Main Deck</label>
            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradioExtraDeck"
                autocomplete="off"
                @change="selectedDeckKind = 'extraDeck'"
                :checked="selectedDeckKind == 'extraDeck'"
            />
            <label class="btn btn-outline-primary w-25" for="btnradioExtraDeck">Extra Deck</label>
            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradioSideDeck"
                autocomplete="off"
                @change="selectedDeckKind = 'sideDeck'"
                :checked="selectedDeckKind == 'sideDeck'"
            />
            <label class="btn btn-outline-primary w-25" for="btnradioSideDeck">Side Deck</label>
            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradioAlternativeDeck"
                autocomplete="off"
                @change="selectedDeckKind = 'alternativeDeck'"
                :checked="selectedDeckKind == 'alternativeDeck'"
            />
            <label class="btn btn-outline-primary w-25" for="btnradioAlternativeDeck">Alternative Deck</label>
        </div>
    </div>
    <div v-if="selectedDeckKind == 'mainDeck'">
        <MainDeck />
    </div>
    <div v-if="selectedDeckKind == 'extraDeck'">
        <ExtraDeck />
    </div>
    <div v-if="selectedDeckKind == 'sideDeck'">
        <SideDeck />
    </div>
    <div v-if="selectedDeckKind == 'alternativeDeck'">
        <AlternativeDeck />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MainDeck from '@/components/DeckKind/MainDeck.vue'
import ExtraDeck from '@/components/DeckKind/ExtraDeck.vue'
import SideDeck from '@/components/DeckKind/SideDeck.vue'
import AlternativeDeck from '@/components/DeckKind/AlternativeDeck.vue'
import SexyInput from '../components/SexyInput.vue'
import { selectedDeckGlobal, decks, deck } from '@/global'
import { getDecks, getDeck, setDeck, setDecks } from '@/API'
export default defineComponent({
    components: { MainDeck, ExtraDeck, SideDeck, AlternativeDeck, SexyInput },
    mounted() {
        if (getDeck()) {
            this.selectedDeck = getDeck().name
        }
    },
    setup() {
        return { selectedDeckGlobal, decks, deck }
    },
    data() {
        return {
            selectedDeckKind: 'mainDeck',
            selectedDeck: '',
        }
    },
    methods: {
        loadDeck() {
            if (this.selectedDeck) {
                if (!this.decks) {
                    this.decks = []
                    this.deck = {
                        name: this.selectedDeck,
                        cards: [],
                        extraCards: [],
                        combos: [],
                        cardGroups: [],
                        sideCards: [],
                        alternativeCards: [],
                    }
                    this.decks.push(this.deck)
                } else {
                    if (this.decks[this.decks.findIndex(d => d.name == this.selectedDeck)]) {
                        this.deck = this.decks[this.decks.findIndex(d => d.name == this.selectedDeck)]
                    } else {
                        this.decks.push({
                            name: this.selectedDeck,
                            extraCards: [],
                            cards: [],
                            combos: [],
                            cardGroups: [],
                            sideCards: [],
                            alternativeCards: [],
                        })
                        this.deck = this.decks[this.decks.findIndex(d => d.name == this.selectedDeck)]
                    }
                }
                this.safeDeck()
            }
        },
        safeDeck() {
            this.decks[this.decks.findIndex(d => d.name == this.deck.name)] = this.deck
            setDeck(this.deck)
            setDecks(this.decks)
            this.selectedDeckGlobal = this.selectedDeck
        },
    },
})
</script>
