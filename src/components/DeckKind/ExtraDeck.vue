<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />
    <div class="container mt-2">
        <br />
        <div>
            <button type="submit" class="w-100 btn orange" @click="openExtraCardAddModal()">Add new Card</button>
        </div>
        <br />
        <div class="d-flex mb-1">
            <div class="w-25 rounded-start" style="border: 1px solid #ffa107">
                Fusion:
                <br />
                {{ counts[0] }}
            </div>
            <div class="w-25" style="border: 1px solid #ffa107">
                Synchro:
                <br />
                {{ counts[1] }}
            </div>
            <div class="w-25" style="border: 1px solid #ffa107">
                XYZ:
                <br />
                {{ counts[2] }}
            </div>
            <div class="w-25 rounded-end" style="border: 1px solid #ffa107">
                Link:
                <br />
                {{ counts[3] }}
            </div>
        </div>
        <!-- new table -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col" class="w-75" style="text-align: left">Cards</th>
                    <th class="w-25"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="card in deck.extraCards" :key="card.name">
                    <th style="text-align: left" :class="card.type" @dblclick="searchOnline(card.name)">{{ card.name }}({{ card.count }})</th>
                    <td :class="card.type">
                        <button class="me-2" style="background-color: #ffffff00; border: none" @click="openExtraCardEditModal(card.name)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5.5vw" height="5.5vw" class="bi bi-gear" viewBox="0 0 16 16">
                                <path
                                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                                />
                                <path
                                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                                />
                            </svg>
                        </button>
                        <button class="me-2" style="background-color: #ffffff00; border: none" @click="openExtraCardDeleteModal(card.name)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5.5vw" height="5.5vw" class="bi bi-trash" viewBox="0 0 16 16">
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
                </tr>
            </tbody>
        </table>
        <!-- new modal -->
        <div id="extraCardAddEditModal" class="modal">
            <div class="modal-content">
                <span class="close" style="float: right; width: 42px height:42px; margin-left: 95%" @click="closeExtraCardAddEditModal()">
                    &times;
                </span>
                <div class="container">
                    <form @submit.prevent="editAddExtraCard">
                        <div>
                            <SexyInput
                                type="text"
                                placeholder="name"
                                v-model="nameInput"
                                :labelBorder="true"
                                class="orange"
                                labelClass="orange"
                                :required="true"
                            />
                        </div>
                        <div class="mb-3">
                            <SexyInput
                                type="number"
                                placeholder="Quantity"
                                v-model="countInput"
                                oninput="this.value = this.value.replace(/[^1-3.]/g, '').replace(/(\..*)\./g, '$1');"
                                min="1"
                                max="3"
                                maxlength="1"
                                class="orange"
                                labelClass="orange"
                                listClass="orange text-dark"
                                :labelBorder="true"
                                :required="true"
                            />
                        </div>
                        <div class="btn-group w-100 mb-1" role="group" aria-label="Basic radio toggle button group">
                            <input
                                type="radio"
                                class="btn-check"
                                name="type"
                                id="fusionRadioButton"
                                autocomplete="off"
                                @change="type = 'fusion'"
                                :checked="type == 'fusion'"
                            />
                            <label class="btn orange col-4" :class="{ fusion: type == 'fusion' }" for="fusionRadioButton">Fusion</label>
                            <input
                                type="radio"
                                class="btn-check"
                                name="type"
                                id="synchroRadioButton"
                                autocomplete="off"
                                @change="type = 'synchro'"
                                :checked="type == 'synchro'"
                            />
                            <label class="btn orange col-4" :class="{ synchro: type == 'synchro' }" for="synchroRadioButton">Synchro</label>
                            <input
                                type="radio"
                                class="btn-check"
                                name="type"
                                id="xyzRadioButton"
                                autocomplete="off"
                                @change="type = 'xyz'"
                                :checked="type == 'xyz'"
                            />
                            <label class="btn orange col-4" :class="{ xyz: type == 'xyz' }" for="xyzRadioButton">XYZ</label>
                            <input
                                type="radio"
                                class="btn-check"
                                name="type"
                                id="linkRadioButton"
                                autocomplete="off"
                                @change="type = 'link'"
                                :checked="type == 'link'"
                            />
                            <label class="btn orange col-4" :class="{ link: type == 'link' }" for="linkRadioButton">Link</label>
                        </div>
                        <br />
                        <button type="submit" class="btn w-100 mt-1 orange">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
        <!-- new modal -->
        <div id="extraCardDeleteModal" class="modal">
            <div class="modal-content">
                <span class="close" style="float: right; width: 42px height:42px; margin-left: 95%" @click="closeExtraCardDeleteModal()">
                    &times;
                </span>
                <div class="container">
                    <div class="d-flex justify-content: center mb-1">
                        <div class="w-100">Are you sure to delete {{ nameInput }}</div>
                    </div>
                    <div class="d-flex justify-content: center">
                        <button type="button" class="btn btn-success w-50" @click="deleteExtraCard()">Yes</button>
                        <button type="button" class="btn btn-danger w-50" @click="closeExtraCardDeleteModal()">No</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { selectedDeckGlobal, decks, deck, searchOnline } from '@/global'
