import { ref } from "vue";
export const chosenBox = ref<{
  id: Number | null;
  topic: String | null;
}>({ id: null, topic: null });
export const chosenPair = ref<[String | null, String | null]>([null, null]);
