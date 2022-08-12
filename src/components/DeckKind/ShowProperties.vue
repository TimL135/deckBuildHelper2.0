<template>
  <div class="d-flex mb-1">
    <div
      class="w-25 round-start"
      style="border: 1px solid #ffa107"
      @click="filter[0] = !filter[0]"
      :class="filter[0] ? 'orange text-dark' : ''"
    >
      Handtraps:
      <br />
      {{ counts[0] }}({{ uniqueCounts[0] }})
    </div>
    <div
      class="w-25"
      style="border: 1px solid #ffa107"
      @click="filter[1] = !filter[1]"
      :class="filter[1] ? 'orange text-dark' : ''"
    >
      Seacher:
      <br />
      {{ counts[1] }}({{ uniqueCounts[1] }})
    </div>
    <div
      class="w-25"
      style="border: 1px solid #ffa107"
      @click="filter[2] = !filter[2]"
      :class="filter[2] ? 'orange text-dark' : ''"
    >
      Combo Starter:
      <br />
      {{ counts[2] }}({{ uniqueCounts[2] }})
    </div>
    <div
      class="w-25 round-end"
      style="border: 1px solid #ffa107"
      @click="filter[3] = !filter[3]"
      :class="filter[3] ? 'orange text-dark' : ''"
    >
      Negate:
      <br />
      {{ counts[3] }}({{ uniqueCounts[3] }})
    </div>
  </div>
  <div class="d-flex mb-1">
    <div
      class="w-25 round-start"
      style="border: 1px solid #ffa107"
      @click="filter[4] = !filter[4]"
      :class="filter[4] ? 'orange text-dark' : ''"
    >
      Once per Turn:
      <br />
      {{ counts[4] }}({{ uniqueCounts[4] }})
    </div>
    <div
      class="w-25"
      style="border: 1px solid #ffa107"
      @click="filter[5] = !filter[5]"
      :class="filter[5] ? 'orange text-dark' : ''"
    >
      Searchable:
      <br />
      {{ counts[5] }}({{ uniqueCounts[5] }})
    </div>
    <div
      class="w-25"
      style="border: 1px solid #ffa107"
      @click="filter[6] = !filter[6]"
      :class="filter[6] ? 'orange text-dark' : ''"
    >
      Combo Piece:
      <br />
      {{ counts[6] }}({{ uniqueCounts[6] }})
    </div>
    <div
      class="w-25 round-end"
      style="border: 1px solid #ffa107"
      @click="filter[7] = !filter[7]"
      :class="filter[7] ? 'orange text-dark' : ''"
    >
      Interruption:
      <br />
      {{ counts[7] }}({{ uniqueCounts[7] }})
    </div>
  </div>
  <div class="d-flex mb-1">
    <div
      class="w-25 round-start"
      style="border: 1px solid #ffa107"
      @click="filter[8] = !filter[8]"
      :class="filter[8] ? 'orange text-dark' : ''"
    >
      Break:
      <br />
      {{ counts[8] }}({{ uniqueCounts[8] }})
    </div>
    <div
      class="w-25"
      style="border: 1px solid #ffa107"
      @click="filter[9] = !filter[9]"
      :class="filter[9] ? 'orange text-dark' : ''"
    >
      Protect:
      <br />
      {{ counts[9] }}({{ uniqueCounts[9] }})
    </div>
    <div
      class="w-25"
      style="border: 1px solid #ffa107"
      @click="filter[10] = !filter[10]"
      :class="filter[10] ? 'orange text-dark' : ''"
    >
      Extender:
      <br />
      {{ counts[10] }}({{ uniqueCounts[10] }})
    </div>
    <div
      class="w-25 round-end"
      style="border: 1px solid #ffa107"
      @click="filter[11] = !filter[11]"
      :class="filter[11] ? 'orange text-dark' : ''"
    >
      Destory:
      <br />
      {{ counts[11] }}({{ uniqueCounts[11] }})
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    counts: {
      type: Array as any,
      required: true,
    },
    uniqueCounts: {
      type: Array as any,
      required: true,
    },
    filter: {
      type: Array as any,
      required: true,
    },
  },
});
</script>