import * as type from '@/types'
import SexyInput from '../SexyInput.vue'
import { getDecks, getDeck, setDeck, setDecks } from '@/API'
export default defineComponent({
    components: { SexyInput },
    setup() {
        return { selectedDeckGlobal, decks, deck, searchOnline }
    },
    mounted() {
        this.countExtraCards()
        window.onclick = event => {
            if (event.target == document.getElementById('extraCardAddEditModal')) {
                this.closeExtraCardAddEditModal()
            }
            if (event.target == document.getElementById('extraCardDeleteModal')) {
                this.closeExtraCardDeleteModal()
            }
        }
    },
    data() {
        return {
            type: 'fusion',
            nameInput: '',
            countInput: '',
            editCardId: 0,
            deleteCardId: 0,
            editAdd: '',
            counts: [0, 0, 0, 0],
        }
    },
    methods: {
        editAddExtraCard() {
            switch (this.editAdd) {
                case 'add':
                    this.addExtraCard()
                    break
                case 'edit':
                    this.editExtraCard()
                    break
            }
        },
        openExtraCardAddModal() {
            this.editAdd = 'add'
            var modal = document.getElementById('extraCardAddEditModal')
            if (modal) modal.style.display = 'block'
        },
        openExtraCardEditModal(name: string) {
            this.editAdd = 'edit'
            this.editCardId = this.deck.extraCards.findIndex(c => c.name == name)
            this.type = this.deck.extraCards[this.editCardId].type
            this.nameInput = this.deck.extraCards[this.editCardId].name
            this.countInput = JSON.stringify(this.deck.extraCards[this.editCardId].count)
            var modal = document.getElementById('extraCardAddEditModal')
            if (modal) modal.style.display = 'block'
        },
        closeExtraCardAddEditModal() {
            this.reset()
            var modal = document.getElementById('extraCardAddEditModal')
            if (modal) modal.style.display = 'none'
        },
        openExtraCardDeleteModal(name: string) {
            this.deleteCardId = this.deck.extraCards.findIndex(c => c.name == name)
            this.nameInput = this.deck.extraCards[this.deleteCardId].name
            var modal = document.getElementById('extraCardDeleteModal')
            if (modal) modal.style.display = 'block'
        },
        closeExtraCardDeleteModal() {
            var modal = document.getElementById('extraCardDeleteModal')
            if (modal) modal.style.display = 'none'
        },
        addExtraCard() {
            if (this.deck.extraCards.findIndex(c => c.name == this.nameInput) != -1) return this.closeExtraCardAddEditModal()
            if (this.counts.reduce((a, b) => a + b) + parseInt(this.countInput) > 15) return this.closeExtraCardAddEditModal()

            this.deck.extraCards.push({
                name: this.nameInput,
                count: parseInt(this.countInput),
                type: this.type as type.ExtraCardType,
                id: Math.random().toString(36).slice(-15),
            })
            this.countExtraCards()
            this.safeDeck()
            this.closeExtraCardAddEditModal()
        },
        editExtraCard() {
            if (this.counts.reduce((a, b) => a + b) - this.deck.extraCards[this.editCardId].count + parseInt(this.countInput) > 15)
                return this.closeExtraCardAddEditModal()
            this.deck.extraCards[this.editCardId] = {
                name: this.nameInput,
                count: parseInt(this.countInput),
                type: this.type as type.ExtraCardType,
                id: this.deck.extraCards.find(c => c.name == this.nameInput)?.id || Math.random().toString(36).slice(-15),
            }
            this.countExtraCards()
            this.safeDeck()
            this.closeExtraCardAddEditModal()
        },
        deleteExtraCard() {
            this.deck.extraCards.splice(this.deleteCardId, 1)
            this.safeDeck()
            this.closeExtraCardDeleteModal()
        },
        countExtraCards() {
            if (!this.deck) return
            this.counts = [0, 0, 0, 0]
            for (let card of this.deck.extraCards) {
                switch (card.type) {
                    case 'fusion':
                        this.counts[0] += card.count
                        break
                    case 'synchro':
                        this.counts[1] += card.count
                        break
                    case 'xyz':
                        this.counts[2] += card.count
                        break
                    case 'link':
                        this.counts[3] += card.count
                        break
                }
            }
        },
        reset() {
            this.type = 'fusion'
            this.nameInput = ''
            this.countInput = ''
        },
        safeDeck() {
            this.decks[this.decks.findIndex(d => d.name == this.deck.name)] = this.deck
            setDeck(this.deck)
            setDecks(this.decks)
        },
    },
})
</script>
