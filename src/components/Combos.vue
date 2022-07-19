<template>
    <div class="container" style="margin-top: 3vh">
        <div>
            <button type="button" class="w-100 btn orange round" @click="openComboAddModal()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </button>
        </div>
        <br />

        <!-- new table -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="w-25">active Combos</th>
                    <th class="w-25"></th>
                    <th class="w-75">Cards</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="combo in deck.combos.filter(c => c.active)" :key="combo">
                    <td>
                        {{ deck.combos.findIndex(c => c == combo) + 1 }}
                    </td>
                    <td>
                        <button
                            @click="openComboEditModal(deck.combos.findIndex(c => c == combo))"
                            class="me-2"
                            style="background-color: #ffffff00; border: none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="bi bi-gear" viewBox="0 0 16 16">
                                <path
                                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                                />
                                <path
                                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                                />
                            </svg>
                        </button>
                        <button
                            @click="openComboDeleteModal(deck.combos.findIndex(c => c == combo))"
                            class="me-2"
                            style="background-color: #ffffff00; border: none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                            </svg>
                        </button>
                    </td>
                    <td>
                        <div
                            v-for="card in combo.cards"
                            :key="card"
                            class="mb-1 green"
                            :class="findCard(card)?.type"
                            @dblclick="typeof card !== 'object' ? searchOnline(findCard(card)?.name) : null"
                        >
                            {{ findCard(card)?.name || findCardGroup(card)?.name }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="w-25">not active Combos</th>
                    <th class="w-25"></th>
                    <th class="w-75">Cards</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="combo in deck.combos.filter(c => !c.active)" :key="combo">
                    <td>
                        {{ deck.combos.findIndex(c => c == combo) + 1 }}
                    </td>
                    <td>
                        <button
                            @click="openComboEditModal(deck.combos.findIndex(c => c == combo))"
                            class="me-2"
                            style="background-color: #ffffff00; border: none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="bi bi-gear" viewBox="0 0 16 16">
                                <path
                                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                                />
                                <path
                                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                                />
                            </svg>
                        </button>
                        <button
                            @click="openComboDeleteModal(deck.combos.findIndex(c => c == combo))"
                            class="me-2"
                            style="background-color: #ffffff00; border: none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                            </svg>
                        </button>
                    </td>
                    <td>
                        <div
                            v-for="card in combo.cards"
                            :key="card"
                            class="mb-1 green"
                            :class="findCard(card)?.type"
                            @dblclick="typeof card !== 'object' ? searchOnline(findCard(card)?.name) : null"
                        >
                            {{ findCard(card)?.name || findCardGroup(card)?.name }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- new modal -->
    <div id="comboAddEditModal" class="modal">
        <div class="modal-content">
            <div class="container">
                <div class="d-flex justify-content: center">
                    <div class="w-100">
                        <div v-for="cardNumber of 5" :key="cardNumber">
                            <SexyInput
                                :placeholder="`${cardNumber}.Card`"
                                v-model="comboCards[cardNumber - 1]"
                                type="select"
                                :class="comboCardsType[cardNumber - 1] || 'orange'"
                                :label-class="comboCardsType[cardNumber - 1] || 'orange'"
                                :label-border="true"
                                @change="changeType()"
                                :options="deck.cards.concat(deck.cardGroups)"
                                :option-projection="a => a.name"
                                @selectItem="changeType()"
                                :listItemClass="item => (findCardGroupByName(item) ? 'green' : findCardByName(item)?.type || 'orange text-dark')"
                            />
                        </div>
                    </div>
                </div>

                <button type="button" class="btn orange w-100 mt-1" @click="addCombo()">Confirm</button>
            </div>
        </div>
    </div>
    <!-- new modal -->
    <div id="comboDeleteModal" class="modal">
        <div class="modal-content">
            <div class="container">
                <div class="d-flex justify-content: center mb-1">
                    <div class="w-25"></div>
                    <div class="w-50 orange text-dark">Are you sure to delete {{ nameInput }}</div>
                </div>
                <div class="deleteModal">
                    <button type="button" class="btn btn-success me-1" style="grid-area: yes" @click="deleteCombo(deleteCardId)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path
                                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                            />
                        </svg>
                    </button>
                    <button type="button" class="btn btn-danger" style="grid-area: no" @click="closeComboDeleteModal()">
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
import {
    selectedDeckGlobal,
    decks,
    deck,
    uniqueAllCards,
    findCard,
    findCardByName,
    findCardGroup,
    findCardGroupByName,
    searchOnline,
    setHTMLClass,
} from '@/global'
import * as type from '@/types'
import { getDecks, getDeck, setDecks, setDeck } from '@/API'
import SexyInput from '../components/SexyInput.vue'
export default defineComponent({
    components: { SexyInput },
    setup() {
        return { selectedDeckGlobal, decks, deck, uniqueAllCards, findCard, findCardByName, findCardGroup, findCardGroupByName, searchOnline }
    },
    mounted() {
        setHTMLClass('Combos')
    },
    data() {
        return {
            editAdd: 'add',
            editComboIndex: 0,
            deleteComboIndex: 0,
            comboCards: ['', '', '', '', ''] as any[],
            comboCardsType: [] as string[],
        }
    },
    methods: {
        openComboAddModal() {
            window.onclick = event => {
                if (event.target == document.getElementById('comboAddEditModal')) this.closeComboAddEditModal()
            }
            this.editAdd = 'add'
            var modal = document.getElementById('comboAddEditModal')
            if (modal) modal.style.display = 'block'
        },
        closeComboAddEditModal() {
            this.inputReset()
            var modal = document.getElementById('comboAddEditModal')
            if (modal) modal.style.display = 'none'
        },
        openComboEditModal(index: number) {
            window.onclick = event => {
                if (event.target == document.getElementById('comboAddEditModal')) this.closeComboAddEditModal()
            }
            this.editAdd = 'edit'
            this.editComboIndex = index
            for (let card of this.deck.combos[index].cards) {
                this.comboCards[this.deck.combos[index].cards.findIndex(c => c == card)] = this.findCard(card)?.name || this.findCardGroup(card)?.name
            }
            this.changeType()
            var modal = document.getElementById('comboAddEditModal')
            if (modal) modal.style.display = 'block'
        },
        openComboDeleteModal(index: number) {
            window.onclick = event => {
                if (event.target == document.getElementById('comboDeleteModal')) this.closeComboDeleteModal()
            }
            this.deleteComboIndex = index
            var modal = document.getElementById('comboDeleteModal')
            if (modal) modal.style.display = 'block'
        },
        closeComboDeleteModal() {
            this.inputReset()
            var modal = document.getElementById('comboDeleteModal')
            if (modal) modal.style.display = 'none'
        },
        addCombo() {
            let cardArray = [] as string[]
            for (let i = 0; i < 5; i++) {
                if (this.deck.cardGroups.map(e => e.name).includes(this.comboCards[i])) {
                    cardArray.push(this.findCardGroupByName(this.comboCards[i]).id)
                } else {
                    if (this.comboCards[i]) {
                        let card = this.deck.cards.find(c => c.name == this.comboCards[i])
                        if (card) {
                            cardArray.push(card.id)
                        }
                    }
                }
            }
            if (cardArray.length) {
                switch (this.editAdd) {
                    case 'add':
                        this.deck.combos.push({ cards: cardArray, active: true } as type.Combo)
                        break
                    case 'edit':
                        this.deck.combos[this.editComboIndex] = {
                            cards: cardArray,
                            active: this.deck.combos[this.editComboIndex].active,
                        } as type.Combo
                        break
                }
            }
            this.checkComboCardGroups()
            this.safeDeck()
            this.closeComboAddEditModal()
        },
        deleteCombo() {
            this.deck.combos.splice(this.deleteComboIndex, 1)
            this.safeDeck()
            this.closeComboDeleteModal()
        },
        inputReset() {
            this.comboCards = ['', '', '', '', '']
            this.changeType()
        },
        safeDeck() {
            this.decks[this.decks.findIndex(d => d.name == this.deck.name)] = this.deck
            setDeck(this.deck)
            setDecks(this.decks)
        },
        changeType() {
            for (let i = 0; i < 5; i++) {
                let card = this.deck.cards.find(c => c.name == this.comboCards[i])
                card
                    ? (this.comboCardsType[i] = card.type)
                    : findCardGroupByName(this.comboCards[i])
                    ? (this.comboCardsType[i] = 'green')
                    : (this.comboCardsType[i] = '')
            }
        },
        checkComboCardGroups() {
            for (let cardGroup of this.deck.cardGroups) {
                cardGroup.active = cardGroup.cards.some(cardId => this.deck.cards.map(c => c.id).includes(cardId))
            }
            for (let combo of this.deck.combos) {
                combo.active = combo.cards.every(card =>
                    this.deck.cardGroups.map(e => e.id).includes(card)
                        ? this.deck.cardGroups.find(c => c.id == card)?.active
                        : this.deck.cards.map(c => c.id).includes(card)
                )
            }
        },
    },
})
</script>
