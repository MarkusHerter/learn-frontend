<script setup lang="ts">
import BaseTemplate from "@/components/BaseTemplate.vue";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { chosenCard } from "@/store";
import { updateCard, saveNewCard } from "@/apicalls";
const router = useRouter();
const front = ref<Boolean>(true);
const textFront = ref<string>(chosenCard.value[0]);
const textBack = ref<string>(chosenCard.value[1]);
const frontText = ref();
const backText = ref();
const saveAndExit = async () => {
  chosenCard.value[0] = textFront.value;
  chosenCard.value[1] = textBack.value;
  chosenCard.value[2] = 0;
  chosenCard.value[3] = Date.now();
  const { error } =
    chosenCard.value[4] != null ? await updateCard() : await saveNewCard();
  if (!error) {
    router.push("/select-edit");
  }
};
onMounted(() => {
  watch(front, () =>
    front.value ? frontText.value.focus() : backText.value.focus()
  );
  front.value = true;
});
</script>

<template>
  <BaseTemplate
    iconSmall="carbon:arrow-left"
    iconLeft="carbon:checkmark"
    :disabledLeft="textFront ? false : true"
    iconRight="carbon:undo"
    linkSmall="/select-edit"
    title="Edit"
    @rightClick="() => (front = !front)"
    @leftClick="saveAndExit()"
  >
    <template #card>
      <div class="flip-box">
        <div
          class="flip-box-inner"
          :style="front ? '' : 'transform:rotateY(180deg)'"
        >
          <div class="flip-box-front">
            <div style="font-size: 1.5rem; padding-top: 40px; width: 100%">
              <textarea
                ref="frontText"
                spellcheck="false"
                class="text-card"
                placeholder="Vorderseite"
                v-model="textFront"
              />
            </div>
          </div>
          <div class="flip-box-back">
            <div style="font-size: 1.5rem; padding-top: 40px; overflow: hidden">
              <textarea
                ref="backText"
                spellcheck="false"
                class="text-card"
                placeholder="Rückseite"
                v-model="textBack"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseTemplate>
</template>
