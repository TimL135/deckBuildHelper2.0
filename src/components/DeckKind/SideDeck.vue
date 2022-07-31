<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />

    <div class="container mt-2">
        <div class="round mb-1" style="border: 1px solid #ffa107">
            {{ `Card amount: ${deckNumber}` }}
        </div>
        <div class="d-flex mb-1">
            <div
                class="w-25 round-start"
                style="border: 1px solid #ffa107"
                @click="filter[0] = !filter[0]"
                :class="filter[0] ? 'orange text-dark' : ''"
            >
                Handtraps:
                <br />
                {{ counts[0] }}({{ uniqueCounts[0] }})
            </div>
            <div class="w-25" style="border: 1px solid #ffa107" @click="filter[1] = !filter[1]" :class="filter[1] ? 'orange text-dark' : ''">
                Seacher:
                <br />
                {{ counts[1] }}({{ uniqueCounts[1] }})
            </div>
            <div class="w-25" style="border: 1px solid #ffa107" @click="filter[2] = !filter[2]" :class="filter[2] ? 'orange text-dark' : ''">
                Combo Starter:
                <br />
                {{ counts[2] }}({{ uniqueCounts[2] }})
            </div>
            <div
                class="w-25 round-end"
                style="border: 1px solid #ffa107"
                @click="filter[3] = !filter[3]"
                :class="filter[3] ? 'orange text-dark' : ''"
            >
                Negate:
                <br />
                {{ counts[3] }}({{ uniqueCounts[3] }})
            </div>
        </div>
        <div class="d-flex mb-1">
            <div
                class="w-25 round-start"
                style="border: 1px solid #ffa107"
                @click="filter[4] = !filter[4]"
                :class="filter[4] ? 'orange text-dark' : ''"
            >
                Once per Turn:
                <br />
                {{ counts[4] }}({{ uniqueCounts[4] }})
            </div>
            <div class="w-25" style="border: 1px solid #ffa107" @click="filter[5] = !filter[5]" :class="filter[5] ? 'orange text-dark' : ''">
                Searchable:
                <br />
                {{ counts[5] }}({{ uniqueCounts[5] }})
            </div>
            <div class="w-25" style="border: 1px solid #ffa107" @click="filter[6] = !filter[6]" :class="filter[6] ? 'orange text-dark' : ''">
                Combo Piece:
                <br />
                {{ counts[6] }}({{ uniqueCounts[6] }})
            </div>
            <div
                class="w-25 round-end"
                style="border: 1px solid #ffa107"
                @click="filter[7] = !filter[7]"
                :class="filter[7] ? 'orange text-dark' : ''"
            >
                Interaption:
                <br />
                {{ counts[7] }}({{ uniqueCounts[7] }})
            </div>
        </div>
        <br />
        <div>
            <button type="button" class="w-100 btn orange round" @click="openCardAddModal()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </button>
        </div>
        <br />
        <div class="cardTable p-2">
            <div>Cards</div>
            <div></div>
            <div></div>
        </div>
        <div
            class="cardTable p-2"
            v-for="card in deck.sideCards.filter(card => filter.every((f, i) => (f ? f && card.properties[i] : true)))"
            :key="card.name"
            :class="card.type"
            style="border-bottom: 1px solid black"
        >
            <div @dblclick="searchOnline(card.name)">{{ card.name }}({{ card.count }})</div>
            <div>
                <img style="height: 5rem" :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card.src}.jpg`" alt="" />
            </div>
            <div style="margin-top: -0.5rem">
                <button @click="openCardEditModal(card.name)" style="background-color: #ffffff00; border: none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-gear" viewBox="0 0 16 16">
                        <path
                            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                        />
                        <path
                            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                        />
                    </svg>
                </button>
                <button @click="openCardDeleteModal(card.name)" style="background-color: #ffffff00; border: none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <!-- new modal -->
    <div id="cardAddEditModal" class="modal">
        <div class="modal-content">
            <div class="container">
                <div>
                    <SexyInput
                        @change="alternativeCheck"
                        :onSelectItem="alternativeCheck"
                        type="select"
                        placeholder="name"
                        v-model="nameInput"
                        :options="
                            deck.alternativeCards
                                ?.map(e =>
                                    Object.fromEntries([
                                        ['name', e.name],
                                        ['type', e.type],
                                    ])
                                )
                                .concat(mainCardDB)
                        "
                        :option-projection="e => e.name"
                        :labelBorder="true"
                        :selectOnBlur="true"
                        :controlInput="false"
                        :noElementMessage="deck.alternativeCards?.length ? nameInput : nameInput ? nameInput : 'no alternative cards'"
                        class="orange"
                        labelClass="orange"
                        listClass="orange text-dark"
                        :listItemClass="item => item.type || 'orange text-dark'"
                        :required="true"
                        :error="error.nameInput"
                    />
                </div>
                <div class="mb-3">
                    <SexyInput
                        type="number"
                        placeholder="Quantity"
                        v-model="countInput"
                        min="1"
                        max="3"
                        class="orange"
                        labelClass="orange"
                        listClass="orange text-dark"
                        :labelBorder="true"
                        :required="true"
                        :error="error.countInput"
                    />
                </div>
                <div class="types">
                    <div
                        @click="type = 'monster'"
                        style="border: 1px solid rgb(12, 12, 12)"
                        class="round-start"
                        :class="type == 'monster' ? 'monster' : 'orange text-dark'"
                    >
                        Monster
                    </div>
                    <div @click="type = 'spell'" style="border: 1px solid rgb(12, 12, 12)" :class="type == 'spell' ? 'spell' : 'orange text-dark'">
                        Spell
                    </div>
                    <div
                        @click="type = 'trap'"
                        style="border: 1px solid rgb(12, 12, 12)"
                        class="round-end"
                        :class="type == 'trap' ? 'trap' : 'orange text-dark'"
                    >
                        Trap
                    </div>
                </div>
                <div class="properties mt-3">
                    <div
                        @click="properties[0] = !properties[0]"
                        style="border: 1px solid rgb(12, 12, 12)"
                        class="round-start"
                        :class="properties[0] ? 'green text-black' : 'orange text-dark'"
                    >
                        Handtrap
                    </div>
                    <div
                        @click="properties[1] = !properties[1]"
                        style="border: 1px solid rgb(12, 12, 12)"
                        :class="properties[1] ? 'green text-black' : 'orange text-dark'"
                    >
                        Searcher
                    </div>
                    <div
                        @click="properties[2] = !properties[2]"
                        style="border: 1px solid rgb(12, 12, 12)"
                        :class="properties[2] ? 'green text-black' : 'orange text-dark'"
                    >
                        Combo Starter
                    </div>
                    <div
                        @click="properties[3] = !properties[3]"
                        style="border: 1px solid rgb(12, 12, 12)"
                        class="round-end"
                        :class="properties[3] ? 'green text-black' : 'orange text-dark'"
                    >
                        Negate
                    </div>
                </div>
                <div class="properties mt-1">
                    <div
                        @click="properties[4] = !properties[4]"
                        style="border: 1px solid rgb(12, 12, 12)"
                        class="round-start"
                        :class="properties[4] ? 'green text-black' : 'orange text-dark'"
                    >
                        Once per Turn
                    </div>
                    <div
                        @click="properties[5] = !properties[5]"
                        style="border: 1px solid rgb(12, 12, 12)"
                        :class="properties[5] ? 'green text-black' : 'orange text-dark'"
                    >
                        Searchable
                    </div>
                    <div
                        @click="properties[6] = !properties[6]"
                        style="border: 1px solid rgb(12, 12, 12)"
                        :class="properties[6] ? 'green text-black' : 'orange text-dark'"
                    >
                        Combo Piece
                    </div>
                    <div
                        @click="properties[7] = !properties[7]"
                        style="border: 1px solid rgb(12, 12, 12)"
                        class="round-end"
                        :class="properties[7] ? 'green text-black' : 'orange text-dark'"
                    >
                        Interaption
                    </div>
                </div>
                <div class="value mt-3">
                    <div
                        @click="value = -1"
                        style="border: 1px solid rgb(12, 12, 12)"
                        class="round-start"
                        :class="value == -1 ? 'green text-black' : 'orange text-dark'"
                    >
                        -1
                    </div>
                    <div @click="value = 0" style="border: 1px solid rgb(12, 12, 12)" :class="value == 0 ? 'green text-black' : 'orange text-dark'">
                        0
                    </div>
                    <div
                        @click="value = 0.5"
                        style="border: 1px solid rgb(12, 12, 12)"
                        :class="value == 0.5 ? 'green text-black' : 'orange text-dark'"
                    >
                        Maybe +1
                    </div>
                    <div
                        @click="value = 1"
                        style="border: 1px solid rgb(12, 12, 12)"
                        class="round-end"
                        :class="value == 1 ? 'green text-black' : 'orange text-dark'"
                    >
                        1
                    </div>
                </div>
                <br />
                <button type="submit" class="btn w-100 mt-1 orange" @click="editAddCard()">&#10004;</button>
            </div>
        </div>
    </div>
    <!-- new modal -->
    <div id="cardDeleteModal" class="modal">
        <div class="modal-content">
            <div class="container">
                <div class="d-flex justify-content: center mb-1">
                    <div class="w-100 orange text-dark">Are you sure to delete {{ nameInput }}</div>
                </div>
                <div class="deleteModal">
                    <button type="button" class="btn btn-success me-1" style="grid-area: yes" @click="deleteCard(deleteCardId)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path
                                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                            />
                        </svg>
                    </button>
                    <button type="button" class="btn btn-danger" style="grid-area: no" @click="closeCardDeleteModal()">
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
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { decks, deck, uniqueAllCards, searchOnline, safeDeck, findCardByName, mainCardDB } from '@/global'
import * as type from '@/types'
import SexyInput from '../SexyInput.vue'
export default defineComponent({
    components: { SexyInput },
    watch: { deck: 'updateDeck' },
    setup() {
        return { decks, deck, uniqueAllCards, mainCardDB, searchOnline, findCardByName }
    },
    mounted() {
        this.updateDeck()
    },
    data() {
        return {
            allCards: [] as type.Card[],
            deckRating: 0,
            deckValue: 0,
            value: 0,
            deckNumber: 0,
            type: 'monster' as type.CardType,

            properties: [false, false, false, false, false, false, false, false],
            filter: [false, false, false, false, false, false, false, false],
            counts: [0, 0, 0, 0, 0, 0, 0, 0],
            uniqueCounts: [0, 0, 0, 0, 0, 0, 0, 0],

            editCardIndex: 0,
            deleteCardId: 0,

            nameInput: '',
            countInput: '',
            editAdd: '',
            error: {},
        }
    },
    methods: {
        updateDeck() {
            if (this.deck) {
                this.uniqueCardDeck()
                this.countCard()
            }
        },
        editAddCard() {
            this.error = {}
            if (!this.nameInput) this.error.nameInput = 'enter a name'
            if (!this.countInput) this.error.countInput = 'enter a amount'
            if (Object.keys(this.error).length > 0) return
            switch (this.editAdd) {
                case 'add':
                    this.addCard()
                    break
                case 'edit':
                    this.editCard()
                    break
            }
        },
        openCardDeleteModal(name: string) {
            window.onclick = event => {
                if (event.target == document.getElementById('cardDeleteModal')) this.closeCardDeleteModal()
            }
            this.deleteCardId = this.deck.sideCards.findIndex(c => c.name == name)
            this.nameInput = this.deck.sideCards[this.deleteCardId].name
            var modal = document.getElementById('cardDeleteModal')
            if (modal) modal.style.display = 'block'
        },
        closeCardDeleteModal() {
            this.inputReset()
            var modal = document.getElementById('cardDeleteModal')
            if (modal) modal.style.display = 'none'
        },
        openCardAddModal() {
            window.onclick = event => {
                if (event.target == document.getElementById('cardAddEditModal')) this.closeCardAddEditModal()
            }
            this.error = {}
            this.editAdd = 'add'
            var modal = document.getElementById('cardAddEditModal')
            if (modal) modal.style.display = 'block'
        },
        openCardEditModal(name: string) {
            window.onclick = event => {
                if (event.target == document.getElementById('cardAddEditModal')) this.closeCardAddEditModal()
            }
            this.error = {}
            this.editAdd = 'edit'
            this.editCardIndex = this.deck.sideCards.findIndex(c => c.name == name)
            this.nameInput = this.deck.sideCards[this.editCardIndex].name
            this.countInput = this.deck.sideCards[this.editCardIndex].count
            this.properties = this.deck.sideCards[this.editCardIndex].properties
            this.value = this.deck.sideCards[this.editCardIndex].value
            this.type = this.deck.sideCards[this.editCardIndex].type
            var modal = document.getElementById('cardAddEditModal')
            if (modal) modal.style.display = 'block'
        },
        closeCardAddEditModal() {
            this.inputReset()
            var modal = document.getElementById('cardAddEditModal')
            if (modal) modal.style.display = 'none'
        },
        alternativeCheck(card) {
            this.nameInput.trim()
            this.type = card.type
            this.deck.alternativeCards.forEach(card => {
                if (card.name == this.nameInput) {
                    this.type = card.type
                    this.countInput = card.count
                    this.properties = card.properties
                    this.value = card.value
                }
            })
        },
        addCard() {
            this.nameInput.trim()
            if (this.deck.sideCards.length > 2) {
                if (this.deck.sideCards.map(c => c.count).reduce((a, b) => a + b) + this.countInput > 15) {
                    this.deck.alternativeCards = this.deck.alternativeCards.filter(card => card.name != this.nameInput)
                    this.deck.alternativeCards.push({
                        name: this.nameInput,
                        type: this.type,
                        count: parseInt(this.countInput),
                        properties: this.properties,
                        value: this.value,
                        id: Math.random().toString().slice(-15),
                    })
                    safeDeck(this.deck)
                    this.closeCardAddEditModal()
                    return
                }
            }
            if (this.deck.sideCards) {
                this.deck.alternativeCards = this.deck.alternativeCards.filter(card => card.name != this.nameInput)
                if (this.deck.sideCards.findIndex(c => c.name == this.nameInput) == -1) {
                    this.deck.sideCards.push({
                        name: this.nameInput,
                        type: this.type,
                        count: this.countInput,
                        properties: this.properties,
                        value: this.value,
                        id: Math.random().toString(36).slice(),
                    })
                }
                this.uniqueCardDeck()
                this.inputReset()
                this.countCard()
                this.sortDeck()
                safeDeck(this.deck)
                this.closeCardAddEditModal()
            }
        },
        editCard() {
            if (this.deck.sideCards.map(c => c.count).reduce((a, b) => a + b) - this.deck.sideCards[this.editCardIndex].count + this.countInput > 15)
                return this.closeCardAddEditModal()
            this.nameInput.trim()
            this.deck.sideCards[this.editCardIndex] = {
                name: this.nameInput,
                type: this.type,
                count: this.countInput,
                properties: this.properties,
                value: this.value,
                id: this.deck.cards[this.editCardIndex].id,
            }

            this.uniqueCardDeck()
            this.countCard()
            this.sortDeck()
            safeDeck(this.deck)
            this.closeCardAddEditModal()
        },
        inputReset() {
            this.properties = [false, false, false, false, false, false, false, false]
            this.value = 0
            this.editCardIndex = 0
            this.deleteCardId = 0
            this.type = 'monster'
            this.nameInput = ''
            this.countInput = ''
        },
        deleteCard(cardIndex: number) {
            this.deck.alternativeCards.push(this.deck.sideCards[cardIndex])
            this.deck.sideCards.splice(cardIndex, 1)
            this.countCard()
            safeDeck(this.deck)
            this.closeCardDeleteModal()
        },
        countCard() {
            if (this.deck.sideCards) {
                this.deckNumber = 0
                this.counts = [0, 0, 0, 0, 0, 0, 0, 0]
                this.uniqueCounts = [0, 0, 0, 0, 0, 0, 0, 0]
                for (let card of this.deck.sideCards) {
                    this.deckNumber += card.count
                    for (let c in this.counts) {
                        if (card.properties[c]) this.counts[c] += card.count
                    }
                }
                for (let card of this.uniqueAllCards) {
                    for (let c in this.uniqueCounts) {
                        if (card.properties[c]) this.uniqueCounts[c]++
                    }
                }
            }
        },
        uniqueCardDeck() {
            this.allCards = []
            for (let card of this.deck.sideCards) {
                if (!card.src) card.src = mainCardDB.find(e => e.name == card.name)?.src
                let count = card.count
                for (count; count; count--) {
                    this.allCards.push(card)
                }
            }
            this.uniqueAllCards = [...new Set(this.deck.sideCards.filter(c => c.name))]
        },

        sortDeck() {
            this.deck.sideCards
                .sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1
                    }
                    if (a.name > b.name) {
                        return 1
                    }
                    return 0
                })
                .sort(function (a, b) {
                    return b.count - a.count
                })
                .sort(function (a, b) {
                    let map = {
                        monster: 1,
                        spell: 2,
                        trap: 3,
                    }
                    return map[a.type] - map[b.type]
                })
        },
    },
})
</script>
<style lang="scss" scoped>
.cardTable {
    display: grid;
    grid-template-columns: 3fr 3fr 1fr;
}
</style>
