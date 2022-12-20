<script setup lang="ts">
import BaseTemplate from "@/components/BaseTemplate.vue";
import { activeBox } from "@/apicalls";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps<{ index: number }>();
const front = ref<Boolean>();
const textFront = ref<string>(activeBox.pairs[props.index][0]);
const textBack = ref<string>(activeBox.pairs[props.index][1]);
const frontText = ref();
const backText = ref();
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
    @rightClick="
      () => {
        if (front) {
          textFront = activeBox.pairs[props.index][0];
          frontText.focus();
        } else {
          textBack = activeBox.pairs[props.index][1];
          backText.focus();
        }
      }
    "
    @leftClick="
      () => {
        activeBox.pairs[props.index] = [textFront, textBack, 0, 0];
        router.push('/select-edit');
      }
    "
  >
    <template #card>
      <div class="flip-box" @click="() => (front = !front)">
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
