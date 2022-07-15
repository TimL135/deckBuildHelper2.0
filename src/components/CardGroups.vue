<template>
    <div class="container" style="margin-top: 3vh">
        <div>
            <button type="button" class="w-100 btn orange" @click="openCardGroupAddModal()">Add new Cardgroup</button>
        </div>
        <br />
        <!-- new table -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="w-25">active Cardgroups</th>
                    <th class="w-25"></th>
                    <th class="w-75">Cards</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cardGroup in deck.cardGroups.filter(c => c.active)" :key="cardGroup.name">
                    <td>{{ cardGroup.name }}</td>
                    <td>
                        <button
                            @click="openCardGroupEditModal(deck.cardGroups.findIndex(c => c == cardGroup))"
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
                            @click="openCardGroupDeleteModal(deck.cardGroups.findIndex(c => c == cardGroup))"
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
                        <div v-for="card in cardGroup.cards" :key="card" class="mb-1" :class="deck.cards.find(c => c.id == card)?.type">
                            {{ findCard(card)?.name }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="w-25">not active Cardgroups</th>
                    <th class="w-25"></th>
                    <th class="w-75">Cards</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cardGroup in deck.cardGroups.filter(c => !c.active)" :key="cardGroup.name">
                    <td>{{ cardGroup.name }}</td>
                    <td>
                        <button
                            @click="openCardGroupEditModal(deck.cardGroups.findIndex(c => c == cardGroup))"
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
                            @click="openCardGroupDeleteModal(deck.cardGroups.findIndex(c => c == cardGroup))"
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
                        <div v-for="card in cardGroup.cards" :key="card" class="mb-1" :class="deck.cards.find(c => c.id == card)?.type">
                            {{ findCard(card)?.name }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- new modal -->
    <div id="cardGroupAddEditModal" class="modal">
        <div class="modal-content">
            <span class="close" style="float: right; width: 42px height:42px; margin-left: 95%" @click="closeCardGroupAddEditModal()">&times;</span>

            <form @submit.prevent="editAddCard()">
                <div class="mb-1">
                    <SexyInput
                        type="text"
                        placeholder="name"
                        v-model="cardGroupNameInput"
                        :labelBorder="true"
                        class="orange"
                        labelClass="orange"
                        :required="true"
                    />
                </div>
                <div v-for="cardInput in this.cardInputs.length" :key="cardInput">
                    <select
                        class="form-select mb-1"
                        :class="cardInputTypes[cardInput - 1]"
                        v-model="cardInputs[cardInput - 1]"
                        @change="checkCardInputs()"
                    >
                        <option class="orange" selected>{{ cardInput }}. Card</option>
                        <option v-for="card in uniqueAllCards" :key="card.name" :class="card.type" :value="card.id">
                            {{ card.name }}
                        </option>
                    </select>
                </div>
                <button type="submit" class="btn orange w-100 mt-1" style="float: right">Confirm</button>
            </form>
        </div>
    </div>
    <!-- new modal -->
    <div id="cardGroupDeleteModal" class="modal">
        <div class="modal-content">
            <span class="close" style="float: right; width: 42px height:42px; margin-left: 95%" @click="closeCardGroupDeleteModal()">&times;</span>
            <div class="container">
                <div class="d-flex justify-content: center">
                    <div class="w-100 mb-1">Are you sure to delete Cardgroup {{ deleteCardGroupName }}</div>
                </div>
                <div class="d-flex justify-content: center">
                    <button type="button" class="btn btn-success w-50" @click="deleteCardGroup(deleteCardGroupIndex)">Yes</button>
                    <button type="button" class="btn btn-danger w-50" @click="closeCardGroupDeleteModal()">No</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { setDecks, setDeck } from '@/API'
import * as type from '@/types'
import { selectedDeckGlobal, decks, deck, uniqueAllCards, findCard } from '@/global'
import { defineComponent } from 'vue'
import SexyInput from '../components/SexyInput.vue'
export default defineComponent({
    components: { SexyInput },
    setup() {
        return { selectedDeckGlobal, decks, deck, uniqueAllCards, findCard }
    },
    mounted() {
        window.addEventListener('click', event => {
            if (event.target == document.getElementById('cardGroupAddEditModal')) {
                this.closeCardGroupAddEditModal()
            }
            if (event.target == document.getElementById('cardGroupDeleteModal')) {
                this.closeCardGroupDeleteModal()
            }
        })
    },
    data() {
        return {
            deleteCardGroupIndex: 0,
            editCardGroupIndex: 0,
            deleteCardGroupName: '',
            cardGroupNameInput: '',
            editAdd: '',
            cardInputs: ['1. Card'] as string[],
            cardInputTypes: [] as string[],
        }
    },
    methods: {
        editAddCard() {
            switch (this.editAdd) {
                case 'add':
                    this.addCardGroup()
                    break
                case 'edit':
                    this.editCardGroup()
                    break
            }
        },
        openCardGroupAddModal() {
            this.editAdd = 'add'
            var modal = document.getElementById('cardGroupAddEditModal')
            if (modal) modal.style.display = 'block'
        },
        closeCardGroupAddEditModal() {
            if (this.deck.cardGroups.length) {
                while (this.deck.cardGroups[this.editCardGroupIndex].cards.slice(-1).join().includes('. Card')) {
                    this.deck.cardGroups[this.editCardGroupIndex].cards.pop()
                }
                if (!this.deck.cardGroups[this.editCardGroupIndex].cards.length) {
                    this.deck.cardGroups.splice(this.editCardGroupIndex, 1)
                }
            }
            this.inputReset()
            this.changeType()
            var modal = document.getElementById('cardGroupAddEditModal')
            if (modal) modal.style.display = 'none'
        },
        openCardGroupEditModal(index: number) {
            this.editAdd = 'edit'
            this.editCardGroupIndex = index
            this.cardGroupNameInput = this.deck.cardGroups[index].name
            this.cardInputs = this.deck.cardGroups[index].cards
            this.cardInputs.push(`${this.cardInputs.length + 1}. Card`)
            this.changeType()
            var modal = document.getElementById('cardGroupAddEditModal')
            if (modal) modal.style.display = 'block'
        },
        addCardGroup() {
            let copieCardInputs = [...this.cardInputs]
            copieCardInputs.pop()
            while (this.cardGroupNameInput.endsWith(' ')) this.cardGroupNameInput = this.cardGroupNameInput.slice(0, -1)
            if (copieCardInputs.length) {
                this.deck.cardGroups.push({
                    name: this.cardGroupNameInput,
                    cards: copieCardInputs,
                    id: Math.random().toString(36).slice(-15),
                    active: true,
                })
            }
            this.closeCardGroupAddEditModal()
            this.safeDeck()
        },
        editCardGroup() {
            let tmp = [...this.cardInputs]
            tmp.pop()
            while (this.cardGroupNameInput.endsWith(' ')) this.cardGroupNameInput = this.cardGroupNameInput.slice(0, -1)
            for (let combo of this.deck.combos) {
                let comboIndex = this.deck.combos.findIndex(c => c == combo)
                if (combo.cards.findIndex(c => (typeof c === 'object' ? c.name == this.deck.cardGroups[this.editCardGroupIndex].name : null)) != -1) {
                    combo.cards[
                        combo.cards.findIndex(c => (typeof c === 'object' ? c.name == this.deck.cardGroups[this.editCardGroupIndex].name : null))
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                    ].name = this.cardGroupNameInput
                }
                this.deck.combos[comboIndex] = combo
            }

            if (tmp.length) this.deck.cardGroups[this.editCardGroupIndex].cards = tmp
            this.deck.cardGroups[this.editCardGroupIndex].name = this.cardGroupNameInput

            this.closeCardGroupAddEditModal()
            this.checkComboCardGroups()
            this.inputReset()
            this.checkCardInputs()
            this.safeDeck()
        },
        openCardGroupDeleteModal(index: number) {
            this.deleteCardGroupName = this.deck.cardGroups[index].name
            this.deleteCardGroupIndex = index
            var modal = document.getElementById('cardGroupDeleteModal')
            if (modal) modal.style.display = 'block'
        },
        closeCardGroupDeleteModal() {
            this.inputReset()
            var modal = document.getElementById('cardGroupDeleteModal')
            if (modal) modal.style.display = 'none'
        },
        deleteCardGroup() {
            this.deck.cardGroups.splice(this.deleteCardGroupIndex, 1)
            this.safeDeck()
            this.closeCardGroupDeleteModal()
        },
        checkCardInputs() {
            this.cardInputs = this.cardInputs.filter(c => !c.includes('. Card'))
            this.cardInputs.push(`${this.cardInputs.length + 1}. Card`)
            this.changeType()
        },
        safeDeck() {
            this.decks[this.decks.findIndex(d => d.name == this.deck.name)] = this.deck
            setDeck(this.deck)
            setDecks(this.decks)
        },
        inputReset() {
            this.cardGroupNameInput = ''
            this.cardInputs = ['1. Card']
        },
        changeType() {
            this.cardInputTypes = []
            for (let i = 0; i < this.cardInputs.length - 1; i++) {
                let card = this.deck.cards.find(c => c.id == this.cardInputs[i])
                card ? (this.cardInputTypes[i] = card.type) : (this.cardInputTypes[i] = '')
            }
        },
        checkComboCardGroups() {
            for (let cardGroup of this.deck.cardGroups) {
                cardGroup.active = cardGroup.cards.some(cardId => this.deck.cards.map(c => c.id).includes(cardId))
            }
            for (let combo of this.deck.combos) {
                combo.active = combo.cards.every(card =>
                    typeof card === 'object' ? this.deck.cardGroups.find(c => c.id == card.id)?.active : this.deck.cards.map(c => c.id).includes(card)
                )
            }
        },
    },
})
</script>
