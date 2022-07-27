<template>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossorigin="anonymous"
    />
    <div class="field" v-if="playerSite">
        <div
            v-for="(slot, index) of field?.filter(e => !e.name.includes('enemy'))"
            :key="slot.name"
            :style="`grid-area:slot${index + 1}`"
            style="background-color: gray; border: 2px solid rgb(12, 12, 12)"
            @click="$emit('selectSlot', slot)"
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
    <div class="enemyField" v-else>
        <div
            v-for="(slot, index) of [field[1], field[0], ...field.filter(e => e.name.includes('enemy'))]"
            :key="slot.name"
            :style="`grid-area:slot${index + 1}`"
            style="background-color: gray; border: 2px solid rgb(12, 12, 12)"
            @click="$emit('selectSlot', slot)"
            @dblclick="slot.value.length == 1 && slot.value != slot.name ? searchOnline(slot.value[0]) : null"
            :class="findCardByName(slot.value[0])?.type"
        >
            {{ slot.value[0] }}
        </div>
    </div>
</template>
<script lang="ts">
import { findCard, findCardByName, findCardGroup, findCardGroupByName, searchOnline } from '@/global'
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        return { findCard, findCardByName, findCardGroup, findCardGroupByName, searchOnline }
    },
    props: {
        field: {
            type: Array as any,
            required: true,
        },
        allCards: {
            type: Array,
            required: true,
        },
        banish: {
            type: Array,
            required: true,
        },
        allExtraCards: {
            type: Array,
            required: true,
        },
        graveYard: {
            type: Array,
            required: true,
        },
        playerSite: {
            type: Boolean,
            required: true,
        },
    },
})
</script>
<style scoped>
.field {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(50px, auto);
    grid-template-areas:
        '. . slot1 . slot2 . slot3'
        'slot4 slot5 slot6 slot7 slot8 slot9 slot10'
        'slot11 slot12 slot13 slot14 slot15 slot16 slot17';
}
.enemyField {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(50px, auto);
    grid-template-areas:
        'slot3 . slot1 . slot2 . .'
        'slot4 slot5 slot6 slot7 slot8 slot9 slot10'
        'slot11 slot12 slot13 slot14 slot15 slot16 slot17';
}
</style>
