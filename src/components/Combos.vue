<template>
  <div class="container" style="margin-top: 3vh">
    <div>
      <button
        type="button"
        class="w-100 btn orange"
        @click="openComboAddModal()"
      >
        Add new Combo
      </button>
    </div>
    <br />

    <!-- new table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="w-25">Combo</th>
          <th class="w-25"></th>
          <th class="w-75">Cards</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="combo in deck.combos" :key="combo">
          <td>
            {{ deck.combos.findIndex((c) => c == combo) + 1 }}
          </td>
          <td>
            <button
              @click="
                openComboEditModal(deck.combos.findIndex((c) => c == combo))
              "
              class="me-2"
              style="background-color: #ffffff00; border: none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                class="bi bi-gear"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                />
                <path
                  d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                />
              </svg>
            </button>
            <button
              @click="
                openComboDeleteModal(deck.combos.findIndex((c) => c == combo))
              "
              class="me-2"
              style="background-color: #ffffff00; border: none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
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
            </button>
          </td>
          <td>
            <div
              v-for="card in combo"
              :key="card"
              class="mb-1 green"
              :class="deck.cards.find((c) => c.cardName == card)?.cardType"
            >
              {{ typeof card === "object" ? card.name : card }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- new modal -->
  <div id="comboAddEditModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closeComboAddEditModal()"
        >&times;</span
      >
      <div class="container">
        <div class="d-flex justify-content: center">
          <div class="w-100">
            <select
              class="form-select mb-1"
              v-model="comboCards[0]"
              :class="comboCardsType[0]"
              @change="changeType()"
            >
              <option class="placeholder" selected>1. Card</option>
              <option
                v-for="card in helpDeck"
                :key="card.cardName"
                :class="card.cardType"
              >
                {{ card.cardName }}
              </option>
              <option
                class="placeholder"
                v-for="cardGroup in deck.cardGroups"
                :key="cardGroup.name"
                :value="cardGroup"
              >
                {{ cardGroup.name }}
              </option>
            </select>
            <select
              class="form-select mb-1"
              v-model="comboCards[1]"
              :class="comboCardsType[1]"
              @change="changeType()"
            >
              <option class="placeholder" selected>2. Card</option>
              <option
                v-for="card in helpDeck"
                :key="card.cardName"
                :class="card.cardType"
              >
                {{ card.cardName }}
              </option>
              <option
                class="placeholder"
                v-for="cardGroup in deck.cardGroups"
                :key="cardGroup.name"
                :value="cardGroup"
              >
                {{ cardGroup.name }}
              </option>
            </select>
            <select
              class="form-select mb-1"
              v-model="comboCards[2]"
              :class="comboCardsType[2]"
              @change="changeType()"
            >
              <option class="placeholder" selected>3. Card</option>
              <option
                v-for="card in helpDeck"
                :key="card.cardName"
                :class="card.cardType"
              >
                {{ card.cardName }}
              </option>
              <option
                class="placeholder"
                v-for="cardGroup in deck.cardGroups"
                :key="cardGroup.name"
                :value="cardGroup"
              >
                {{ cardGroup.name }}
              </option>
            </select>
            <select
              class="form-select mb-1"
              v-model="comboCards[3]"
              :class="comboCardsType[3]"
              @change="changeType()"
            >
              <option class="placeholder" selected>4. Card</option>
              <option
                v-for="card in helpDeck"
                :key="card.cardName"
                :class="card.cardType"
              >
                {{ card.cardName }}
              </option>
              <option
                class="placeholder"
                v-for="cardGroup in deck.cardGroups"
                :key="cardGroup.name"
                :value="cardGroup"
              >
                {{ cardGroup.name }}
              </option>
            </select>
            <select
              class="form-select mb-1"
              v-model="comboCards[4]"
              :class="comboCardsType[4]"
              @change="changeType()"
            >
              <option class="placeholder" selected>5. Card</option>
              <option
                v-for="card in helpDeck"
                :key="card.cardName"
                :class="card.cardType"
              >
                {{ card.cardName }}
              </option>
              <option
                class="placeholder"
                v-for="cardGroup in deck.cardGroups"
                :key="cardGroup.name"
                :value="cardGroup"
              >
                {{ cardGroup.name }}
              </option>
            </select>
          </div>
        </div>

        <button
          type="button"
          class="btn orange w-100 mt-1"
          @click="addCombo()"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
  <!-- new modal -->
  <div id="comboDeleteModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closeComboDeleteModal()"
        >&times;</span
      >
      <div class="container">
        <div class="d-flex justify-content: center">
          <div class="w-100 mb-1">
            Are you sure to delete Combo{{ deleteComboIndex + 1 }}
          </div>
        </div>
        <div class="d-flex justify-content: center">
          <button
            type="button"
            class="btn btn-success w-50"
            @click="deleteCombo(deleteCardId)"
          >
            Yes
          </button>
          <button
            type="button"
            class="btn btn-danger w-50"
            @click="closeComboDeleteModal()"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Card, Deck, getData, getDeck, setData, setDeck } from "@/API";
