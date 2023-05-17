<script setup lang="ts">
import type { Card, Box } from "@/types";
import BaseTemplate from "@/components/BaseTemplate.vue";
import { fetchCards, changeProgress } from "@/apicalls";
import { ref, watch, onMounted } from "vue";
import { useSwipe } from "@vueuse/core";
import { useRouter } from "vue-router";
import { chosenBox } from "@/store";
import { spokenText } from "@/spokenText";

const activeBox = ref<Box | null>(null);
const front = ref(true);
const right = 1;
const wrong = 2;
const newCards = ref(true);
const el = ref();
const { direction } = useSwipe(el);
const router = useRouter();
spokenText.init();

async function fetchData() {
  activeBox.value = await fetchCards(chosenBox.value);
  activeBox.value.deleteEmptyCards();
  activeBox.value.shuffle();
}
onMounted(fetchData);
watch(direction, () => {
  if (direction.value === "LEFT") router.push({ name: "learnToHome" });
});

let activeCard = ref<Card | null>();
watch(activeCard, () => {
  if (activeCard.value === null) {
    activeCard.value = ["Alle Lernkarten gelernt", "", 0, 0, null];
    newCards.value = false;
  }
});
watch(activeBox, () => {
  activeCard.value = activeBox.value!.takeNextValidCard();
});

function nextCard(action: Number = 0) {
  if (activeBox.value === null) {
    return;
  }
  const activeBoxIn = ref<Box>(activeBox.value);
  setTimeout(
    () => {
      activeCard.value = activeBoxIn.value.takeNextValidCard();
    },
    front.value ? 0 : 300
  );
  front.value = true;
  if (activeBox.value.pairs === null) {
    return;
  }
  activeBoxIn.value.pairs![activeBoxIn.value.position][3] = Date.now();
  activeBoxIn.value.cardsForToday -= 1;
  if (action === right) {
    activeBoxIn.value.pairs![activeBoxIn.value.position][2] = Math.min(
      activeBoxIn.value.pairs![activeBoxIn.value.position][2] + 1,
      6
    );
  } else if (action === wrong) {
    activeBoxIn.value.pairs![activeBoxIn.value.position][2] = Math.max(
      activeBoxIn.value.pairs![activeBoxIn.value.position][2] - 1,
      0
    );
  }
  changeProgress(activeBoxIn.value.pairs![activeBoxIn.value.position]);
  activeBoxIn.value.pairs![activeBox.value.position][3] = Date.now();
}
function listenToSpeech() {
  spokenText.toggleSpeechRecognition();
  if (!spokenText.isListening) {
    front.value = !front.value;
    setTimeout(() => {
      if (spokenText.correctAnswer) {
        nextCard(right);
      } else {
        nextCard(wrong);
      }
    }, 2000);
  }
}
</script>
<template>
  <BaseTemplate
    ref="el"
    iconSmall="carbon:home"
    :iconLeft="front ? 'carbon:microphone' : 'carbon:checkmark'"
    :iconRight="front ? 'carbon:skip-forward' : 'carbon:close'"
    linkSmall="/"
    :title="activeBox ? activeBox.topic : ''"
    :subtitle="
      activeBox?.pairs
        ? `${activeBox.cardsForToday}/${activeBox.pairs.length} Cards`
        : '0'
    "
    @rightClick="front ? nextCard() : nextCard(wrong)"
    <!--
    @leftClick="front ? listenToSpeech() : nextCard(right)"
    --
  >
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
