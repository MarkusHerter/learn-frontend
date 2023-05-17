<script setup lang="ts">
import BaseTemplate from "@/components/BaseTemplate.vue";
import { fetchCards } from "@/apicalls";
import { chosenBox, chosenCard } from "@/store";
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Card, Box } from "@/types";

const router = useRouter();
const activeBox = ref<Box | null>();
const searchterm = ref<string>("");
const search = ref<Boolean>(false);
const searchInput = ref();
const fetching = ref<Boolean>(true);

async function fetchData() {
  activeBox.value = await fetchCards(chosenBox.value);
  activeBox.value.deleteEmptyCards();
  fetching.value = false;
}
onMounted(fetchData);

const chooseItem = (card: Card) => {
  chosenCard.value = card;
  router.push({
    path: "/edit",
  });
};
const toggleSearchInput = () => {
  search.value = !search.value;
  searchterm.value = "";
  watch(searchInput, () => {
    searchInput.value ? searchInput.value.focus() : null;
  });
};
const shownCards = computed(() => {
  const re = new RegExp(searchterm.value, "i");
  return searchterm.value && activeBox.value!.pairs
    ? activeBox.value!.pairs.filter((item) =>
        item[0] ? item[0].search(re) !== -1 : false
      )
    : activeBox.value!.pairs;
});
</script>
<template>
  <BaseTemplate
    iconSmall="carbon:home"
    iconLeft="carbon:add"
    iconRight="heroicons:magnifying-glass-20-solid"
    linkSmall="/"
    @leftClick="() => chooseItem(['', '', 0, 0, null])"
    @rightClick="toggleSearchInput"
    :title="`${chosenBox.topic ?? ''}`"
    ><template #card>
      <div class="window" v-if="!fetching">
        <ul v-if="!fetching" class="list">
          <li
            style="width: 100%; display: flex; justify-content: center"
            v-if="search"
          >
            <input
              ref="searchInput"
              class="search-input"
              placeholer="search"
              v-model="searchterm"
            />
          </li>
          <li
            v-for="(card, index) in shownCards"
            :key="index"
            :class="index == 0 ? 'border-radius:20px 20px 0px 0px' : ''"
            :style="card[0] === chosenCard[0] ? 'background-color:#cbfbc5' : ''"
            class="listelement"
            @click="() => chooseItem(card)"
          >
            {{ card[0] }}
          </li>
        </ul>
      </div>
    </template>
  </BaseTemplate>
</template>