export default defineComponent({
  mounted() {
    if (getData()) {
      this.decks = getData();
    }
    if (getDeck()) {
      this.deck = getDeck();
      this.uniqueCardDeck();
    }
  },
  data() {
    return {
      editAdd:"add",
      deck: {} as Deck,
      editComboIndex: 0,
      deleteComboIndex: 0,
      helpDeck: [] as Card[],
      decks: [] as Deck[],
      comboCards: [
        "1. Card",
        "2. Card",
        "3. Card",
        "4. Card",
        "5. Card",
      ] as any[],
      comboCardsType: [] as string[],
    };
  },
  methods: {
    openComboAddModal() {
      this.editAdd="add"
      var modal = document.getElementById("comboAddEditModal");
      if (modal) modal.style.display = "block";
    },
    closeComboAddEditModal() {
      this.inputReset();
      var modal = document.getElementById("comboAddEditModal");
      if (modal) modal.style.display = "none";
    },
    openComboEditModal(index: number) {
        this.editAdd="edit"
      this.editComboIndex = index;
      let i = 0;
      for (let card of this.deck.combos[index]) {
        this.comboCards[i] = card;
        i++;
      }
      this.changeType();
      var modal = document.getElementById("comboAddEditModal");
      if (modal) modal.style.display = "block";
    },
    openComboDeleteModal(index: number) {
      this.deleteComboIndex = index;
      var modal = document.getElementById("comboDeleteModal");
      if (modal) modal.style.display = "block";
    },
    closeComboDeleteModal() {
      this.inputReset();
      var modal = document.getElementById("comboDeleteModal");
      if (modal) modal.style.display = "none";
    },
    addCombo() {
      let cardArray = [] as string[];
      for (let i = 0; i < 5; i++) {
        if (typeof this.comboCards[i] === "object") {
          cardArray.push(this.comboCards[i]);
        } else {
          if (!this.comboCards[i].includes(". Card")) {
            let card = this.deck.cards.find(
              (x) => x.cardName == this.comboCards[i]
            );
            if (card) {
              cardArray.push(card.cardName);
            }
          }
        }
      }
       switch (this.editAdd) {
        case "add":
          this.deck.combos.push(cardArray);
          break;
        case "edit":
         this.deck.combos[this.editComboIndex] = cardArray;
          break;
      }
       
      this.safeDeck();
      this.closeComboAddEditModal();
    },
    deleteCombo() {
      this.deck.combos.splice(this.deleteComboIndex, 1);
      this.safeDeck();
      this.closeComboDeleteModal();
    },
    uniqueCardDeck() {
      this.helpDeck = [...new Set(this.deck.cards.filter((c) => c.cardName))];
    },
    inputReset() {
      this.comboCards = ["1. Card", "2. Card", "3. Card", "4. Card", "5. Card"];
      this.changeType();
    },
    safeDeck() {
      this.decks[this.decks.findIndex((d) => d.name == this.deck.name)] =
        this.deck;
      setDeck(this.deck);
      setData(this.decks);
    },
    changeType() {
      for (let i = 0; i < 5; i++) {
        let tmp = this.deck.cards.find((c) => c.cardName == this.comboCards[i]);
        if (tmp) {
          this.comboCardsType[i] = tmp.cardType;
        } else {
          this.comboCardsType[i] = "";
        }
      }
    },
  },
});
</script>