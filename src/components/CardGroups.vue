<template>
  <div class="container" style="margin-top: 3vh">
    <div>
      <Button
        type="button"
        class="w-100 btn orange round"
        @click="openCardGroupAddModal()"
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
    <br />
    <!-- new table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="w-25">active Cardgroups</th>
          <th class="w-25"></th>
          <th class="w-75">Cards</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="cardGroup in deck.cardGroups.filter((c) => c.active)"
          :key="cardGroup.name"
        >
          <td>{{ cardGroup.name }}</td>
          <td>
            <div>
              <Button
                @click="
                  openCardGroupEditModal(
                    deck.cardGroups.findIndex((c) => c == cardGroup)
                  )
                "
                class="me-2"
                style="background-color: #ffffff00; border: none"
              >
                <template v-slot:button>
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
                </template>
              </Button>
            </div>
            <div>
              <Button
                @click="
                  openCardGroupDeleteModal(
                    deck.cardGroups.findIndex((c) => c == cardGroup)
                  )
                "
                class="me-2"
                style="background-color: #ffffff00; border: none"
              >
                <template v-slot:button>
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
                </template>
              </Button>
            </div>
          </td>
          <td>
            <div
              v-for="card in cardGroup.cards"
              :key="card"
              class="mb-1"
              :class="findCard(card)?.type + ' text-dark'"
              @dblclick="searchOnline(findCard(card)?.name)"
            >
              {{ findCard(card)?.name }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="w-25">not active Cardgroups</th>
          <th class="w-25"></th>
          <th class="w-75">Cards</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="cardGroup in deck.cardGroups.filter((c) => !c.active)"
          :key="cardGroup.name"
        >
          <td>{{ cardGroup.name }}</td>
          <td>
            <div>
              <Button
                @click="
                  openCardGroupEditModal(
                    deck.cardGroups.findIndex((c) => c == cardGroup)
                  )
                "
                class="me-2"
                style="background-color: #ffffff00; border: none"
              >
                <template v-slot:button>
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
                </template>
              </Button>
            </div>
            <div>
              <Button
                @click="
                  openCardGroupDeleteModal(
                    deck.cardGroups.findIndex((c) => c == cardGroup)
                  )
                "
                class="me-2"
                style="background-color: #ffffff00; border: none"
              >
                <template v-slot:button>
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
                </template>
              </Button>
            </div>
          </td>
          <td>
            <div
              v-for="card in cardGroup.cards"
              :key="card"
              class="mb-1"
              :class="findCard(card)?.type + ' text-dark'"
              @dblclick="searchOnline(findCard(card)?.name)"
            >
              {{ findCard(card)?.name }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- new modal -->
  <div id="cardGroupAddEditModal" class="modal">
    <div class="modal-content">
      <form @submit.prevent="editAddCard()">
        <div class="mb-1">
          <Text
            placeholder="name"
            v-model="cardGroupNameInput"
            :labelBorder="true"
            class="orange"
            labelClass="orange"
            :required="true"
          />
        </div>
        <div>
          <MultiSelect
            v-model="cardInput"
            placeholder="cards"
            :options="deck.cards.map((a) => a.name)"
            class="orange"
            labelClass="orange"
            :label-border="true"
            listClass="orange text-dark"
            :listItemClass="
              (item) =>
                findCardByName(item)?.type + ' text-dark' || 'orange text-dark'
            "
            :multiSelect="cardInputs"
            :multiSelectClass="
              (e) =>
                findCardByName(e)?.type + ' text-dark' || 'orange text-dark'
            "
            @selectItem="
              (a) => {
                cardInputs.push(a);
                cardInput = '';
              }
            "
            @deleteItem="
              (index) => {
                cardInputs = cardInputs.filter((v, i) => i != index);
              }
            "
          />
        </div>
        <div>
          <Button
            type="submit"
            class="btn orange w-100 mt-1 round"
            style="float: right"
          >
            <template v-slot:button> &#10004;</template>
          </Button>
        </div>
      </form>
    </div>
  </div>
  <!-- new modal -->
  <div id="cardGroupDeleteModal" class="modal">
    <div class="modal-content">
      <div class="container">
        <div class="d-flex justify-content: center mb-1">
          <div class="w-100 orange text-dark round">
            Are you sure to delete {{ deleteCardGroupName }}
          </div>
        </div>
        <div class="deleteModal">
          <div>
            <Button
              type="button"
              class="agree"
              style="grid-area: yes"
              @click="deleteCardGroup()"
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
              @click="closeCardGroupDeleteModal()"
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
import {
  decks,
  deck,
  uniqueAllCards,
  findCard,
  findCardByName,
  searchOnline,
  setHTMLClass,
  safeDeck,
  findCardGroup,
} from "../global";
import { defineComponent } from "vue";
import * as Inputs from "../components/SexyInputs/index";
export default defineComponent({
  components: { ...Inputs },
  setup() {
    return {
      decks,
      deck,
      uniqueAllCards,
      findCard,
      findCardByName,
      searchOnline,
    };
  },
  mounted() {
    setHTMLClass("CardGroups");
  },
  data() {
    return {
      deleteCardGroupIndex: 0,
      editCardGroupIndex: 0,
      deleteCardGroupName: "",
      cardGroupNameInput: "",
      editAdd: "",
      cardInputs: [] as string[],
      cardInput: "",
      cardInputTypes: [] as string[],
    };
  },
  methods: {
    editAddCard() {
      switch (this.editAdd) {
        case "add":
          this.addCardGroup();
          break;
        case "edit":
          this.editCardGroup();
          break;
      }
    },
    openCardGroupAddModal() {
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardGroupAddEditModal"))
          this.closeCardGroupAddEditModal();
      };
      this.editAdd = "add";
      var modal = document.getElementById("cardGroupAddEditModal");
      if (modal) modal.style.display = "block";
    },
    closeCardGroupAddEditModal() {
      if (this.deck.cardGroups.length) {
        while (
          this.deck.cardGroups[this.editCardGroupIndex].cards
            .slice(-1)
            .join()
            .includes(". Card")
        ) {
          this.deck.cardGroups[this.editCardGroupIndex].cards.pop();
        }
        if (!this.deck.cardGroups[this.editCardGroupIndex].cards.length) {
          this.deck.cardGroups.splice(this.editCardGroupIndex, 1);
        }
      }
      this.inputReset();
      this.changeType();
      var modal = document.getElementById("cardGroupAddEditModal");
      if (modal) modal.style.display = "none";
    },
    openCardGroupEditModal(index: number) {
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardGroupAddEditModal"))
          this.closeCardGroupAddEditModal();
      };
      this.editAdd = "edit";
      this.editCardGroupIndex = index;
      this.cardGroupNameInput = this.deck.cardGroups[index].name;
      this.cardInputs = [
        ...this.deck.cardGroups[index].cards.map((e) => findCard(e)?.name),
      ];
      this.changeType();
      var modal = document.getElementById("cardGroupAddEditModal");
      if (modal) modal.style.display = "block";
    },
    addCardGroup() {
      let copieCardInputs = [
        ...this.cardInputs.map((e) => findCardByName(e).id),
      ];
      this.cardGroupNameInput.trim();
      if (copieCardInputs.length) {
        this.deck.cardGroups.push({
          name: this.cardGroupNameInput,
          cards: copieCardInputs,
          id: Math.random().toString(36).slice(-15),
          active: true,
        });
      }
      this.closeCardGroupAddEditModal();
      safeDeck(this.deck);
    },
    editCardGroup() {
      let copieCardInputs = [
        ...this.cardInputs.map((e) => findCardByName(e).id),
      ];
      this.cardGroupNameInput.trim();
      if (copieCardInputs.length)
        this.deck.cardGroups[this.editCardGroupIndex].cards = copieCardInputs;
      this.deck.cardGroups[this.editCardGroupIndex].name =
        this.cardGroupNameInput;
      this.closeCardGroupAddEditModal();
      this.checkComboCardGroups();
      this.inputReset();
      this.checkCardInputs();
      safeDeck(this.deck);
    },
    openCardGroupDeleteModal(index: number) {
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardGroupDeleteModal"))
          this.closeCardGroupDeleteModal();
      };
      this.deleteCardGroupName = this.deck.cardGroups[index].name;
      this.deleteCardGroupIndex = index;
      var modal = document.getElementById("cardGroupDeleteModal");
      if (modal) modal.style.display = "block";
    },
    closeCardGroupDeleteModal() {
      this.inputReset();
      var modal = document.getElementById("cardGroupDeleteModal");
      if (modal) modal.style.display = "none";
    },
    deleteCardGroup() {
      this.deck.cardGroups.splice(this.deleteCardGroupIndex, 1);
      safeDeck(this.deck);
      this.closeCardGroupDeleteModal();
    },
    checkCardInputs() {
      this.cardInputs = this.cardInputs.filter((c) => !c.includes(". Card"));
      this.cardInputs.push(`${this.cardInputs.length + 1}. Card`);
      this.changeType();
    },

    inputReset() {
      this.cardGroupNameInput = "";
      this.cardInputs = [];
    },
    changeType() {
      this.cardInputTypes = [];
      for (let i = 0; i < this.cardInputs.length - 1; i++) {
        let card = this.deck.cards.find((c) => c.id == this.cardInputs[i]);
        card
          ? (this.cardInputTypes[i] = card.type)
          : (this.cardInputTypes[i] = "");
      }
    },
    checkComboCardGroups() {
      for (let cardGroup of this.deck.cardGroups) {
        cardGroup.active = cardGroup.cards.some((cardId) =>
          this.deck.cards.map((c) => c.id).includes(cardId)
        );
      }
      for (let combo of this.deck.combos) {
        combo.active = combo.cards.every((card) =>
          findCardGroup(card)
            ? this.deck.cardGroups.find((c) => c.id == card)?.active
            : this.deck.cards.map((c) => c.id).includes(card)
        );
      }
    },
  },
});
</script>
