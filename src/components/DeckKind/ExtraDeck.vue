<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />
    <div class="container mt-2">
        <div class="d-flex mb-1">
            <div class="w-25 round-start" style="border: 1px solid #ffa107">
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
            <div class="w-25 round-end" style="border: 1px solid #ffa107">
                Link:
                <br />
                {{ counts[3] }}
            </div>
        </div>
        <br />
        <div>
            <button type="button" class="w-100 btn orange round" @click="openExtraCardAddModal()">
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
                <div class="container">
                    <form @submit.prevent="editAddExtraCard">
                        <div>
                            <SexyInput
                                @change="alternativeCheck"
                                :onSelectItem="alternativeCheck"
                                type="select"
                                placeholder="name"
                                v-model="nameInput"
                                :options="
                                    deck.alternativeExtraCards
                                        .map(e =>
                                            Object.fromEntries([
                                                ['name', e.name],
                                                ['type', e.type],
                                            ])
                                        )
                                        .concat(extraCardDB)
                                "
                                :option-projection="e => e.name"
                                :labelBorder="true"
                                :selectOnBlur="true"
                                :controlInput="false"
                                :noElementMessage="deck.alternativeExtraCards?.length ? nameInput : nameInput ? nameInput : 'no alternative cards'"
                                class="orange"
                                labelClass="orange"
                                listClass="orange text-dark"
                                :listItemClass="item => item.type || 'orange text-dark'"
                                :required="true"
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
                            />
                        </div>
                        <div class="extraTypes">
                            <div @click="type = 'fusion'" class="round-start" :class="type == 'fusion' ? 'fusion' : 'orange text-dark'">Fusion</div>
                            <div @click="type = 'synchro'" :class="type == 'synchro' ? 'synchro' : 'orange text-dark'">Synchro</div>
                            <div @click="type = 'xyz'" :class="type == 'xyz' ? 'xyz' : 'orange text-dark'">XYZ</div>
                            <div @click="type = 'link'" class="round-end" :class="type == 'link' ? 'link' : 'orange text-dark'">Link</div>
                        </div>
                        <br />
                        <button type="submit" class="btn w-100 mt-1 orange round">&#10004;</button>
                    </form>
                </div>
            </div>
        </div>
        <!-- new modal -->
        <div id="extraCardDeleteModal" class="modal">
            <div class="modal-content">
                <div class="container">
                    <div class="d-flex justify-content: center mb-1">
                        <div class="w-100 orange text-dark">Are you sure to delete {{ nameInput }}</div>
                    </div>
                    <div class="deleteModal">
                        <button type="button" class="btn btn-success me-1" style="grid-area: yes" @click="deleteExtraCard()">
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
                        <button type="button" class="btn btn-danger" style="grid-area: no" @click="closeExtraCardDeleteModal()">
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
import { decks, deck, searchOnline, safeDeck, findCardByName, extraCardDB } from '@/global'
import * as type from '@/types'
import SexyInput from '../SexyInput.vue'
export default defineComponent({
    components: { SexyInput },
    watch: { deck: 'updateDeck' },
    setup() {
        return { decks, deck, searchOnline, findCardByName, extraCardDB }
    },
    mounted() {
        this.countExtraCards()
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
            window.onclick = event => {
                if (event.target == document.getElementById('extraCardAddEditModal')) this.closeExtraCardAddEditModal()
            }
            this.editAdd = 'add'
            var modal = document.getElementById('extraCardAddEditModal')
            if (modal) modal.style.display = 'block'
        },
        openExtraCardEditModal(name: string) {
            window.onclick = event => {
                if (event.target == document.getElementById('extraCardAddEditModal')) this.closeExtraCardAddEditModal()
            }
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
            window.onclick = event => {
                if (event.target == document.getElementById('extraCardDeleteModal')) this.closeExtraCardDeleteModal()
            }
            this.deleteCardId = this.deck.extraCards.findIndex(c => c.name == name)
            this.nameInput = this.deck.extraCards[this.deleteCardId].name
            var modal = document.getElementById('extraCardDeleteModal')
            if (modal) modal.style.display = 'block'
        },
        closeExtraCardDeleteModal() {
            var modal = document.getElementById('extraCardDeleteModal')
            if (modal) modal.style.display = 'none'
        },
        alternativeCheck(card) {
            this.nameInput.trim()
            this.type = card.type
            this.deck.alternativeExtraCards.forEach(card => {
                if (card.name == this.nameInput) {
                    this.type = card.type
                    this.countInput = card.count
                }
            })
        },
        addExtraCard() {
            this.nameInput.trim()
            if (this.deck.alternativeExtraCards)
                this.deck.alternativeExtraCards = this.deck.alternativeExtraCards.filter(card => card.name != this.nameInput)
            if (this.deck.extraCards.findIndex(c => c.name == this.nameInput) != -1) return this.closeExtraCardAddEditModal()
            if (this.counts.reduce((a, b) => a + b) + parseInt(this.countInput) > 15) {
                this.deck.alternativeExtraCards.push({
                    name: this.nameInput,
                    type: this.type,
                    count: parseInt(this.countInput),
                    id: Math.random().toString().slice(-15),
                })
                safeDeck(this.deck)
                this.closeExtraCardAddEditModal()
                return
            }
            this.deck.extraCards.push({
                name: this.nameInput,
                count: parseInt(this.countInput),
                type: this.type as type.ExtraCardType,
                id: Math.random().toString().slice(-15),
            })
            this.countExtraCards()
            this.sortDeck()
            safeDeck(this.deck)
            this.closeExtraCardAddEditModal()
        },
        editExtraCard() {
            if (this.counts.reduce((a, b) => a + b) - this.deck.extraCards[this.editCardId].count + parseInt(this.countInput) > 15)
                return this.closeExtraCardAddEditModal()
            this.nameInput.trim()
            this.deck.extraCards[this.editCardId] = {
                name: this.nameInput,
                count: parseInt(this.countInput),
                type: this.type as type.ExtraCardType,
                id: this.deck.extraCards.find(c => c.name == this.nameInput)?.id,
            }
            this.countExtraCards()
            this.sortDeck()
            safeDeck(this.deck)
            this.closeExtraCardAddEditModal()
        },
        deleteExtraCard() {
            if (this.deck.alternativeExtraCards) {
                this.deck.alternativeExtraCards.push(this.deck.extraCards[this.deleteCardId])
            } else {
                this.deck.alternativeExtraCards = [this.deck.extraCards[this.deleteCardId]]
            }

            this.deck.extraCards.splice(this.deleteCardId, 1)
            this.countExtraCards()
            safeDeck(this.deck)
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
        sortDeck() {
            this.deck.extraCards
                .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                .sort((a, b) => b.count - a.count)
                .sort(function (a, b) {
                    let map = {
                        fusion: 1,
                        synchro: 2,
                        xyz: 3,
                        link: 4,
                    }
                    return map[a.type] - map[b.type]
                })
        },
    },
})
</script>
