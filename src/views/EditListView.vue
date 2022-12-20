<script setup lang="ts">
import BaseTemplate from "@/components/BaseTemplate.vue";
import { activeBox } from "@/apicalls";
import { chosenBox } from "@/store";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
const chosenCard = ref<String>("");
const router = useRouter();
const searchterm = ref<string>("");
const search = ref<Boolean>(false);
const searchInput = ref();

const chooseItem = (pair: String) => {
  chosenCard.value = pair;
  router.push({
    path: `/edit/${activeBox.pairs.findIndex((item) => pair === item[0])}`,
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
  return searchterm.value && activeBox.pairs
    ? activeBox.pairs.filter((item) =>
        item[0] ? item[0].search(re) !== -1 : false
      )
    : activeBox.pairs;
});

activeBox.deleteEmptyCards();
</script>
<template>
  <BaseTemplate
    iconSmall="carbon:home"
    iconLeft="carbon:add"
    iconRight="heroicons:magnifying-glass-20-solid"
    linkSmall="/"
    @leftClick="
      () => {
        activeBox.pairs.push(['', '', 0, 0]);
        chooseItem('');
      }
    "
    @rightClick="toggleSearchInput"
    :title="`${chosenBox.topic ?? ''}`"
    ><template #card>
      <div class="window">
        <ul v-if="activeBox.id === chosenBox.id" class="list">
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
            v-for="(pair, index) in shownCards"
            :key="index"
            :class="index == 0 ? 'border-radius:20px 20px 0px 0px' : ''"
            :style="pair[0] === chosenCard ? 'background-color:#cbfbc5' : ''"
            class="listelement"
            @click="() => chooseItem(pair[0])"
          >
            {{ pair[0] }}
          </li>
        </ul>
      </div>
    </template>
  </BaseTemplate>
</template>
