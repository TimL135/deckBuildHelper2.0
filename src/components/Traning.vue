<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />

    <div class="container" style="margin-top: 1vh">
        <div class="sticky">{{ selectedCard ? `selected card: ${findCard(selectedCard)?.name}(${selectedFrom})` : 'no card selected' }}</div>
        <div class="mb-3">
            <button @click="reset()" type="button" class="btn orange w-100 mt-1">Reset</button>
        </div>
        <div class="field">
            <div
                v-for="(slot, index) of field"
                :key="slot"
                :style="`grid-area:slot${index + 1}`"
                style="background-color: gray; border: 2px solid black"
                @click="selectSlot(index, slot)"
                :class="findCardByName(slot.value)?.type"
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
                        : slot.value
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
                >
                    {{ findCard(card)?.name }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { getDeck } from '@/API'
import { deck, findCard, findCardByName } from '@/global'
import * as type from '@/types'
import { defineComponent } from 'vue'
// import SexyInput from '../components/SexyInput.vue'
export default defineComponent({
    // components: { SexyInput },
    setup() {
        return { deck, findCard, findCardByName }
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
        }
    },
    mounted() {
        console.log(type.debug)
        this.reset()
    },
    methods: {
        reset() {
            this.graveYard = []
            this.field = [
                { name: 'extra1', value: 'extra1' },
                { name: 'extra2', value: 'extra2' },
                { name: 'banish', value: 'banish' },
                { name: 'field', value: 'field' },
                { name: 'monster1', value: 'monster1' },
                { name: 'monster2', value: 'monster2' },
                { name: 'monster3', value: 'monster3' },
                { name: 'monster4', value: 'monster4' },
                { name: 'monster5', value: 'monster5' },
                { name: 'graveyard', value: 'graveyard' },
                { name: 'extradeck', value: 'extradeck' },
                { name: 'spelltrap1', value: 'spelltrap1' },
                { name: 'spelltrap2', value: 'spelltrap2' },
                { name: 'spelltrap3', value: 'spelltrap3' },
                { name: 'spelltrap4', value: 'spelltrap4' },
                { name: 'spelltrap5', value: 'spelltrap5' },
                { name: 'deck', value: 'deck' },
            ]
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
            for (let i = 0; i < 5; i++) {
                let index = this.getRandomInt(this.allCards.length)
                this.handCards[i] = this.allCards.splice(index, 1).toString()
            }
        },
        selectCard(card: string, from: string) {
            this.selectedCard = card
            this.selectedFrom = from
        },
        selectSlot(slotIndex: number, slot: type.Slot) {
            if (slot.name == 'deck') {
                if (this.view == 'deck') {
                    this.view = ''
                } else {
                    this.view = 'deck'
                }
                return
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
                if (this.view == 'extradeck') {
                    this.view = ''
                } else {
                    this.view = 'extradeck'
                }
                return
            }
            if (!this.selectedCard) return
            this.field[slotIndex].value = findCard(this.selectedCard)!.name
            this.removeCard(this.selectedCard)
        },
        addHandCard() {
            if (!this.selectedCard) return
            this.handCards.push(this.selectedCard)
            this.removeCard(this.selectedCard)
            this.selectedCard = ''
        },
        removeCard(card: string) {
            this.selectedCard = ''
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
            }
            this.selectedCard = ''
        },
        draw() {
            let index = this.getRandomInt(this.allCards.length)
            this.handCards.push(this.allCards.splice(index, 1).toString())
        },
        getRandomInt(max: number) {
            return Math.floor(Math.random() * max)
        },
    },
})
</script>
<style>
body {
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
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
