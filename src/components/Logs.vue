<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />
    <div class="container" style="margin-top: 3vh">
        <div v-if="playLog.name">
            <div class="header orange text-dark round mb-1">
                <div @click="previousStep()">
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
                <div @click="nextStep()">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-caret-right-square"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                        />
                        <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z" />
                    </svg>
                </div>
                <div @click="openLogModal(playLog)" class="orange text-dark round mb-1">
                    {{ playLog.name }}
                </div>
                <div v-if="autoPlay" @click="autoPlayStop()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"
                        />
                    </svg>
                </div>
                <div v-else @click="autoPlayStart()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                    </svg>
                </div>
                <div @click="exitPlayLog()">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-box-arrow-in-right"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                    </svg>
                </div>
            </div>
            <div class="orange text-dark round mb-1">{{ showText }}</div>
            <Field
                :field="field"
                :all-cards="allCards"
                :all-extra-cards="allExtraCards"
                :banish="banish"
                :grave-yard="graveYard"
                :player-site="playerSite"
            />
            <div>handcards</div>
            <div class="startHand mb-3">
                <div
                    v-for="(card, index) of handCards"
                    :key="card + index"
                    style="background-color: red; border: 2px solid rgb(12, 12, 12)"
                    :class="findCard(card)?.type"
                    @dblclick="searchOnline(findCard(card)?.name)"
                >
                    {{ findCard(card)?.name }}
                </div>
            </div>
        </div>
        <div v-else>
            <div v-for="log of deck.logs" :key="JSON.stringify(log)" @click="openLogModal(log)" class="orange text-dark round mb-1">
                {{ log.name }}
            </div>
        </div>
    </div>

    <!-- new modal -->
    <div id="logModal" class="modal">
        <div class="modal-content">
            <div class="container">
                <div class="text-dark orange round header">
                    <div></div>
                    <div></div>
                    <div class="w-100">{{ selectedLog.name }}</div>
                    <div @click="startPlayLog()">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-play-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                        </svg>
                    </div>
                    <div class="orange round" @click="deleteLog('check')">
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
                <div v-if="logDeleteCheck" class="mt-3">
                    <div class="w-100 orange text-dark round mb-1">Are you sure to delete {{ selectedLog.name }}</div>
                    <div class="deleteModal">
                        <button type="button" class="btn btn-success me-1" style="grid-area: yes" @click="deleteLog('delete')">
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
                        <button type="button" class="btn btn-danger" style="grid-area: no" @click="deleteLog('cancel')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path
                                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="startHand mb-3 mt-1">
                    <div
                        v-for="(card, index) of selectedLog.startHand"
                        :key="card + index"
                        style="background-color: red"
                        class="me-1"
                        :class="findCard(card)?.type"
                        @dblclick="searchOnline(findCard(card)?.name)"
                    >
                        {{ findCard(card)?.name }}
                    </div>
                </div>
                <div v-for="(action, index) of selectedLog.log" :key="action + index" class="orange text-dark round mb-1">
                    {{ actionToText(action) }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { deck, decks, findCard, findCardByName, searchOnline, actionToText, setHTMLClass, safeDeck, getRandomInt } from '@/global'
import * as type from '@/types'
import Field from './Field.vue'
import { defineComponent } from 'vue'
// import SexyInput from './SexyInput.vue'
export default defineComponent({
    components: { Field },
    setup() {
        return { deck, decks, findCard, findCardByName, searchOnline, actionToText }
    },
    mounted() {
        setHTMLClass('Logs')
    },
    data() {
        return {
            autoPlay: false,
            autoPlayIntervalId: '',
            playIndex: 0,
            showText: '',
            selectedLog: {} as type.Log,
            logDeleteCheck: '',
            playLog: {} as type.Log,
            allCards: [] as string[],
            allCardsSelect: [] as string[],
            field: [] as type.Slot[],
            handCards: [] as string[],
            graveYard: [] as string[],
            banish: [] as string[],
            allExtraCards: [] as string[],
            playerSite: true,
        }
    },
    computed: {},
    // mounted() {},
    methods: {
        openLogModal(log: type.Log) {
            window.onclick = event => {
                if (event.target == document.getElementById('logModal')) this.closeLogModal()
            }
            this.selectedLog = log
            let modal = document.getElementById('logModal')
            if (modal) modal.style.display = 'block'
        },
        closeLogModal() {
            let modal = document.getElementById('logModal')
            if (modal) modal.style.display = 'none'
        },
        deleteLog(fun: string) {
            if (fun == 'delete') {
                this.closeLogModal()
                this.deck.logs = this.deck.logs.filter(e => e.name != this.selectedLog.name)
                this.selectedLog = {}
                this.logDeleteCheck = ''
                safeDeck(this.deck)
            }
            if (fun == 'check') {
                this.logDeleteCheck = `Are you sure to delete ${this.selectedLog.name}`
            }
            if (fun == 'cancel') {
                this.logDeleteCheck = ''
            }
        },
        startPlayLog() {
            this.playLog = this.selectedLog
            this.reset()
            this.showText = 'begin'
            this.closeLogModal()
        },
        exitPlayLog() {
            this.playLog = {}
            this.autoPlay = false
        },
        autoPlayStart() {
            this.autoPlay = true
            this.autoPlayIntervalId = window.setInterval(() => {
                this.nextStep()
            }, 1000)
        },
        autoPlayStop() {
            this.autoPlay = false
            clearInterval(this.autoPlayIntervalId)
        },
        nextStep() {
            let step = []
            if (this.playLog.log[this.playIndex]) {
                step = this.playLog.log[this.playIndex].split(' ')
                this.playIndex++
            } else {
                this.autoPlayStop()
                this.showText = 'end'
                return
            }
            this.showText = actionToText(step.join(' '))
            let card = findCard(step[0])
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
            let slotIndex = this.field.findIndex(e => e.name == step[4])
            let fieldSlot = this.field.find(e => e.name == step[4])
            if (step.length != 5) return
            switch (step[2]) {
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
                case 'token':
                    break
                default:
                    if (fieldSlot!.value.length == 1) {
                        this.field[this.field.findIndex(e => e.name == step[2])].value = [
                            this.field[this.field.findIndex(e => e.name == step[2])].name,
                        ]
                    } else {
                        this.field[this.field.findIndex(e => e.name == step[2])]!.value.splice(
                            this.field[this.field.findIndex(e => e.name == step[2])].value.indexOf(card.id),
                            1
                        )
                    }
                    break
            }
            if (step[4].includes('enemy') || step[2].includes('enemy')) {
                this.playerSite = false
            } else {
                this.playerSite = true
            }
            switch (step[4]) {
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
                default:
                    if (this.field[slotIndex].value[0] != this.field[slotIndex].name) {
                        if (card.type == 'xyz') {
                            this.field[slotIndex].value.unshift(card.name)
                        } else {
                            this.field[slotIndex].value.push(card.name)
                        }
                    } else {
                        this.field[slotIndex].value[0] = card.name
                    }
                    break
            }
        },
        previousStep() {
            let step = []
            if (this.playLog.log[this.playIndex - 1]) {
                step = this.playLog.log[this.playIndex - 1].split(' ')
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
            this.playIndex--
            if (this.playLog.log[this.playIndex - 1]) {
                this.showText = actionToText(this.playLog.log[this.playIndex - 1])
            } else {
                this.startPlayLog()
                return
            }
            let card = findCard(step[0])
            let slotIndex = this.field.findIndex(e => e.name == step[4])
            let fieldSlot = this.field.find(e => e.name == step[4])
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
                default:
                    if (fieldSlot!.value.length == 1) {
                        fieldSlot!.value = [fieldSlot!.name]
                    } else {
                        fieldSlot!.value.splice(fieldSlot!.value.indexOf(card.id), 1)
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
        reset() {
            this.autoPlay = false
            this.playIndex = 0
            this.graveYard = []
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
            this.handCards = [...this.playLog.startHand]
            for (let card of this.handCards) {
                this.allCards.splice(
                    this.allCards.findIndex(e => e == card),
                    1
                )
            }
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
        },
    },
})
</script>
<style scoped>
.startHand {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(50px, auto);
}
.header {
    display: grid;
    grid-template-columns: 1fr 1fr 15fr 1fr 1fr;
}
</style>
