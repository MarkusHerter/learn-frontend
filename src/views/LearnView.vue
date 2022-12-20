<script setup lang="ts">
import type { Card } from "@/types";
import BaseTemplate from "@/components/BaseTemplate.vue";
import { activeBox } from "@/apicalls";
import { ref, watch } from "vue";
const front = ref(true);
const right = 1;
const wrong = 2;
const newCards = ref(true);
activeBox.deleteEmptyCards();

activeBox.shuffle();
let activeCard = ref<Card | null>();
watch(activeCard, () => {
  if (activeCard.value === null) {
    activeCard.value = ["Alle Lernkarten gelernt", "", 0, 0];
    newCards.value = false;
    console.log(activeCard.value);
  }
});
activeCard.value = activeBox.takeNextValidCard();

function nextCard(action: Number = 0) {
  setTimeout(
    () => {
      activeCard.value = activeBox.takeNextValidCard();
    },
    front.value ? 0 : 300
  );
  front.value = true;
  if (action === right) {
    activeBox.pairs[activeBox.position][2] = Math.min(
      activeBox.pairs[activeBox.position][2] + 1,
      6
    );
    activeBox.pairs[activeBox.position][3] = Date.now();
  } else if (action === wrong) {
    activeBox.pairs[activeBox.position][2] = Math.max(
      activeBox.pairs[activeBox.position][2] - 1,
      0
    );
  }
  activeBox.pairs[activeBox.position][3] = Date.now();
}
</script>
<template>
  <BaseTemplate
    iconSmall="carbon:home"
    :iconLeft="front ? 'carbon:microphone' : 'carbon:checkmark'"
    :iconRight="front ? 'carbon:skip-forward' : 'carbon:close'"
    linkSmall="/"
    title="Spanish"
    @rightClick="front ? nextCard() : nextCard(wrong)"
    @leftClick="front ? '' : nextCard(right)"
  >
    <template #card>
      <div class="flip-box" @click="() => (newCards ? (front = !front) : '')">
        <div
          class="flip-box-inner"
          :style="front ? '' : 'transform:rotateY(180deg)'"
        >
          <div v-if="activeCard" class="flip-box-front">
            <div style="font-size: 1.5rem; padding-top: 40px; overflow: hidden">
              <textarea
                autofocus
                readonly
                spellcheck="false"
                class="text-card"
                :value="activeCard[0]"
              />
            </div>
            <div class="words" contenteditable>
              <p id="p"></p>
            </div>
          </div>
          <div v-if="activeCard" class="flip-box-back">
            <div style="font-size: 1.5rem; padding-top: 40px; overflow: hidden">
              <textarea
                readonly
                class="text-card"
                spellcheck="false"
                :value="activeCard[1]"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    ></BaseTemplate
  >
</template>
