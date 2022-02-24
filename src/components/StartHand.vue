<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />

    <div class="container" style="margin-top: 3vh">
        <select
            v-for="cardNumber of 5"
            :key="cardNumber"
            style="border: 1px solid #ffa107"
            class="form-select orange mb-1"
            v-model="handCards[cardNumber - 1]"
            :class="handCardsType[cardNumber - 1]"
            @change="countCard()"
        >
            <option class="orange" selected>{{ cardNumber }}. Card</option>
            <option v-for="card in deck.cards" :key="card.name" :value="card.id" :class="card.type">
                {{ card.name }}
            </option>
        </select>
        <div>
            <button @click="randomStartHand()" type="button" class="btn orange w-100 mt-1">Random</button>
        </div>
        <br />
        <div class="d-flex mb-1">
            <div class="w-100 rounded" style="border: 1px solid #ffa107">Value:{{ value }}</div>
        </div>
        <div class="d-flex mb-1">
            <div class="w-25 rounded-start" style="border: 1px solid #ffa107">
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
            <div class="w-25 rounded-end" style="border: 1px solid #ffa107">
                Negate:
                <br />
                {{ counts[6] }}({{ uniqueCounts[6] }})
            </div>
        </div>
        <div class="d-flex mb-1">
            <div class="w-25 rounded-start" style="border: 1px solid #ffa107">
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
            <div class="w-25 rounded-end" style="border: 1px solid #ffa107">
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
                        <div v-for="card in combo.cards" :key="card" class="mb-1 green" :class="findCard(card)?.type">
                            {{ typeof card === 'object' ? card.name : findCard(card).name }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">
import { getDeck } from '@/API'
import { deck, findCard } from '@/global'
import * as type from '@/types'
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        return { deck, findCard }
    },
    data() {
        return {
            allCards: [] as string[],
            possibleCombos: [] as type.Combo[],
            counts: [0, 0, 0, 0, 0, 0, 0, 0] as number[],
            uniqueCounts: [0, 0, 0, 0, 0, 0, 0, 0] as number[],
            value: 0,
            handCards: ['1. Card', '2. Card', '3. Card', '4. Card', '5. Card'],
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
                let index = this.getRandomInt(this.allCards.length)
                this.handCards[i] = this.allCards.splice(index, 1).toString()
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
                let tmp = this.deck.cards.find(c => c.id == this.handCards[i])
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
                            if (!handValueCards.find(c => c.name == card!.name)) {
                                handValueCards.push(card)
                            }
                        }
                    }
                    if (!uniqueCards.find(c => c.name == card!.name)) {
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
                        typeof name === 'object'
                            ? name.cards.some(cardInCardGroup =>
                                  comboHandCards.includes(cardInCardGroup)
                                      ? comboHandCards.splice(
                                            comboHandCards.findIndex(card => findCard(card)?.id == cardInCardGroup),
                                            1
                                        )
                                      : null
                              )
                            : comboHandCards.includes(name)
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
        getRandomInt(max: number) {
            return Math.floor(Math.random() * max)
        },
    },
})
</script>