<template>
  <div id="cardDeleteModal" class="modal">
    <div class="modal-content">
      <div class="container">
        <div class="d-flex justify-content: center mb-1">
          <div class="w-100 orange text-dark round round">
            Are you sure to delete {{ nameInput }}
          </div>
        </div>
        <div class="deleteModal">
          <div>
            <Button
              type="button"
              class="agree"
              style="grid-area: yes"
              @click="deleteCard(deleteCardId)"
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
              @click="closeModal()"
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
import { defineComponent } from "vue";
import * as Inputs from "../../components/SexyInputs/index";
export default defineComponent({
  components: { ...Inputs },
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
    deleteCard: {
      type: Function,
      required: true,
    },
    nameInput: {
      type: String,
      required: true,
    },
    deleteCardId: {
      type: String,
      required: true,
    },
  },
});
</script>
