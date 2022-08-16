<template>
  <div class="container" style="margin-top: 3vh">
    <div>
      <Button
        type="button"
        class="btn orange round"
        @click="openCardAddModal()"
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
    <div>1</div>
    <div class="deck">
      <div
        v-for="card of OwnCards.filter((e) => e.count == 1)"
        :key="card.name"
        @click="openCardSelectModal(card)"
      >
        <img
          v-if="navigator.onLine && card?.id"
          style="height: 5rem"
          :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card?.id}.jpg`"
          alt=""
        />
        <div v-else :class="card?.type">
          {{ card?.name }}
        </div>
      </div>
    </div>
    <div>2</div>
    <div class="deck">
      <div
        v-for="card of OwnCards.filter((e) => e.count == 2)"
        :key="card.name"
        @click="openCardSelectModal(card)"
      >
        <img
          v-if="navigator.onLine && card?.id"
          style="height: 5rem"
          :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card?.id}.jpg`"
          alt=""
        />
        <div v-else :class="card?.type">
          {{ card?.name }}
        </div>
      </div>
    </div>
    <div>3 or more</div>
    <div class="deck">
      <div
        v-for="card of OwnCards.filter((e) => e.count >= 3)"
        :key="card.name"
        @click="openCardSelectModal(card)"
      >
        <img
          v-if="navigator.onLine && card?.id"
          style="height: 5rem"
          :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card?.id}.jpg`"
          alt=""
        />
        <div v-else :class="card?.type">
          {{ card?.name }}
        </div>
      </div>
    </div>
  </div>
  <!-- new modal -->
  <CardSelectModal
    :selectedCard="selectedCard"
    :openCardEditModal="openCardEditModal"
    :closeCardSelectModal="closeCardSelectModal"
    :openCardDeleteModal="openCardDeleteModal"
  ></CardSelectModal>
  <!-- new modal -->
  <DeleteCardModal
    :deleteCardId="deleteCardId"
    :nameInput="primitives.nameInput"
    :closeModal="closeCardDeleteModal"
    :deleteCard="deleteCard"
  ></DeleteCardModal>
  <!-- new modal -->
  <div id="cardAddEditModal" class="modal">
    <div class="modal-content">
      <div class="container">
        <div>
          <Select
            :placeholder="'name'"
            v-model="primitives.nameInput"
            :options="db"
            :option-projection="(e) => e.name"
            :labelBorder="true"
            :selectOnBlur="true"
            :controlInput="true"
            noElementMessage="
             card not found
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
            min="1"
            class="orange"
            labelClass="orange"
            listClass="orange text-dark"
            :labelBorder="true"
            :required="true"
            :error="primitives.error.countInput"
          />
        </div>

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
  <!-- new modal -->
  <div id="confirmModal" class="modal">
    <div class="modal-content">
      <div class="container">
        <div class="orange round text-dark mb-1">
          {{
            `you have ${selectedCard.count}x ${selectedCard.name} add ${selectedAmount} more`
          }}
        </div>
        <div class="deleteModal">
          <div>
            <Button
              type="button"
              class="agree"
              style="grid-area: yes"
              @click="addCopy()"
            >
              <template v-slot:button>
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
              </template>
            </Button>
          </div>
          <div>
            <Button
              type="button"
              class="disAgree"
              style="grid-area: no"
              @click="closeConfirmModal()"
            >
              <template v-slot:button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                  />
                </svg>
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { findCard, searchOnline, OwnCards, safeOwnCards } from "../global";
import { setOwnCards, db } from "../API";
import { defineComponent } from "vue";
import * as type from "../types";
import * as Inputs from "./SexyInputs/index";
import DefaultCardInputModal from "./DeckKind/DefaultCardInputModal.vue";
import DeleteCardModal from "./DeckKind/DeleteCardModal.vue";
import CardSelectModal from "./DeckKind/CardSelectModal.vue";
export default defineComponent({
  components: {
    ...Inputs,
    DefaultCardInputModal,
    DeleteCardModal,
    CardSelectModal,
  },
  setup() {
    return {
      navigator,
      OwnCards,
      db,
      findCard,
      searchOnline,
    };
  },
  data() {
    return {
      selectedCard: {},
      selectedAmount: 0,
      editAdd: "",
      deleteCardId: "",
      primitives: {
        error: {},
        nameInput: "",
        countInput: "",
      },
    };
  },
  mounted() {},
  methods: {
    openConfirmModal(card: type.Card, number: number) {
      this.selectedCard = card;
      this.selectedAmount = number;
      window.onclick = (event) => {
        if (event.target == document.getElementById("confirmModal"))
          this.closeCardSelectModal();
      };
      let modal = document.getElementById("confirmModal");
      if (modal) modal.style.display = "block";
    },
    closeConfirmModal() {
      this.selectedCard = {};
      let modal = document.getElementById("confirmModal");
      if (modal) modal.style.display = "none";
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

    openCardDeleteModal(card: type.Card) {
      this.closeCardSelectModal();
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardDeleteModal"))
          this.closeCardDeleteModal();
      };
      this.deleteCardId = this.OwnCards.findIndex((c) => c.id == card.id);
      this.primitives.nameInput = card.name;
      let modal = document.getElementById("cardDeleteModal");
      if (modal) modal.style.display = "block";
    },
    closeCardDeleteModal() {
      this.inputReset();
      let modal = document.getElementById("cardDeleteModal");
      if (modal) modal.style.display = "none";
    },

    openCardAddModal() {
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardAddEditModal"))
          this.closeCardAddEditModal();
      };
      this.primitives.error = {};
      this.editAdd = "add";
      let modal = document.getElementById("cardAddEditModal");
      if (modal) modal.style.display = "block";
    },
    openCardEditModal(card: type.Card) {
      this.closeCardSelectModal();
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardAddEditModal"))
          this.closeCardAddEditModal();
      };
      this.editCardIndex = this.OwnCards.findIndex((c) => c.id == card.id);
      this.primitives.error = {};
      this.editAdd = "edit";
      this.primitives.nameInput = card.name;
      this.primitives.countInput = card.count;
      this.type = card.type;
      let modal = document.getElementById("cardAddEditModal");
      if (modal) modal.style.display = "block";
    },
    closeCardAddEditModal() {
      this.inputReset();
      var modal = document.getElementById("cardAddEditModal");
      if (modal) modal.style.display = "none";
    },
    editAddCard() {
      this.primitives.error = {};
      if (!this.primitives.nameInput)
        this.primitives.error.nameInput = "enter a name";
      else if (!this.primitives.countInput)
        this.primitives.error.countInput = "enter a amount";
      if (Object.keys(this.primitives.error).length > 0) return;
      switch (this.editAdd) {
        case "add":
          this.addCard();
          break;
        case "edit":
          this.editCard();
          break;
      }
    },
    addCopy() {
      this.OwnCards.find((e) => e.name == this.selectedCard.name).count +=
        this.selectedAmount;
      this.closeConfirmModal();
    },
    addCard() {
      this.primitives.nameInput.trim();
      let card = this.OwnCards.find((e) => e.name == this.primitives.nameInput);
      let number = this.primitives.countInput;
      if (card) {
        this.closeCardAddEditModal();
        this.openConfirmModal(card, number);
        return;
      }
      this.OwnCards.push({
        name: this.primitives.nameInput,
        count: parseInt(this.primitives.countInput),
        id: db.find((e) => e.name == this.primitives.nameInput)?.id,
        type: this.type,
      });

      safeOwnCards();
      this.closeCardAddEditModal();
    },

    editCard() {
      this.primitives.nameInput.trim();
      this.OwnCards[this.editCardIndex] = {
        name: this.primitives.nameInput,
        type: this.type,
        count: parseInt(this.primitives.countInput),
        id: this.OwnCards[this.editCardIndex].id,
      };
      safeOwnCards();
      this.closeCardAddEditModal();
    },
    inputReset() {
      this.editCardIndex = 0;
      this.deleteCardId = 0;
      this.primitives.nameInput = "";
      this.primitives.countInput = "";
    },
    deleteCard(cardIndex: number) {
      this.OwnCards.splice(cardIndex, 1);
      safeOwnCards();
      this.closeCardDeleteModal();
    },
  },
});
</script>
<style lang="scss" scoped></style>
