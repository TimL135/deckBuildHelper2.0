<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossorigin="anonymous"
  />
  <div class="container mt-2">
    <div class="round mb-1" style="border: 1px solid #ffa107">
      {{ `Card amount: ${counts.reduce((a, b) => a + b)}` }}
    </div>
    <div class="d-flex mb-1">
      <div
        class="w-25 round-start"
        style="border: 1px solid #ffa107"
        @click="filter[0] = !filter[0]"
        :class="filter[0] ? 'orange text-dark' : ''"
      >
        Fusion:
        <br />
        {{ counts[0] }}
      </div>
      <div
        class="w-25"
        style="border: 1px solid #ffa107"
        @click="filter[1] = !filter[1]"
        :class="filter[1] ? 'orange text-dark' : ''"
      >
        Synchro:
        <br />
        {{ counts[1] }}
      </div>
      <div
        class="w-25"
        style="border: 1px solid #ffa107"
        @click="filter[2] = !filter[2]"
        :class="filter[2] ? 'orange text-dark' : ''"
      >
        XYZ:
        <br />
        {{ counts[2] }}
      </div>
      <div
        class="w-25 round-end"
        style="border: 1px solid #ffa107"
        @click="filter[3] = !filter[3]"
        :class="filter[3] ? 'orange text-dark' : ''"
      >
        Link:
        <br />
        {{ counts[3] }}
      </div>
    </div>
    <br />
    <div class="addViewButtons">
      <div>
        <Button
          type="button"
          class="btn orange round"
          @click="openExtraCardAddModal()"
        >
          <template v-slot:button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </template>
        </Button>
      </div>
      <div>
        <Button
          type="button"
          class="btn orange round"
          @click="deckView = !deckView"
        >
          <template v-slot:button>
            <svg
              v-if="deckView"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-grid"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
              />
            </svg>
          </template>
        </Button>
      </div>
    </div>
    <br />
    <div class="deck" v-if="deckView">
      <div
        v-for="(card, index) of allCards.filter((card) =>
          filter.every((f, i) => (f ? f && card.type == types[i] : true))
        )"
        :key="card.id"
        @click="openCardSelectModal(card)"
      >
        <img
          style="height: 5rem"
          class="mb-1"
          :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card.id}.jpg`"
          alt=""
        />
      </div>
    </div>
    <div v-else>
      <div class="cardTable p-2">
        <div>Cards</div>
        <div></div>
        <div></div>
      </div>
      <div
        class="cardTable p-2"
        v-for="card in deck.extraCards.filter((card) =>
          filter.every((f, i) => (f ? f && card.type == types[i] : true))
        )"
        :key="card.name"
        :class="card.type"
        style="border-bottom: 1px solid black"
      >
        <div @dblclick="searchOnline(card.name)">
          {{ card.name }}({{ card.count }})
        </div>
        <div>
          <img
            style="height: 5rem"
            :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card.id}.jpg`"
            alt=""
          />
        </div>
        <div style="margin-top: -0.5rem">
          <div>
            <Button
              @click="openExtraCardEditModal(card.name)"
              style="background-color: #ffffff00; border: none"
            >
              <template v-slot:button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
              </template>
            </Button>
          </div>
          <div>
            <Button
              @click="openExtraCardDeleteModal(card.name)"
              style="background-color: #ffffff00; border: none"
            >
              <template v-slot:button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
      </div>
    </div>
  </div>
  <!-- new modal -->
  <CardSelectModal
    :selectedCard="selectedCard"
    :openCardEditModal="openExtraCardEditModal"
    :closeCardSelectModal="closeCardSelectModal"
    :openCardDeleteModal="openExtraCardDeleteModal"
  ></CardSelectModal>
  <!-- new modal -->
  <div id="extraCardAddEditModal" class="modal">
    <div class="modal-content">
      <div class="container">
        <div>
          <Select
            @change="alternativeCheck"
            :onSelectItem="alternativeCheck"
            :placeholder="banListStatus ? banListStatus : 'name'"
            v-model="nameInput"
            :options="
              deck.alternativeExtraCards
                ?.map((e) =>
                  Object.fromEntries([
                    ['name', e.name],
                    ['type', e.type],
                  ])
                )
                .concat(extraCardDB)
            "
            :option-projection="(e) => e.name"
            :labelBorder="true"
            :selectOnBlur="true"
            :controlInput="true"
            :noElementMessage="
              deck.alternativeExtraCards?.length
                ? nameInput
                : nameInput
                ? nameInput
                : 'no alternative cards'
            "
            class="orange"
            labelClass="orange"
            listClass="orange text-dark"
            :listItemClass="(item) => item.type || 'orange text-dark'"
            :required="true"
            :error="error.nameInput"
          />
        </div>
        <div class="mb-3">
          <Number
            placeholder="Quantity"
            v-model="countInput"
            :min="maxCount ? 1 : 0"
            :max="maxCount"
            class="orange"
            labelClass="orange"
            listClass="orange text-dark"
            :labelBorder="true"
            :required="true"
            :error="error.countInput"
          />
        </div>
        <br />
        <div>
          <Button
            type="submit"
            class="btn w-100 mt-1 orange round"
            @click="editAddExtraCard()"
          >
            <template v-slot:button>&#10004;</template>
          </Button>
        </div>
      </div>
    </div>
  </div>
  <!-- new modal -->
  <DeleteCardModal
    :deleteCardId="deleteCardId"
    :nameInput="nameInput"
    :closeModal="closeExtraCardDeleteModal"
    :deleteCard="deleteExtraCard"
  ></DeleteCardModal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  decks,
  deck,
  searchOnline,
  safeDeck,
  findCardByName,
} from "../../global";
import { extraCardDB, banList } from "../../API";
import * as type from "../../types";
import * as Inputs from "../../components/SexyInputs/index";
import DeleteCardModal from "./DeleteCardModal.vue";
import CardSelectModal from "./CardSelectModal.vue";
export default defineComponent({
  components: { ...Inputs, DeleteCardModal, CardSelectModal },
  watch: { deck: "countExtraCards" },
  setup() {
    return { decks, deck, searchOnline, findCardByName, extraCardDB, banList };
  },
  mounted() {
    this.countExtraCards();
  },
  data() {
    return {
      allCards: [],
      type: "fusion",
      nameInput: "",
      countInput: "",
      editCardId: 0,
      deleteCardId: 0,
      editAdd: "",
      filter: [false, false, false, false],
      types: ["fusion", "synchro", "xyz", "link"],
      counts: [0, 0, 0, 0, 0, 0, 0, 0],
      error: {},
      deckView: true,
      selectedCard: {},
      maxCount: 3,
      banListStatus: "",
    };
  },
  methods: {
    editAddExtraCard() {
      this.error = {};
      if (!this.nameInput) this.error.nameInput = "enter a name";
      if (this.countInput === 0) this.error.countInput = "this card is banned";
      else if (!this.countInput) this.error.countInput = "enter a amount";
      if (Object.keys(this.error).length > 0) return;
      switch (this.editAdd) {
        case "add":
          this.addExtraCard();
          break;
        case "edit":
          this.editExtraCard();
          break;
      }
    },
    openCardSelectModal(card: type.Card) {
      this.selectedCard = card;
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardSelectModal"))
          this.closeCardSelectModal();
      };
      let modal = document.getElementById("cardSelectModal");
      if (modal) modal.style.display = "block";
    },
    closeCardSelectModal() {
      this.selectedCard = {};
      let modal = document.getElementById("cardSelectModal");
      if (modal) modal.style.display = "none";
    },
    openExtraCardAddModal() {
      window.onclick = (event) => {
        if (event.target == document.getElementById("extraCardAddEditModal"))
          this.closeExtraCardAddEditModal();
      };
      this.error = {};
      this.editAdd = "add";
      this.nameInput = "";
      var modal = document.getElementById("extraCardAddEditModal");
      if (modal) modal.style.display = "block";
    },
    openExtraCardEditModal(card: type.Card) {
      this.closeCardSelectModal();
      window.onclick = (event) => {
        if (event.target == document.getElementById("extraCardAddEditModal"))
          this.closeExtraCardAddEditModal();
      };
      this.error = {};
      this.editAdd = "edit";
      this.editCardId = this.deck.extraCards.findIndex((c) => c.id == card.id);
      this.type = card.type;
      this.nameInput = card.name;
      this.countInput = card.count;
      var modal = document.getElementById("extraCardAddEditModal");
      if (modal) modal.style.display = "block";
    },
    closeExtraCardAddEditModal() {
      this.reset();
      var modal = document.getElementById("extraCardAddEditModal");
      if (modal) modal.style.display = "none";
    },
    openExtraCardDeleteModal(card: type.Card) {
      this.closeCardSelectModal();
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardDeleteModal"))
          this.closeExtraCardDeleteModal();
      };
      this.deleteCardId = this.deck.extraCards.findIndex(
        (c) => c.id == card.id
      );
      this.nameInput = card.name;
      var modal = document.getElementById("cardDeleteModal");
      if (modal) modal.style.display = "block";
    },
    closeExtraCardDeleteModal() {
      var modal = document.getElementById("cardDeleteModal");
      if (modal) modal.style.display = "none";
    },
    alternativeCheck(card) {
      this.maxCount = 3;
      this.nameInput.trim();
      this.banListStatus = "";
      let map = {
        0: "Banned",
        1: "Limited",
        2: "Semi-Limited",
      };
      banList?.forEach((card) => {
        if (card.name == this.nameInput) {
          if (this.countInput > card.max) this.countInput = card.max;
          this.maxCount = card.max;
          this.banListStatus = map[card.max];
        }
      });
      this.type = card.type;
      this.deck.alternativeExtraCards.forEach((card) => {
        if (card.name == this.nameInput) {
          this.type = card.type;
          this.countInput = card.count;
        }
      });
    },
    addExtraCard() {
      this.nameInput.trim();
      if (this.deck.alternativeExtraCards)
        this.deck.alternativeExtraCards =
          this.deck.alternativeExtraCards.filter(
            (card) => card.name != this.nameInput
          );
      if (this.deck.extraCards.findIndex((c) => c.name == this.nameInput) != -1)
        return this.closeExtraCardAddEditModal();
      if (
        this.counts.reduce((a, b) => a + b) + parseInt(this.countInput) >
        15
      ) {
        this.deck.alternativeExtraCards.push({
          name: this.nameInput,
          type: this.type,
          count: parseInt(this.countInput),
          id: extraCardDB.find((e) => e.name == this.nameInput)?.id,
        });
        safeDeck(this.deck);
        this.closeExtraCardAddEditModal();
        return;
      }
      this.deck.extraCards.push({
        name: this.nameInput,
        count: parseInt(this.countInput),
        type: this.type as type.ExtraCardType,
        id: extraCardDB.find((e) => e.name == this.nameInput)?.id,
      });
      this.countExtraCards();
      this.sortDeck();
      safeDeck(this.deck);
      this.closeExtraCardAddEditModal();
    },
    editExtraCard() {
      if (
        this.counts.reduce((a, b) => a + b) -
          this.deck.extraCards[this.editCardId].count +
          parseInt(this.countInput) >
        15
      )
        return this.closeExtraCardAddEditModal();
      this.nameInput.trim();
      this.deck.extraCards[this.editCardId] = {
        name: this.nameInput,
        count: parseInt(this.countInput),
        type: this.type as type.ExtraCardType,
        id: this.deck.extraCards.find((c) => c.name == this.nameInput)?.id,
      };
      this.countExtraCards();
      this.sortDeck();
      safeDeck(this.deck);
      this.closeExtraCardAddEditModal();
    },
    deleteExtraCard() {
      if (this.deck.alternativeExtraCards) {
        this.deck.alternativeExtraCards.push(
          this.deck.extraCards[this.deleteCardId]
        );
      } else {
        this.deck.alternativeExtraCards = [
          this.deck.extraCards[this.deleteCardId],
        ];
      }

      this.deck.extraCards.splice(this.deleteCardId, 1);
      this.countExtraCards();
      safeDeck(this.deck);
      this.closeExtraCardDeleteModal();
    },
    countExtraCards() {
      if (!this.deck) return;
      this.allCards = [];
      this.counts = [0, 0, 0, 0];
      for (let card of this.deck.extraCards) {
        let count = card.count;
        for (count; count; count--) {
          this.allCards.push(card);
        }
        switch (card.type) {
          case "fusion":
            this.counts[0] += card.count;
            break;
          case "synchro":
            this.counts[1] += card.count;
            break;
          case "xyz":
            this.counts[2] += card.count;
            break;
          case "link":
            this.counts[3] += card.count;
            break;
        }
      }
    },
    reset() {
      this.type = "fusion";
      this.nameInput = "";
      this.countInput = "";
    },
    sortDeck() {
      this.allCards
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        .sort((a, b) => b.count - a.count)
        .sort(function (a, b) {
          let map = {
            fusion: 1,
            synchro: 2,
            xyz: 3,
            link: 4,
          };
          return map[a.type] - map[b.type];
        });

      this.deck.extraCards
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        .sort((a, b) => b.count - a.count)
        .sort(function (a, b) {
          let map = {
            fusion: 1,
            synchro: 2,
            xyz: 3,
            link: 4,
          };
          return map[a.type] - map[b.type];
        });
    },
  },
});
</script>
<style lang="scss" scoped>
.cardTable {
  display: grid;
  grid-template-columns: 3fr 3fr 1fr;
}
</style>
