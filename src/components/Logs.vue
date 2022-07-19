<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />

    <div class="container" style="margin-top: 3vh">
        <div v-for="log of deck.logs" :key="JSON.stringify(log)" @click="openLogModal(log)" class="orange text-dark round mb-1">
            {{ log.name }}
        </div>
    </div>
    <!-- new modal -->
    <div id="logModal" class="modal">
        <div class="modal-content">
            <div class="container">
                <div class="d-flex justify-content: center">
                    <div class="w-100 mb-1 text-dark">{{ selectedLog.name }}</div>
                </div>
                <div class="startHand mb-3">
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
import { setDecks, setDeck, getDeck } from '@/API'
import { deck, decks, findCard, findCardByName, searchOnline, actionToText, setHTMLClass } from '@/global'
import * as type from '@/types'
import { defineComponent } from 'vue'
// import SexyInput from './SexyInput.vue'
export default defineComponent({
    // components: { SexyInput },
    setup() {
        return { deck, decks, findCard, findCardByName, searchOnline, actionToText }
    },
    mounted() {
        setHTMLClass('Logs')
    },
    data() {
        return {
            selectedLog: {} as type.Log,
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
        safeDeck() {
            this.decks[this.decks.findIndex(d => d.name == this.deck.name)] = this.deck
            setDeck(this.deck)
            setDecks(this.decks)
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
</style>
