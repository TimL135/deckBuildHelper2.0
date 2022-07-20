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
                <div class="text-dark orange round header">
                    <div></div>
                    <div class="w-100 mb-1">{{ selectedLog.name }}</div>
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
import { deck, decks, findCard, findCardByName, searchOnline, actionToText, setHTMLClass, safeDeck } from '@/global'
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
            logDeleteCheck: '',
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
    grid-template-columns: 1fr 15fr 1fr;
}
</style>
