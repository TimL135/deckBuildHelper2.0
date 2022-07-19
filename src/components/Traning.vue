<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />

    <div class="mx-3">
        <div class="header sticky">
            <div @click="resetSelect()" style="grid-area: text1">
                {{ selectedCard ? `selected card: ${findCard(selectedCard)?.name}(${selectedFrom})` : 'no card selected' }}
            </div>
            <div style="grid-area: text2">
                {{ view ? `view: ${view == 'slot' ? selectedFrom : view}` : 'no view' }}
            </div>
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
        <div class="field">
            <div
                v-for="(slot, index) of field"
                :key="slot"
                :style="`grid-area:slot${index + 1}`"
                style="background-color: gray; border: 2px solid black"
                @click="selectSlot(index, slot)"
                @dblclick="slot.value.length == 1 && slot.value != slot.name ? searchOnline(slot.value[0]) : null"
                :class="findCardByName(slot.value[0])?.type"
            >
                {{
                    slot.name == 'deck'
                        ? `${slot.name}(${allCards.length})`
                        : slot.name == 'graveyard'
                        ? `${slot.name}(${graveYard.length})`
                        : slot.name == 'extradeck'
                        ? `${slot.name}(${allExtraCards.length})`
                        : slot.name == 'banish'
                        ? `${slot.name}(${banish.length})`
                        : slot.value.length > 1
                        ? `${slot.value[0]}(${slot.value.length})`
                        : slot.value[0]
                }}
            </div>
        </div>
        <div @click="addHandCard" @dblclick="draw">handcards</div>
        <div class="startHand mb-3">
            <div
                v-for="(card, index) of handCards"
                :key="card + index"
                style="background-color: red; border: 2px solid black"
                :class="findCard(card)?.type"
                @click="selectCard(card, 'hand')"
                @dblclick="searchOnline(findCard(card)?.name)"
            >
                {{ findCard(card)?.name }}
            </div>
        </div>
        <div v-if="view == 'deck'">
            <div>deck</div>
            <div class="deck">
                <div
                    v-for="card of allCards"
                    :key="card"
                    :class="findCard(card)?.type"
                    style="border: 2px solid black"
                    @click="selectCard(card, 'deck')"
                    @dblclick="searchOnline(findCard(card)?.name)"
                >
                    {{ findCard(card)?.name }}
                </div>
            </div>
        </div>
        <div v-if="view == 'extradeck'">
            <div>extradeck</div>
            <div class="deck">
                <div
                    v-for="card of allExtraCards"
                    :key="card"
                    :class="findCard(card)?.type"
                    style="border: 2px solid black"
                    @click="selectCard(card, 'extradeck')"
                    @dblclick="searchOnline(findCard(card)?.name)"
                >
                    {{ findCard(card)?.name }}
                </div>
            </div>
        </div>
        <div v-if="view == 'graveyard'">
            <div>graveyard</div>
            <div class="deck">
                <div
                    v-for="card of graveYard"
                    :key="card"
                    :class="findCard(card)?.type"
                    style="border: 2px solid black"
                    @click="selectCard(card, 'graveyard')"
                    @dblclick="searchOnline(findCard(card)?.name)"
                >
                    {{ findCard(card)?.name }}
                </div>
            </div>
        </div>
        <div v-if="view == 'banish'">
            <div>banish</div>
            <div class="deck">
                <div
                    v-for="card of banish"
                    :key="card"
                    :class="findCard(card)?.type"
                    style="border: 2px solid black"
                    @click="selectCard(card, 'banish')"
                    @dblclick="searchOnline(findCard(card)?.name)"
                >
                    {{ findCard(card)?.name }}
                </div>
            </div>
        </div>
        <div v-if="view == 'slot'">
            <div>{{ selectedFrom }}</div>
            <div class="deck">
                <div
                    v-for="card of selectedSlotValue"
                    :key="card"
                    :class="findCardByName(card)?.type"
                    style="border: 2px solid black"
                    @click="selectCard(findCardByName(card)?.id, selectedFrom)"
                    @dblclick="searchOnline(card)"
                >
                    {{ card }}
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
                        <div class="mb-3">
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
                                :options="allCards.map(e => findCard(e)?.name)"
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
                        <div v-if="log.length">
                            <div class="text-dark">log</div>
                            <form @submit.prevent="saveLog()">
                                <div>
                                    <SexyInput
                                        type="text"
                                        placeholder="name"
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
</template>
<script lang="ts">
import { setDecks, setDeck, getDeck } from '@/API'
import { deck, decks, findCard, findCardByName, searchOnline, actionToText } from '@/global'
import * as type from '@/types'
import { defineComponent } from 'vue'
import SexyInput from './SexyInput.vue'
export default defineComponent({
    components: { SexyInput },
    setup() {
        return { deck, decks, findCard, findCardByName, searchOnline, actionToText }
    },
    data() {
        return {
            allCards: [] as string[],
            field: [] as type.Slot[],
            handCards: [] as string[],
            selectedCard: '',
            selectedFrom: '',
            graveYard: [] as string[],
            banish: [] as string[],
            view: '',
            allExtraCards: [] as string[],
            startHand: 'random',
            cardInput: '',
            cardInputs: [],
            log: [] as string[],
            logName: '',
            logStartHand: [] as string[],
        }
    },
    computed: {
        selectedSlotValue() {
            return this.field.find(e => e.name == this.selectedFrom).value
        },
    },
    mounted() {
        console.log(type.debug)
        this.reset()
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
            this.generateAllCards()
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
            ]
            this.generateAllCards()
            this.handCards = []
            if (this.startHand == 'random') {
                for (let i = 0; i < 5; i++) {
                    let index = this.getRandomInt(this.allCards.length)
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
            this.allCards = []
            for (let card of this.deck.cards) {
                for (let i = card.count; i; i--) {
                    this.allCards.push(card.id)
                }
            }
            this.allCards
                .sort((a, b) => findCard(a)?.name.localeCompare(findCard(b)?.name))
                .sort(function (a, b) {
                    let map = {
                        monster: 1,
                        spell: 2,
                        trap: 3,
                    }
                    return map[findCard(a)?.type] - map[findCard(b)?.type]
                })
        },
        selectCard(card: string, from: string) {
            this.selectedCard = card
            this.selectedFrom = from
        },
        selectSlot(slotIndex: number, slot: type.Slot) {
            if (this.selectedCard) this.log.push(`${this.selectedCard} from ${this.selectedFrom} to ${slot.name}`)
            if (slot.name == 'deck') {
                if (this.selectedCard) {
                    this.allCards.push(this.selectedCard)
                    this.removeCard(this.selectedCard)
                    return
                } else {
                    if (this.view == 'deck') {
                        this.view = ''
                    } else {
                        this.view = 'deck'
                    }
                }
            }
            if (slot.name == 'graveyard') {
                if (this.selectedCard) {
                    this.graveYard.push(this.selectedCard)
                    this.removeCard(this.selectedCard)
                    return
                } else {
                    if (this.view == 'graveyard') {
                        this.view = ''
                    } else {
                        this.view = 'graveyard'
                    }
                }
            }
            if (slot.name == 'banish') {
                if (this.selectedCard) {
                    this.banish.push(this.selectedCard)
                    this.removeCard(this.selectedCard)
                    return
                } else {
                    if (this.view == 'banish') {
                        this.view = ''
                    } else {
                        this.view = 'banish'
                    }
                }
            }
            if (slot.name == 'extradeck') {
                if (this.selectedCard) {
                    this.allExtraCards.push(this.selectedCard)
                    this.removeCard(this.selectedCard)
                    return
                } else {
                    if (this.view == 'extradeck') {
                        this.view = ''
                    } else {
                        this.view = 'extradeck'
                    }
                }
            }
            if (!this.selectedCard) {
                if (slot.name == slot.value[0]) {
                    if (this.view == 'slot') this.view = ''
                    return
                }
                if (slot.value.length > 1) {
                    this.selectedFrom = slot.name
                    if (this.view == 'slot') {
                        this.view = ''
                    } else {
                        this.view = 'slot'
                    }
                    return
                } else {
                    if (this.view == 'slot') this.view = ''
                }
                this.selectedCard = findCardByName(slot.value[0])?.id || ''
                this.selectedFrom = slot.name
                return
            }
            if (this.field[slotIndex].value[0] != this.field[slotIndex].name) {
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
        addHandCard() {
            if (!this.selectedCard) return
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
            this.selectedCard = ''
        },
        resetSelect() {
            this.selectedCard = ''
            this.selectedFrom = ''
        },
        draw() {
            let index = this.getRandomInt(this.allCards.length)
            this.handCards.push(this.allCards.splice(index, 1).toString())
        },
        activeEffect() {
            this.log.push(`${this.selectedCard} effect`)
            this.selectedCard = ''
            this.selectedFrom = ''
        },
        saveLog() {
            if (this.deck.logs) {
                this.deck.logs.push({ name: this.logName, log: this.log, startHand: this.logStartHand })
            } else {
                this.deck.logs = [{ name: this.logName, log: this.log, startHand: this.logStartHand }]
            }
            this.safeDeck()
            this.reset()
        },

        changeStartHand() {
            if (this.startHand == 'random') {
                this.startHand = 'custom'
            } else {
                this.startHand = 'random'
                this.cardInputs = []
            }
        },
        safeDeck() {
            this.decks[this.decks.findIndex(d => d.name == this.deck.name)] = this.deck
            setDeck(this.deck)
            setDecks(this.decks)
        },
        getRandomInt(max: number) {
            return Math.floor(Math.random() * max)
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
    grid-template-columns: 2fr 10fr 1fr 1fr;
    grid-template-areas:
        '. text1 effect settings'
        '. text2 . .';
}
.sticky {
    background-color: black;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
}
.startHand {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(50px, auto);
}
.field {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(50px, auto);
    grid-template-areas:
        '. . slot1 . slot2 . slot3'
        'slot4 slot5 slot6 slot7 slot8 slot9 slot10'
        'slot11 slot12 slot13 slot14 slot15 slot16 slot17';
}
.deck {
    display: grid;
    grid-auto-rows: minmax(50px, auto);
    grid-template-columns: repeat(5, 1fr);
}
</style>
