<template>
  <div id="cardAddEditModal" class="modal">
    <div class="modal-content">
      <div class="container">
        <div>
          <Select
            @change="alternativeCheck"
            :onSelectItem="alternativeCheck"
            :placeholder="
              primitives.banListStatus ? primitives.banListStatus : 'name'
            "
            v-model="primitives.nameInput"
            :options="
              deck.alternativeCards
                ?.map((e) =>
                  Object.fromEntries([
                    ['name', e.name],
                    ['type', e.type],
                  ])
                )
                .concat(mainCardDB)
            "
            :option-projection="(e) => e.name"
            :labelBorder="true"
            :selectOnBlur="true"
            :controlInput="true"
            :noElementMessage="
              deck.alternativeCards?.length
                ? primitives.nameInput
                : primitives.nameInput
                ? primitives.nameInput
                : 'no alternative cards'
            "
            class="orange"
            labelClass="orange"
            listClass="orange text-dark"
            :listItemClass="(item) => item.type || 'orange text-dark'"
            :required="true"
            :error="primitives.error.nameInput"
          />
        </div>
        <div class="mb-3">
          <Number
            placeholder="Quantity"
            v-model="primitives.countInput"
            :min="primitives.maxCount ? 1 : 0"
            :max="primitives.maxCount"
            class="orange"
            labelClass="orange"
            listClass="orange text-dark"
            :labelBorder="true"
            :required="true"
            :error="primitives.error.countInput"
          />
        </div>
        <div class="properties mt-3">
          <div
            @click="properties[0] = !properties[0]"
            style="border: 1px solid rgb(12, 12, 12)"
            class="round-start"
            :class="properties[0] ? 'green text-black' : 'orange text-dark'"
          >
            Handtrap
          </div>
          <div
            @click="properties[1] = !properties[1]"
            style="border: 1px solid rgb(12, 12, 12)"
            :class="properties[1] ? 'green text-black' : 'orange text-dark'"
          >
            Searcher
          </div>
          <div
            @click="properties[2] = !properties[2]"
            style="border: 1px solid rgb(12, 12, 12)"
            :class="properties[2] ? 'green text-black' : 'orange text-dark'"
          >
            Combo Starter
          </div>
          <div
            @click="properties[3] = !properties[3]"
            style="border: 1px solid rgb(12, 12, 12)"
            class="round-end"
            :class="properties[3] ? 'green text-black' : 'orange text-dark'"
          >
            Negate
          </div>
        </div>
        <div class="properties mt-1">
          <div
            @click="properties[4] = !properties[4]"
            style="border: 1px solid rgb(12, 12, 12)"
            class="round-start"
            :class="properties[4] ? 'green text-black' : 'orange text-dark'"
          >
            Once per Turn
          </div>
          <div
            @click="properties[5] = !properties[5]"
            style="border: 1px solid rgb(12, 12, 12)"
            :class="properties[5] ? 'green text-black' : 'orange text-dark'"
          >
            Searchable
          </div>
          <div
            @click="properties[6] = !properties[6]"
            style="border: 1px solid rgb(12, 12, 12)"
            :class="properties[6] ? 'green text-black' : 'orange text-dark'"
          >
            Combo Piece
          </div>
          <div
            @click="properties[7] = !properties[7]"
            style="border: 1px solid rgb(12, 12, 12)"
            class="round-end"
            :class="properties[7] ? 'green text-black' : 'orange text-dark'"
          >
            Interruption
          </div>
        </div>
        <div class="properties mt-1">
          <div
            @click="properties[8] = !properties[8]"
            style="border: 1px solid rgb(12, 12, 12)"
            class="round-start"
            :class="properties[8] ? 'green text-black' : 'orange text-dark'"
          >
            Brick
          </div>
          <div
            @click="properties[9] = !properties[9]"
            style="border: 1px solid rgb(12, 12, 12)"
            :class="properties[9] ? 'green text-black' : 'orange text-dark'"
          >
            Protect
          </div>
          <div
            @click="properties[10] = !properties[10]"
            style="border: 1px solid rgb(12, 12, 12)"
            :class="properties[10] ? 'green text-black' : 'orange text-dark'"
          >
            Extender
          </div>
          <div
            @click="properties[11] = !properties[11]"
            style="border: 1px solid rgb(12, 12, 12)"
            class="round-end"
            :class="properties[11] ? 'green text-black' : 'orange text-dark'"
          >
            Destory
          </div>
        </div>
        <div class="value mt-3">
          <div
            @click="primitives.value = -1"
            style="border: 1px solid rgb(12, 12, 12)"
            class="round-start"
            :class="
              primitives.value == -1 ? 'green text-black' : 'orange text-dark'
            "
          >
            -1
          </div>
          <div
            @click="primitives.value = 0"
            style="border: 1px solid rgb(12, 12, 12)"
            :class="
              primitives.value == 0 ? 'green text-black' : 'orange text-dark'
            "
          >
            0
          </div>
          <div
            @click="primitives.value = 0.5"
            style="border: 1px solid rgb(12, 12, 12)"
            :class="
              primitives.value == 0.5 ? 'green text-black' : 'orange text-dark'
            "
          >
            Maybe +1
          </div>
          <div
            @click="primitives.value = 1"
            style="border: 1px solid rgb(12, 12, 12)"
            class="round-end"
            :class="
              primitives.value == 1 ? 'green text-black' : 'orange text-dark'
            "
          >
            1
          </div>
        </div>
        <br />
        <div>
          <Button
            type="button"
            class="btn w-100 mt-1 orange round"
            @click="editAddCard()"
          >
            <template v-slot:button> &#10004;</template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as Inputs from "../../components/SexyInputs/index";
export default defineComponent({
  components: { ...Inputs },
  props: {
    counts: {
      type: Array,
      required: true,
    },
    properties: {
      type: Array,
      required: true,
    },
    editAddCard: {
      type: Function,
      required: true,
    },
    alternativeCheck: {
      type: Function,
      required: true,
    },
    mainCardDB: {
      type: Array,
      required: true,
    },
    deck: {
      type: Object,
      required: true,
    },
    primitives: {
      type: Object,
      required: true,
    },
  },
});
</script>
