import { ref, watch } from "vue";
import type { Card, ChosenBox } from "@/types";

function saveToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key: string, defaultValue: any) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}

export const chosenBox = ref<ChosenBox>(
  loadFromLocalStorage("chosenBox", { id: null, topic: null })
);

export const chosenCard = ref<Card>(
  loadFromLocalStorage("chosenPair", [null, null, null, null, null])
);

export const isAuthenticated = ref<Boolean>(
  loadFromLocalStorage("isAuthenticated", true)
);

export const token = ref<string | null>(loadFromLocalStorage("token", null));
watch(token, (newValue) => saveToLocalStorage("token", newValue));

watch(isAuthenticated, (newValue) =>
  saveToLocalStorage("isAuthenticated", newValue)
);
watch(chosenBox, (newValue) => {
  saveToLocalStorage("chosenBox", newValue);
});

watch(chosenCard, (newValue) => {
  saveToLocalStorage("chosenPair", newValue);
});
