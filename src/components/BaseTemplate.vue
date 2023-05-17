<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
const props = defineProps({
  iconSmall: String,
  iconLeft: String,
  iconRight: String,
  linkSmall: String,
  disabledLeft: Boolean,
  title: String,
  subtitle: String,
});
const emits = defineEmits(["rightClick", "leftClick"]);
</script>

<template>
  <div class="main">
    <header>
      <RouterLink :to="props.linkSmall || '/'"
        ><button
          class="smallButton"
          style="padding-top: 4px; padding-left: 8px"
        >
          <Icon
            :icon="props.iconSmall"
            style="color: #ffffff; width: 32px; height: 32px"
          /></button
      ></RouterLink>
      <div
        style="
          display: flex;
          flex-direction: column;
          padding: 0.5rem;
          align-items: center;
          width: 100%;
        "
      >
        <div class="title">{{ props.title }}</div>
        <div class="title">{{ props.subtitle }}</div>
      </div>
    </header>
    <div class="body">
      <slot name="card"></slot>
      <div class="button_panel">
        <button
          class="bigButton"
          :style="
            disabledLeft ? 'background-color: #043B4D;box-shadow:none;' : ''
          "
          @click="
            () => {
              if (!disabledLeft) emits('leftClick', true);
            }
          "
        >
          <Icon
            :icon="props.iconLeft"
            style="color: #ffffff; width: 70px; height: 70px"
          />
        </button>
        <button class="bigButton" @click="() => emits('rightClick', true)">
          <Icon
            :icon="props.iconRight"
            style="color: #ffffff; width: 70px; height: 70px"
          />
        </button>
      </div>
    </div>
  </div>
</template>
