<template>
  <div class="container" style="margin-top: 3vh">
    <div class="orange text-dark round" @dblclick="reset()">reset</div>
    <div class="showTurn mt-3">
      <div @click="changeTurn(-1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-caret-left-square"
          viewBox="0 0 16 16"
          style="transform: scale(1.5)"
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
          />
          <path
            d="M10.205 12.456A.5.5 0 0 0 10.5 12V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4a.5.5 0 0 0 .537.082z"
          />
        </svg>
      </div>
      <div>{{ `turn: ${turn}` }}</div>
      <div @click="changeTurn(1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-caret-right-square"
          viewBox="0 0 16 16"
          style="transform: scale(1.5)"
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
          />
          <path
            d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"
          />
        </svg>
      </div>
    </div>
    <div class="lifePointHeader mt-3">
      <div>
        <Button class="round orange text-dark" @click="calculate('player1')">
          <template v-slot:button>{{ `player1: ${player1}` }}</template>
        </Button>
      </div>
      <div>
        <Button class="round orange text-dark" @click="calculate('player2')">
          <template v-slot:button>{{ `player2: ${player2}` }}</template>
        </Button>
      </div>
    </div>
    <div class="mt-3" style="min-height: 1.5rem">
      {{ number ? `${selectedSign} ${number}` : "" }}
    </div>
    <div class="calculator mt-3">
      <div class="signField">
        <div v-for="sign of ['+', '-', '/']">
          <Button
            class="round text-dark border-0 h-100"
            :class="selectedSign == sign ? 'green ' : ' orange'"
            @click="selectedSign = sign"
          >
            <template v-slot:button>{{ sign }}</template>
          </Button>
        </div>
        <div>
          <Button
            class="orange text-dark round border-0 h-100"
            @click="clearNumber()"
          >
            <template v-slot:button
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </template>
          </Button>
        </div>
      </div>
      <div class="numberField">
        <div v-for="number of 9" :key="number">
          <Button
            class="orange text-dark round border-0 h-100"
            @click="addNumber(number + '')"
          >
            <template v-slot:button>{{ number }}</template>
          </Button>
        </div>
        <div v-for="number of ['0', '00', '000']" :key="number">
          <Button
            class="orange text-dark round border-0 h-100"
            @click="addNumber(number)"
          >
            <template v-slot:button>{{ number }}</template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as Inputs from "../components/SexyInputs/index";
export default defineComponent({
  components: { ...Inputs },
  data() {
    return {
      player1: 8000,
      player2: 8000,
      number: "",
      selectedSign: "-",
      turn: 1,
    };
  },
  methods: {
    reset() {
      this.player1 = 8000;
      this.player2 = 8000;
      this.turn = 1;
    },
    changeTurn(x: number) {
      this.turn += x;
      if (this.turn < 1) this.turn = 1;
    },
    addNumber(x: string) {
      this.number += x;
    },
    clearNumber() {
      this.number = "";
    },
    calculate(player: "player1" | "player2") {
      switch (this.selectedSign) {
        case "+":
          this[player] += parseInt(this.number);
          break;
        case "-":
          this[player] -= this.number;
          break;
        case "/":
          this[player] = Math.ceil(this[player] / this.number);
          break;
      }
      this.clearNumber();
    },
  },
});
</script>
<style scoped>
.showTurn {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.lifePointHeader {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(50px, auto);
  column-gap: 0.25rem;
}

.calculator {
  display: grid;
  grid-template-columns: 1fr 4fr;
  column-gap: 0.25rem;
}

.numberField {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.25rem;
  row-gap: 0.25rem;
  grid-auto-rows: minmax(75px, auto);
}

.signField {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 0.25rem;
  grid-auto-rows: minmax(75px, auto);
}
</style>
