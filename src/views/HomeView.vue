<script setup lang="ts">
import BaseTemplate from "../components/BaseTemplate.vue";
import { cardboxes } from "@/apicalls";
import { chosenBox } from "@/store";
</script>

<template>
  <BaseTemplate
    iconSmall="carbon:logout"
    iconLeft="carbon:checkmark"
    iconRight="carbon:edit"
    linkSmall="/logout"
    :linkLeft="`/learn/${chosenBox.id}`"
    linkRight="/select-edit"
    title="Learnit"
  >
    <template v-slot:card>
      <div class="window">
        <ul class="list">
          <li
            v-for="({ id, topic }, index) in cardboxes"
            :key="id"
            :class="index == 0 ? 'border-radius:20px 20px 0px 0px' : ''"
            :style="id === chosenBox.id ? 'background-color:#cbfbc5' : ''"
            class="listelement"
            @click="() => (chosenBox = { id: id, topic: topic })"
          >
            {{ topic }}
          </li>
        </ul>
      </div>
    </template>
  </BaseTemplate>
</template>
