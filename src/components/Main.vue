<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />

    <div class="container" style="margin-top: 3vh">
        <div class="header">
            <div>
                <SexyInput
                    placeholder="deck"
                    v-model="selectedDeck"
                    type="select"
                    :options="decks"
                    :selectOnBlur="false"
                    :controlInput="false"
                    @selectItem="loadDeck()"
                    :optionProjection="a => a.name"
                    btnText="&#10004;"
                    :btnAction="loadDeck"
                    class="orange"
                    btnClass="orange"
                    labelClass="orange text-dark"
                    listClass="orange text-dark"
                    :list-item-class="item => 'orange text-dark'"
                />
            </div>
            <button style="background-color: rgb(12, 12, 12); border: none; padding-top: 1.5vh" @click="openDeckSettingsModal()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-gear" viewBox="0 0 16 16" stroke="#ffa107">
                    <path
                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                    />
                    <path
                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                    />
                </svg>
            </button>
        </div>
        <div class="deckSelect text-dark mt-1" v-if="deck">
            <div
                class="round-start"
                :class="selectedDeckKind == 'mainDeck' ? 'green' : 'orange'"
                style="border: 1px solid rgb(12, 12, 12)"
                @click="selectedDeckKind = 'mainDeck'"
            >
                Main Deck
            </div>
            <div
                :class="selectedDeckKind == 'extraDeck' ? 'green' : 'orange'"
                style="border: 1px solid rgb(12, 12, 12)"
                @click="selectedDeckKind = 'extraDeck'"
            >
                Extra Deck
            </div>
            <div
                :class="selectedDeckKind == 'sideDeck' ? 'green' : 'orange'"
                style="border: 1px solid rgb(12, 12, 12)"
                @click="selectedDeckKind = 'sideDeck'"
            >
                Side Deck
            </div>
            <div
                class="round-end"
                :class="selectedDeckKind == 'alternativeDeck' ? 'green' : 'orange'"
                style="border: 1px solid rgb(12, 12, 12)"
                @click="selectedDeckKind = 'alternativeDeck'"
            >
                Alternatives
            </div>
        </div>
    </div>
    <div v-if="deck">
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
    </div>
    <!-- new modal -->
    <div id="deckSettingsModal" class="modal">
        <div class="modal-content">
            <div class="container">
                <div class="d-flex justify-content: center mb-1">
                    <div class="w-100">
                        <div v-for="deck of decks" :key="JSON.stringify(deck)" class="decklist mb-2 orange round">
                            <div></div>
                            <div class="text-dark" @click="switchDeck(deck.name)">
                                {{ deck.name }}
                            </div>
                            <div class="orange" @click="shareDeck(deck)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-share-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"
                                    />
                                </svg>
                            </div>
                            <div class="orange round" @click="deleteDeck('check', deck.name)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <SexyInput
                            type="text"
                            placeholder="new deck"
                            v-model="newDeck"
                            class="orange"
                            label-class="orange"
                            :label-border="true"
                            btn-class="orange"
                            btn-text="&#10004;"
                            :btn-action="addNewDeck"
                        />
                    </div>
                </div>
                <div v-if="deckInfo" class="orange text-dark round">
                    {{ deckInfo }}
                </div>
                <div v-if="deckInput" class="mt-3">
                    <div class="w-100 orange text-dark round round mb-1">Are you sure to delete {{ deckInput }}</div>
                    <div class="deleteModal">
                        <button type="button" class="btn btn-success round me-1" style="grid-area: yes" @click="deleteDeck('delete')">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-check-lg"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                                />
                            </svg>
                        </button>
                        <button type="button" class="btn btn-danger round" style="grid-area: no" @click="deleteDeck('cancel')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path
                                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MainDeck from '@/components/DeckKind/MainDeck.vue'
import ExtraDeck from '@/components/DeckKind/ExtraDeck.vue'
import SideDeck from '@/components/DeckKind/SideDeck.vue'
import AlternativeDeck from '@/components/DeckKind/AlternativeDeck.vue'
import SexyInput from '../components/SexyInput.vue'
import { decks, deck, setHTMLClass, safeDeck } from '@/global'
import { setDecks } from '@/API'
import * as type from '@/types'
export default defineComponent({
    components: { MainDeck, ExtraDeck, SideDeck, AlternativeDeck, SexyInput },
    mounted() {
        this.selectedDeck = this.deck.name
        setHTMLClass('Main')
    },
    setup() {
        return { decks, deck }
    },
    data() {
        return {
            selectedDeckKind: 'mainDeck',
            selectedDeck: '',
            deckInput: '',
            deckInfo: '',
            newDeck: '',
        }
    },
    methods: {
        closeDeckSettingsModal() {
            this.deckInput = ''
            this.newDeck = ''
            let modal = document.getElementById('deckSettingsModal')
            if (modal) modal.style.display = 'none'
        },
        openDeckSettingsModal() {
            window.onclick = event => {
                if (event.target == document.getElementById('deckSettingsModal')) this.closeDeckSettingsModal()
            }
            let modal = document.getElementById('deckSettingsModal')
            if (modal) modal.style.display = 'block'
        },

        deleteDeck(fun: string, deck?: string) {
            if (fun == 'delete') {
                this.decks = this.decks.filter(deck => deck.name != this.deckInput)
                if (this.selectedDeck == this.deckInput) {
                    this.selectedDeck = ''
                    this.deck = false
                }
                this.deckInput = ''
                safeDeck(this.deck)
                this.closeDeckSettingsModal()
            }
            if (fun == 'check') {
                this.deckInput = deck
            }
            if (fun == 'cancel') {
                this.deckInput = ''
            }
        },

        shareDeck(deck: type.Deck) {
            navigator.clipboard.writeText(JSON.stringify(deck))
            this.deckInfo = `deck ${deck.name} was copied`
            setTimeout(() => {
                this.deckInfo = ''
            }, 3000)
        },
        addNewDeck() {
            try {
                let deck = JSON.parse(this.newDeck.trim()) as type.Deck
                if (!deck.alternativeCards) return
                if (!deck.cardGroups) return
                if (!deck.cards) return
                if (!deck.combos) return
                if (!deck.extraCards) return
                if (!deck.name) return
                if (!deck.sideCards) return
                let counter = NaN
                while (this.decks.some(e => e.name == deck.name + (counter ? counter : ''))) {
                    if (!counter) counter = 1
                    else counter++
                }
                deck.name = deck.name + (counter ? counter : '')
                if (this.decks) {
                    this.decks.push(deck)
                } else {
                    this.decks = [deck]
                }

                this.newDeck = ''
                setDecks(this.decks)
            } catch {
                this.selectedDeck = this.newDeck
                this.newDeck = ''
                this.loadDeck()
            }
        },
        switchDeck(name: string) {
            this.selectedDeck = name
            this.loadDeck()
            this.closeDeckSettingsModal()
        },
        loadDeck() {
            this.selectedDeck.trim()
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
                        alternativeExtraCards: [],
                        logs: [],
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
                            alternativeExtraCards: [],
                            logs: [],
                        })
                        this.deck = this.decks[this.decks.findIndex(d => d.name == this.selectedDeck)]
                    }
                }
                safeDeck(this.deck)
            }
            this.selectedDeckKind = 'mainDeck'
        },
    },
})
</script>
<style scoped>
.header {
    display: grid;
    grid-template-columns: 15fr 1fr;
}
.decklist {
    display: grid;
    grid-template-columns: 2fr 15fr 1fr 1fr;
}
.deckSelect {
    display: grid;
    grid-template-columns: auto auto auto auto;
}
</style>
