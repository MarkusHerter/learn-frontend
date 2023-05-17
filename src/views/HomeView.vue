<script setup lang="ts">
import BaseTemplate from "../components/BaseTemplate.vue";
import { fetchCardboxes } from "@/apicalls";
import { chosenBox } from "@/store";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const cardboxes = ref(null);
const fetchData = async () => {
  cardboxes.value = await fetchCardboxes();
};

onMounted(fetchData);
</script>

<template v-on="cardboxes">
  <BaseTemplate
    iconSmall="carbon:logout"
    iconLeft="carbon:checkmark"
    iconRight="carbon:edit"
    linkSmall="/logout"
    @leftClick="() => router.push('/learn')"
    @rightClick="() => router.push('/select-edit')"
    title="Markus' supertolle Lernboxenbox"
  >
    <template v-slot:card>
      <div class="window">
        <ul class="list">
          <li
            v-for="({ id, name }, index) in cardboxes"
            :key="id"
            :class="index == 0 ? 'border-radius:20px 20px 0px 0px' : ''"
            :style="id === chosenBox.id ? 'background-color:#cbfbc5' : ''"
            class="listelement"
            @click="() => (chosenBox = { id: id, topic: name })"
          >
            {{ name }}
          </li>
        </ul>
      </div>
    </template>
  </BaseTemplate>
</template>
