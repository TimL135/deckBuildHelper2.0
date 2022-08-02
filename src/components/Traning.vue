<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />

    <div class="mx-3">
        <div class="header sticky">
            <div style="grid-area: switch" @click="switchSite()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                    <path
                        fill-rule="evenodd"
                        d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                </svg>
            </div>
            <div style="grid-area: special" @click="specialAction('view')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16">
                    <path
                        d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"
                    />
                </svg>
            </div>
            <div style="grid-area: undo" @click="previousStep()" v-if="log.length > 0">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-left-square"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path d="M10.205 12.456A.5.5 0 0 0 10.5 12V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4a.5.5 0 0 0 .537.082z" />
                </svg>
            </div>
            <div @click="resetSelect()" style="grid-area: text1">
                {{ selectedCard ? `selected card: ${findCard(selectedCard)?.name}(${selectedFrom})` : 'no card selected' }}
            </div>
            <div style="grid-area: text2">
                {{ view ? `view: ${view == 'slot' ? selectedFrom : view}` : 'no view' }}
            </div>
            <div style="grid-area: target" v-if="selectedCard" class="orange text-dark round text-center" @click="targetCard()">target</div>
            <div style="grid-area: effect" v-if="selectedCard" class="orange text-dark round text-center" @click="activeEffect()">effect</div>
            <div class="d-flex flex-row-reverse mb-3" style="grid-area: settings">
                <button class="me-2" style="background-color: #ffffff00; border: none" @click="openEditSettingsModal()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="5.5vw" height="5.5vw" class="bi bi-gear" viewBox="0 0 16 16" stroke="#ffa107">
                        <path
                            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                        />
                        <path
                            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <Field
            :field="field"
            :all-cards="allCards"
            :all-extra-cards="allExtraCards"
            :banish="banish"
            :grave-yard="graveYard"
            :player-site="playerSite"
            @selectSlot="slot => selectSlot(slot)"
        />
        <div @click="addHandCard" @dblclick="draw">handcards</div>
        <div class="startHand mb-3">
            <div
                v-for="(card, index) of handCards"
                :key="card + index"
                style="border: 2px solid rgb(12, 12, 12)"
                @click="selectCard(card, 'hand')"
                @dblclick="searchOnline(findCard(card)?.name)"
            >
                <div v-if="!hide">
                    <img
                        v-if="navigator.onLine && findCard(card)?.src"
                        style="height: 5rem"
                        :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${findCard(card)?.src}.jpg`"
                        alt=""
                    />
                    <div v-else>{{ findCard(card)?.name }}</div>
                </div>
                <div v-else>
                    <img style="height: 5rem" src="../../public/img/cards/cardBackside.png" alt="" />
                </div>
            </div>
        </div>
        <div v-if="view == 'deck'">
            <div>deck</div>
            <div class="deck">
                <div
                    v-for="card of allCards"
                    :key="card"
                    style="border: 2px solid rgb(12, 12, 12)"
                    @click="selectCard(card, 'deck')"
                    @dblclick="searchOnline(findCard(card)?.name)"
                >
                    <img
                        v-if="navigator.onLine && findCard(card)?.src"
                        style="height: 5rem"
                        :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${findCard(card)?.src}.jpg`"
                        alt=""
                    />
                    <div v-else>{{ findCard(card)?.name }}</div>
                </div>
            </div>
        </div>
        <div v-if="view == 'extradeck'">
            <div>extradeck</div>
            <div class="deck">
                <div
                    v-for="card of allExtraCards"
                    :key="card"
                    style="border: 2px solid rgb(12, 12, 12)"
                    @click="selectCard(card, 'extradeck')"
                    @dblclick="searchOnline(findCard(card)?.name)"
                >
                    <img
                        v-if="navigator.onLine && findCard(card)?.src"
                        style="height: 5rem"
                        :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${findCard(card)?.src}.jpg`"
                        alt=""
                    />
                    <div v-else>{{ findCard(card)?.name }}</div>
                </div>
            </div>
        </div>
        <div v-if="view == 'graveyard'">
            <div>graveyard</div>
            <div class="deck">
                <div
                    v-for="card of graveYard"
                    :key="card"
                    style="border: 2px solid rgb(12, 12, 12)"
                    @click="selectCard(card, 'graveyard')"
                    @dblclick="searchOnline(findCard(card)?.name)"
                >
                    <img
                        v-if="navigator.onLine && findCard(card)?.src"
                        style="height: 5rem"
                        :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${findCard(card)?.src}.jpg`"
                        alt=""
                    />
                    <div v-else>{{ findCard(card)?.name }}</div>
                </div>
            </div>
        </div>
        <div v-if="view == 'banish'">
            <div>banish</div>
            <div class="deck">
                <div
                    v-for="card of banish"
                    :key="card"
                    style="border: 2px solid rgb(12, 12, 12)"
                    @click="selectCard(card, 'banish')"
                    @dblclick="searchOnline(findCard(card)?.name)"
                >
                    <img
                        v-if="navigator.onLine && findCard(card)?.src"
                        style="height: 5rem"
                        :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${findCard(card)?.src}.jpg`"
                        alt=""
                    />
                    <div v-else>{{ findCard(card)?.name }}</div>
                </div>
            </div>
        </div>
        <div v-if="view == 'slot'">
            <div>{{ selectedFrom }}</div>
            <div class="deck">
                <div
                    v-for="card of selectedSlotValue"
                    :key="card"
                    style="border: 2px solid rgb(12, 12, 12)"
                    @click="selectCard(findCardByName(card)?.id, selectedFrom)"
                    @dblclick="searchOnline(card)"
                >
                    <img
                        v-if="navigator.onLine && findCardByName(card)?.src"
                        style="height: 5rem"
                        :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${findCardByName(card)?.src}.jpg`"
                        alt=""
                    />
                    <div v-else>{{ findCardByName(card)?.name }}</div>
                </div>
            </div>
        </div>
        <div v-if="view == 'special'">
            <div>Special</div>
            <div class="special">
                <div class="orange text-dark me-1" @click="specialAction('pendel')">pendel</div>
                <div class="orange text-dark me-1" @click="specialAction('token')">token</div>
                <div class="orange text-dark me-1" @click="specialAction('addCard')">add card</div>
                <div class="orange text-dark me-1" @click="specialAction('hide')">{{ hide ? 'show' : 'hide' }}</div>
                <div
                    class="orange text-dark me-1"
                    @click="specialAction('set')"
                    v-if="selectedFrom.includes('monster') || selectedFrom.includes('spell') || selectedFrom.includes('extra')"
                >
                    {{ field.find(e => e.name == selectedFrom)?.hide ? 'flip' : 'set' }}
                </div>
                <div
                    class="orange text-dark"
                    @click="specialAction('pos')"
                    v-if="selectedFrom.includes('monster') || selectedFrom.includes('spell') || selectedFrom.includes('extra')"
                >
                    {{ field.find(e => e.name == selectedFrom)?.def ? 'atk' : 'def' }}
                </div>
            </div>
        </div>
    </div>
    <!-- new modal -->
    <div id="editSettingsModal" class="modal">
        <div class="modal-content">
            <div class="container">
                <div class="d-flex justify-content: center mb-1">
                    <div class="w-100">
                        <div class="mb-1">
                            <button @click="reset()" type="button" class="btn orange w-100 round mt-1">Reset</button>
                        </div>
                        <div class="mb-3">
                            <button @click="changeStartHand()" type="button" class="btn orange w-100 round mt-1">{{ startHand }}</button>
                        </div>
                        <div v-if="startHand == 'custom'">
                            <SexyInput
                                type="multiSelect"
                                placeholder="cards"
                                v-model="cardInput"
                                :options="allCardsSelect.map(e => findCard(e)?.name)"
                                class="orange"
                                labelClass="orange"
                                :label-border="true"
                                :listItemClass="item => findCardByName(item)?.type || 'orange text-dark'"
                                :multiSelect="cardInputs"
                                :multiSelectClass="e => findCardByName(e).type"
                                @selectItem="
                                    a => {
                                        cardInputs.push(a)
                                        cardInput = ''
                                    }
                                "
                                @deleteItem="
                                    index => {
                                        cardInputs = cardInputs.filter((v, i) => i != index)
                                    }
                                "
                            />
                        </div>
                        <div v-if="log.length" class="mt-3">
                            <form @submit.prevent="saveLog()">
                                <div>
                                    <SexyInput
                                        type="text"
                                        placeholder="log name"
                                        v-model="logName"
                                        class="orange"
                                        label-class="orange"
                                        :label-border="true"
                                        btn-text="save"
                                        btn-class="orange"
                                        btn-type="submit"
                                        :required="true"
                                    />
                                </div>
                            </form>
                            <div v-for="(action, index) of log" :key="action + index" class="orange text-dark round mt-1">
                                {{ actionToText(action) }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content: center"></div>
            </div>
        </div>
    </div>
    <!-- new modal -->
    <div id="addCardModal" class="modal">
        <div class="modal-content">
            <div class="container">
                <div class="d-flex justify-content: center mb-1">
                    <div class="w-100">
                        <div class="mb-1">
                            <div>
                                <SexyInput
                                    type="select"
                                    placeholder="name"
                                    v-model="nameInput"
                                    :options="db"
                                    :option-projection="e => e.name"
                                    :labelBorder="true"
                                    :selectOnBlur="true"
                                    :controlInput="false"
                                    noElementMessage="no card found"
                                    class="orange"
                                    labelClass="orange"
                                    listClass="orange text-dark"
                                    :listItemClass="item => item.type || 'orange text-dark'"
                                    :required="true"
                                    :onSelectItem="addNewCard"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { deck, decks, findCard, findCardByName, searchOnline, actionToText, setHTMLClass, safeDeck, getRandomInt, db } from '@/global'
import * as type from '@/types'
import { defineComponent } from 'vue'
import SexyInput from './SexyInput.vue'
import Field from './Field.vue'
export default defineComponent({
    components: { SexyInput, Field },
    setup() {
        return { deck, decks, findCard, findCardByName, searchOnline, actionToText, navigator, db }
    },

    data() {
        return {
            allCards: [] as string[],
            allCardsSelect: [] as string[],
            field: [] as type.Slot[],
            handCards: [] as string[],
            graveYard: [] as string[],
            banish: [] as string[],
            allExtraCards: [] as string[],
            selectedCard: '',
            selectedFrom: '',
            view: '',
            playerSite: true,
            startHand: 'random',
            cardInput: '',
            cardInputs: [],
            log: [] as string[],
            logName: '',
            logStartHand: [] as string[],

            nameInput: '',
            hide: false,
        }
    },
    computed: {
        selectedSlotValue() {
            return this.field.find(e => e.name == this.selectedFrom)?.value
        },
    },
    mounted() {
        console.log(type.debug)
        this.reset()
        setHTMLClass('Traning')
    },
    methods: {
        search(slotIndex) {
            return slotIndex
        },
        openEditSettingsModal() {
            window.onclick = event => {
                if (event.target == document.getElementById('editSettingsModal')) this.closeEditSettingsModal()
            }
            let modal = document.getElementById('editSettingsModal')
            if (modal) modal.style.display = 'block'
        },
        closeEditSettingsModal() {
            let modal = document.getElementById('editSettingsModal')
            if (modal) modal.style.display = 'none'
        },
        reset() {
            this.view = ''
            this.selectedCard = ''
            this.selectedFrom = ''
            this.graveYard = []
            this.log = []
            this.logName = ''
            this.field = [
                { name: 'extra1', value: ['extra1'] },
                { name: 'extra2', value: ['extra2'] },
                { name: 'banish', value: ['banish'] },
                { name: 'field', value: ['field'] },
                { name: 'monster1', value: ['monster1'] },
                { name: 'monster2', value: ['monster2'] },
                { name: 'monster3', value: ['monster3'] },
                { name: 'monster4', value: ['monster4'] },
                { name: 'monster5', value: ['monster5'] },
                { name: 'graveyard', value: ['graveyard'] },
                { name: 'extradeck', value: ['extradeck'] },
                { name: 'spelltrap1', value: ['spelltrap1'] },
                { name: 'spelltrap2', value: ['spelltrap2'] },
                { name: 'spelltrap3', value: ['spelltrap3'] },
                { name: 'spelltrap4', value: ['spelltrap4'] },
                { name: 'spelltrap5', value: ['spelltrap5'] },
                { name: 'deck', value: ['deck'] },

                { name: 'enemy banish', value: ['enemy banish'] },
                { name: 'enemy graveyard', value: ['enemy graveyard'] },
                { name: 'enemy monster5', value: ['enemy monster5'] },
                { name: 'enemy monster4', value: ['enemy monster4'] },
                { name: 'enemy monster3', value: ['enemy monster3'] },
                { name: 'enemy monster2', value: ['enemy monster2'] },
                { name: 'enemy monster1', value: ['enemy monster1'] },
                { name: 'enemy field', value: ['enemy field'] },
                { name: 'enemy deck', value: ['enemy deck'] },
                { name: 'enemy spelltrap5', value: ['enemy spelltrap5'] },
                { name: 'enemy spelltrap4', value: ['enemy spelltrap4'] },
                { name: 'enemy spelltrap3', value: ['enemy spelltrap3'] },
                { name: 'enemy spelltrap2', value: ['enemy spelltrap2'] },
                { name: 'enemy spelltrap1', value: ['enemy spelltrap1'] },
                { name: 'enemy extradeck', value: ['enemy extradeck'] },
            ]
            this.generateAllCards()
            this.handCards = []
            if (this.startHand == 'random') {
                for (let i = 0; i < 5; i++) {
                    let index = getRandomInt(this.allCards.length)
                    this.handCards[i] = this.allCards.splice(index, 1).toString()
                }
            } else {
                for (let card of this.cardInputs) {
                    this.handCards.push(findCardByName(card)?.id)
                    this.allCards.splice(
                        this.allCards.findIndex(e => findCardByName(card)?.id),
                        1
                    )
                }
            }
            this.logStartHand = [...this.handCards]
            this.closeEditSettingsModal()
        },
        generateAllCards() {
            this.allExtraCards = []
            for (let card of this.deck.extraCards) {
                for (let i = card.count; i; i--) {
                    this.allExtraCards.push(card.id)
                }
            }
            this.sortExtraDeck()
            this.allCards = []
            for (let card of this.deck.cards) {
                for (let i = card.count; i; i--) {
                    this.allCards.push(card.id)
                }
            }
            this.sortDeck()
            this.allCardsSelect = [...this.allCards]
        },
        sortDeck() {
            this.allCards
                .sort((a, b) => findCard(a)?.name.toLowerCase().localeCompare(findCard(b)?.name.toLowerCase()))
                .sort(function (a, b) {
                    let map = {
                        monster: 1,
                        spell: 2,
                        trap: 3,
                    }
                    return map[findCard(a)?.type] - map[findCard(b)?.type]
                })
        },
        sortExtraDeck() {
            this.allExtraCards
                .sort((a, b) => findCard(a)?.name.toLowerCase().localeCompare(findCard(b)?.name.toLowerCase()))
                .sort(function (a, b) {
                    let map = {
                        monster: -2,
                        spell: -1,
                        trap: 0,
                        fusion: 1,
                        synchro: 2,
                        xyz: 3,
                        link: 4,
                    }
                    return map[findCard(a)?.type] - map[findCard(b)?.type]
                })
        },
        selectCard(card: string, from: string) {
            this.selectedCard = card
            this.selectedFrom = from
        },
        addCardToArray(name: 'deck' | 'graveyard' | 'banish' | 'extradeck') {
            if (!this.selectedCard.includes('add')) {
                switch (name) {
                    case 'deck':
                        if (this.selectedCard != 'token') this.allCards.push(this.selectedCard)

                        this.sortDeck()
                        break
                    case 'graveyard':
                        if (this.selectedCard != 'token') this.graveYard.push(this.selectedCard)

                        break
                    case 'banish':
                        if (this.selectedCard != 'token') this.banish.push(this.selectedCard)

                        break
                    case 'extradeck':
                        if (this.selectedCard != 'token') this.allExtraCards.push(this.selectedCard)

                        this.sortExtraDeck()
                        break
                }
            }
            this.removeCard(this.selectedCard)
        },
        selectSlot(slot: type.Slot) {
            if (this.selectedCard) {
                switch (slot.name) {
                    case 'enemy deck':
                        if (this.selectedCard) this.log.push(`${this.selectedCard} from ${this.selectedFrom} to deck`)
                        this.addCardToArray('deck')
                        return
                    case 'enemy graveyard':
                        if (this.selectedCard) this.log.push(`${this.selectedCard} from ${this.selectedFrom} to graveyard`)
                        this.addCardToArray('graveyard')
                        return
                    case 'enemy banish':
                        if (this.selectedCard) this.log.push(`${this.selectedCard} from ${this.selectedFrom} to banish`)
                        this.addCardToArray('banish')
                        return
                    case 'enemy extradeck':
                        if (this.selectedCard) this.log.push(`${this.selectedCard} from ${this.selectedFrom} to extradeck`)
                        this.addCardToArray('extradeck')
                        return
                }
            }
            if (this.selectedCard && slot.name != this.selectedFrom) this.log.push(`${this.selectedCard} from ${this.selectedFrom} to ${slot.name}`)
            let slotIndex = this.field.findIndex(e => e.name == slot.name)
            if (slot.name == 'deck') {
                if (this.selectedCard) {
                    this.addCardToArray('deck')
                    return
                } else {
                    this.changeView('deck')
                }
            }
            if (slot.name == 'graveyard') {
                if (this.selectedCard) {
                    this.addCardToArray('graveyard')
                    return
                } else {
                    this.changeView('graveyard')
                }
            }
            if (slot.name == 'banish') {
                if (this.selectedCard) {
                    this.addCardToArray('banish')
                    return
                } else {
                    this.changeView('banish')
                }
            }
            if (slot.name == 'extradeck') {
                if (this.selectedCard) {
                    this.addCardToArray('extradeck')
                    return
                } else {
                    this.changeView('extradeck')
                }
            }
            if (!this.selectedCard) {
                if (slot.name == slot.value[0]) {
                    if (this.view == 'slot') this.view = ''
                    return
                }
                if (slot.value.length > 1) {
                    this.selectedFrom = slot.name
                    this.changeView('slot')
                    return
                } else {
                    if (this.view == 'slot') this.view = ''
                }
                this.selectedCard = findCardByName(slot.value[0])?.id || ''
                this.view = 'special'
                this.selectedFrom = slot.name
                return
            }
            if (this.field[slotIndex].value[0] != this.field[slotIndex].name) {
                this.view = ''
                if (findCard(this.selectedCard)!.type == 'xyz') {
                    this.field[slotIndex].value.unshift(findCard(this.selectedCard)!.name)
                } else {
                    this.field[slotIndex].value.push(findCard(this.selectedCard)!.name)
                }
            } else {
                this.field[slotIndex].value[0] = findCard(this.selectedCard)!.name
            }
            this.removeCard(this.selectedCard)
        },
        changeView(view: string) {
            if (this.view == view) {
                this.view = ''
            } else {
                this.view = view
            }
        },
        addHandCard() {
            if (!this.selectedCard) return
            this.log.push(`${this.selectedCard} from ${this.selectedFrom} to hand`)
            this.handCards.push(this.selectedCard)
            this.removeCard(this.selectedCard)
            this.selectedCard = ''
        },
        removeCard(card: string) {
            let fieldSlot = this.field.find(e => e.name == this.selectedFrom)
            switch (this.selectedFrom) {
                case 'hand':
                    this.handCards.splice(this.handCards.indexOf(card), 1)
                    break
                case 'deck':
                    this.allCards.splice(this.allCards.indexOf(this.selectedCard), 1)
                    break
                case 'extradeck':
                    this.allExtraCards.splice(this.allExtraCards.indexOf(this.selectedCard), 1)
                    break
                case 'banish':
                    this.banish.splice(this.banish.indexOf(this.selectedCard), 1)
                    break
                case 'graveyard':
                    this.graveYard.splice(this.graveYard.indexOf(this.selectedCard), 1)
                    break
                case 'token':
                    break
                case 'add':
                    break
                default:
                    if (fieldSlot!.value.length == 1) {
                        fieldSlot!.value = [fieldSlot!.name]
                    } else {
                        fieldSlot!.value.splice(fieldSlot!.value.indexOf(this.selectedCard), 1)
                    }
                    if (fieldSlot.value.length == 1) {
                        if (this.view == 'slot') this.view = ''
                    }
            }
            this.resetSelect()
        },
        resetSelect() {
            this.selectedCard = ''
            this.selectedFrom = ''
        },
        draw() {
            let index = getRandomInt(this.allCards.length)
            this.handCards.push(this.allCards.splice(index, 1).toString())
        },
        targetCard() {
            this.log.push(`target ${this.selectedCard}(${this.selectedFrom})`)
            this.resetSelect()
        },
        activeEffect() {
            this.log.push(`${this.selectedCard}(${this.selectedFrom}) effect`)
            this.resetSelect()
        },
        saveLog() {
            if (this.deck.logs) {
                this.deck.logs.push({ name: this.logName, log: this.log, startHand: this.logStartHand })
            } else {
                this.deck.logs = [{ name: this.logName, log: this.log, startHand: this.logStartHand }]
            }
            safeDeck(this.deck)
            this.reset()
        },
        specialAction(special: string) {
            let slot
            switch (special) {
                case 'view':
                    if (this.view == 'special') this.view = ''
                    else this.view = 'special'
                    break
                case 'pendel':
                    this.log.push('pendel summon')
                    this.view = ''
                    break
                case 'token':
                    this.selectedCard = 'token'
                    this.selectedFrom = 'token'
                    this.view = ''
                    break
                case 'addCard':
                    this.openAddCardModal()
                    break
                case 'hide':
                    this.hide = !this.hide
                    break
                case 'set':
                    slot = this.field.find(e => e.name == this.selectedFrom)
                    slot.hide = !slot.hide
                    if (slot.name.includes('monster')) slot.def = true
                    break
                case 'pos':
                    slot = this.field.find(e => e.name == this.selectedFrom)
                    slot.def = !slot.def
                    slot.hide = false
                    break
            }
        },
        openAddCardModal() {
            window.onclick = event => {
                if (event.target == document.getElementById('addCardModal')) this.closeAddCardModal()
            }
            let modal = document.getElementById('addCardModal')
            if (modal) modal.style.display = 'block'
        },
        closeAddCardModal() {
            let modal = document.getElementById('addCardModal')
            if (modal) modal.style.display = 'none'
        },
        addNewCard(card) {
            this.nameInput = ''
            this.closeAddCardModal()
            card.id = Math.random().toString().slice(-15) + 'add'
            if (this.deck.traingsDeck) this.deck.traingsDeck.push(card)
            else this.deck.traingsDeck = [card]
            this.selectedCard = card.id
            this.selectedFrom = 'add'
        },
        switchSite() {
            this.playerSite = !this.playerSite
        },
        changeStartHand() {
            if (this.startHand == 'random') {
                this.startHand = 'custom'
            } else {
                this.startHand = 'random'
                this.cardInputs = []
            }
        },

        previousStep() {
            let step = []
            if (this.log[this.log.length - 1]) {
                step = this.log[this.log.length - 1].split(' ')
            }
            let counter = 6
            while (step.length > 5 && counter) {
                for (let index in step) {
                    if (step[index] == 'enemy') {
                        step[index] += ' '
                        step[index] += step[parseInt(index) + 1]
                        step.splice(parseInt(index) + 1, 1)
                    }
                }
                counter--
            }
            if (this.showText == 'end') {
                this.showText = actionToText(step.join(' '))
                return
            }
            let card = findCard(step[0])
            let slotIndex = this.field.findIndex(e => e.name == step[4])
            let fieldSlot = this.field.find(e => e.name == step[4])
            this.log.pop()
            if (step.length != 5) return
            switch (step[4]) {
                case 'deck':
                    this.allCards.splice(
                        this.allCards.findIndex(e => e == step[0]),
                        1
                    )
                    break
                case 'graveyard':
                    this.graveYard.splice(
                        this.graveYard.findIndex(e => e == step[0]),
                        1
                    )
                    break
                case 'banish':
                    this.banish.splice(
                        this.banish.findIndex(e => e == step[0]),
                        1
                    )
                    break
                case 'extradeck':
                    this.allExtraCards.splice(
                        this.allExtraCards.findIndex(e => e == step[0]),
                        1
                    )
                    break
                case 'hand':
                    this.handCards.splice(
                        this.handCards.findIndex(e => e == step[0]),
                        1
                    )
                    break
                default:
                    if (fieldSlot!.value.length == 1) {
                        fieldSlot!.value = [fieldSlot!.name]
                    } else {
                        fieldSlot!.value.splice(fieldSlot!.value.indexOf(card.name), 1)
                    }
                    break
            }
            if (step[4].includes('enemy') || step[2].includes('enemy')) {
                this.playerSite = false
            } else {
                this.playerSite = true
            }
            switch (step[2]) {
                case 'deck':
                    if (card.name != 'token') this.allCards.push(card.id)
                    break
                case 'graveyard':
                    if (card.name != 'token') this.graveYard.push(card.id)
                    break
                case 'banish':
                    if (card.name != 'token') this.banish.push(card.id)
                    break
                case 'extradeck':
                    if (card.name != 'token') this.allExtraCards.push(card.id)
                    break
                case 'hand':
                    if (card.name != 'token') this.handCards.push(card.id)
                    break
                case 'token': {
                    break
                }
                default:
                    if (this.field[slotIndex].value[0] != this.field[slotIndex].name) {
                        if (card.type == 'xyz') {
                            this.field[slotIndex].value.unshift(card.name)
                        } else {
                            this.field[slotIndex].value.push(card.name)
                        }
                    } else {
                        this.field[this.field.findIndex(e => e.name == step[2])].value[0] = card.name
                    }
                    break
            }
        },
    },
})
</script>
<style scoped>
body {
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
}
.header {
    display: grid;
    grid-template-columns: 1fr 1fr 10fr 1fr 1fr;
    grid-template-areas:
        'switch special text1 . settings'
        'undo target text2 effect .';
}
.sticky {
    background-color: rgb(12, 12, 12);
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
}
.startHand {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(50px, auto);
}
.special {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(40px, auto);
}
.deck {
    display: grid;
    grid-auto-rows: minmax(50px, auto);
    grid-template-columns: repeat(5, 1fr);
}
</style>
