<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />

    <div class="container" style="margin-top: 3vh">
        <div v-for="cardNumber of 5" :key="cardNumber">
            <SexyInput
                :placeholder="`${cardNumber}.Card`"
                v-model="handCards[cardNumber - 1]"
                type="select"
                :class="handCardsType[cardNumber - 1] || 'orange'"
                :label-class="handCardsType[cardNumber - 1] || 'orange'"
                @change="countCard()"
                :options="deck.cards.map(a => a.name)"
                @dblclick="searchOnline(handCards[cardNumber - 1])"
                @selectItem="countCard()"
                :listItemClass="item => findCardByName(item).type"
            />
        </div>
        <div>
            <button @click="randomStartHand()" type="button" class="btn orange w-100 mt-1 round">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
                    <path
                        fill-rule="evenodd"
                        d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
                    />
                    <path
                        d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"
                    />
                </svg>
            </button>
        </div>
        <br />
        <div class="d-flex mb-1">
            <div class="w-100 rounded" style="border: 1px solid #ffa107">Value:{{ value }}</div>
        </div>
        <div class="d-flex mb-1">
            <div class="w-25 round-start" style="border: 1px solid #ffa107">
                Handtraps:
                <br />
                {{ counts[0] }}({{ uniqueCounts[0] }})
            </div>
            <div class="w-25" style="border: 1px solid #ffa107">
                Seacher:
                <br />
                {{ counts[1] }}({{ uniqueCounts[1] }})
            </div>
            <div class="w-25" style="border: 1px solid #ffa107">
                Combo Starter:
                <br />
                {{ counts[2] }}({{ uniqueCounts[2] }})
            </div>
            <div class="w-25 round-end" style="border: 1px solid #ffa107">
                Negate:
                <br />
                {{ counts[6] }}({{ uniqueCounts[6] }})
            </div>
        </div>
        <div class="d-flex mb-1">
            <div class="w-25 round-start" style="border: 1px solid #ffa107">
                Once per Turn:
                <br />
                {{ counts[5] }}({{ uniqueCounts[5] }})
            </div>
            <div class="w-25" style="border: 1px solid #ffa107">
                Searchable:
                <br />
                {{ counts[4] }}({{ uniqueCounts[4] }})
            </div>
            <div class="w-25" style="border: 1px solid #ffa107">
                Combo Piece:
                <br />
                {{ counts[3] }}({{ uniqueCounts[3] }})
            </div>
            <div class="w-25 round-end" style="border: 1px solid #ffa107">
                Interaption:
                <br />
                {{ counts[7] }}({{ uniqueCounts[7] }})
            </div>
        </div>

        <br />
        <!-- new table -->
        <h1>Possible Combos</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="w-25">Combo</th>
                    <th class="w-75">Cards</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="combo in possibleCombos" :key="combo">
                    <td>
                        {{ possibleCombos.findIndex(name => name == combo) + 1 }}
                    </td>
                    <td>
                        <div
                            v-for="card in combo.cards"
                            :key="card"
                            class="mb-1 orange text-dark"
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
</template>
<script lang="ts">
import { deck, findCard, findCardByName, findCardGroup, findCardGroupByName, searchOnline, setHTMLClass, getRandomInt } from '@/global'
import * as type from '@/types'
import { defineComponent } from 'vue'
import SexyInput from '../components/SexyInput.vue'
export default defineComponent({
    components: { SexyInput },
    setup() {
        return { deck, findCard, findCardByName, findCardGroup, findCardGroupByName, searchOnline }
    },
    mounted() {
        setHTMLClass('StartHand')
    },
    data() {
        return {
            allCards: [] as string[],
            possibleCombos: [] as type.Combo[],
            counts: [0, 0, 0, 0, 0, 0, 0, 0] as number[],
            uniqueCounts: [0, 0, 0, 0, 0, 0, 0, 0] as number[],
            value: 0,
            handCards: ['', '', '', '', ''],
            handCardsType: [] as string[],
        }
    },
    methods: {
        randomStartHand() {
            this.allCards = []
            for (let card of this.deck.cards) {
                for (let i = card.count; i; i--) {
                    this.allCards.push(card.id)
                }
            }
            for (let i = 0; i < 5; i++) {
                let index = getRandomInt(this.allCards.length)
                this.handCards[i] = findCard(this.allCards.splice(index, 1).toString())?.name
            }
            this.countCard()
        },
        countCard() {
            this.counts = [0, 0, 0, 0, 0, 0, 0, 0]
            this.uniqueCounts = [0, 0, 0, 0, 0, 0, 0, 0]
            this.value = 0
            let handValueCards = [] as type.Card[]
            let uniqueCards = [] as type.Card[]
            for (let i = 0; i < 5; i++) {
                let tmp = this.deck.cards.find(c => c.name == this.handCards[i])
                if (tmp) {
                    this.handCardsType[i] = tmp.type
                } else {
                    this.handCardsType[i] = ''
                }
                let card = this.deck.cards.find(x => x.name == this.handCards[i])
                if (card) {
                    for (let c in this.counts) {
                        if (card.properties[c]) {
                            this.counts[c]++
                        }
                    }
                    if (card.value < 0) {
                        handValueCards.push(card)
                    } else {
                        if (card.value > 0) {
                            if (!handValueCards.find(c => c.id == card!.id)) {
                                handValueCards.push(card)
                            }
                        }
                    }
                    if (!uniqueCards.find(c => c.id == card!.id)) {
                        uniqueCards.push(card)
                    }
                }
            }
            if (handValueCards.length > 1) {
                this.value = handValueCards.map(c => c.value).reduce((a, b) => a + b)
            }
            for (let card of uniqueCards) {
                for (let c in this.uniqueCounts) {
                    if (card.properties[c]) {
                        this.uniqueCounts[c]++
                    }
                }
            }
            this.checkCombos()
        },
        checkCombos() {
            this.possibleCombos = []
            for (let combo of this.deck.combos.filter(c => c.active)) {
                let comboHandCards = [...this.handCards]
                if (
                    combo.cards.every(name =>
                        findCardGroup(name)
                            ? findCardGroup(name).cards.some(cardInCardGroup =>
                                  comboHandCards.includes(findCard(cardInCardGroup)?.name)
                                      ? comboHandCards.splice(
                                            comboHandCards.findIndex(card => findCard(card)?.id == cardInCardGroup),
                                            1
                                        )
                                      : null
                              )
                            : comboHandCards.includes(findCard(name)?.name)
                            ? comboHandCards.splice(
                                  comboHandCards.findIndex(card => findCard(card)?.id == name),
                                  1
                              )
                            : null
                    )
                ) {
                    this.possibleCombos.push(combo)
                }
            }
        },
    },
})
</script>
